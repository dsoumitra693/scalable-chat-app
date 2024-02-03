import { Server, Socket } from "socket.io";
import { IMessage } from "../Types/Message";
import { Redis } from "ioredis";
import { redisConfig } from "../config/redisConfig";
import { authenticate } from "../milddleware/autheticate";

const publisher = new Redis(redisConfig);
const subscriber = new Redis(redisConfig);
const redisClient = new Redis(redisConfig);

class SocketServices {
  private _io: Server;
  private onlineUsers: Set<string> = new Set();

  constructor(httpServer: any) {
    console.log("Initializing socket server....");
    this._io = new Server(httpServer, {
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });
    subscriber.subscribe(`MESSAGE`);
    subscriber.subscribe(`PRIVATE_MESSAGE`);
  }

  get io() {
    return this._io;
  }

  public initListener() {
    const io = this.io;
    io.use(authenticate);

    io.on("connect", (socket: Socket) => {
      const userPhoneNumber: string = socket.handshake.auth.phoneNumber;
      this.onlineUsers.add(userPhoneNumber);

      // Deliver offline messages when the user comes online
      this.deliverOfflineMessagesFromCache(userPhoneNumber, socket);

      // Handle private messages
      socket.on("private:message", async (msg: IMessage) => {
        console.log(`New private message received from ${userPhoneNumber} to ${msg.reciver}: `, msg);
        const privateChannel = `PRIVATE_MESSAGE_${msg.reciver}`;

        if (this.onlineUsers.has(msg.reciver)) {
          // If the target user is online, emit the private message
          io.to(msg.reciver).emit('private:message', msg);
        } else {
          // If the target user is offline, store the message in Redis for later delivery
          this.saveOfflineMessageToCache(msg.reciver, msg);
        }
      });

      // Handle public messages
      socket.on("public:message", async (msg: IMessage) => {
        console.log("New public message received ", msg);
        await publisher.publish(`MESSAGE`, JSON.stringify({ message: msg }));
      });

      // Subscribe to private messages for this user
      subscriber.subscribe(`PRIVATE_MESSAGE_${userPhoneNumber}`);
    });

    // Listen for private messages
    subscriber.on('message', (channel, message) => {
      const parsedMsg = JSON.parse(message) as IMessage;

      if (channel.startsWith('PRIVATE_MESSAGE_') && this.onlineUsers.has(parsedMsg.sender)) {
        io.to(parsedMsg.sender).emit('private:message', parsedMsg);
      } else if (channel === 'MESSAGE') {
        io.emit('public:message', parsedMsg);
      }
    });
  }

  private saveOfflineMessageToCache(targetUserId: string, message: IMessage) {
    redisClient.rpush(`offline_messages_${targetUserId}`, JSON.stringify(message));
  }

  private async deliverOfflineMessagesFromCache(targetUserId: string, socket: Socket) {
    const offlineMessages = await redisClient.lrange(`offline_messages_${targetUserId}`, 0, -1);

    if (offlineMessages && offlineMessages.length > 0) {
      // Emit all offline messages to the user
      offlineMessages.forEach((msg) => {
        socket.emit('offline:message', JSON.parse(msg));
      });

      // Clear the offline messages from the cache after delivering
      await redisClient.del(`offline_messages_${targetUserId}`);
    }
  }
}

export default SocketServices;
