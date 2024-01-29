import { Server, Socket } from "socket.io";
import { IMessage } from "../Types/Message";
import { Redis } from "ioredis";
import { redisConfig } from "../config/redisConfig";
import { authenticate } from "../milddleware/autheticate";

const publisher = new Redis(redisConfig);
const subscriber = new Redis(redisConfig);

class SocketServices {
  private _io: Server;

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
    io.use(authenticate)


    io.on("connect", (socket: Socket) => {
      console.log("New socket connected ", socket.id);

      // Assuming you store the user's phone number in the session or from authentication
      const userPhoneNumber: string = socket.handshake.auth.phoneNumber;

      // Handle private messages
      socket.on("private:message", async (msg: IMessage) => {
        console.log(`New private message received from ${userPhoneNumber} to ${msg.reciver}: `, msg);
        const privateChannel = `PRIVATE_MESSAGE_${msg.reciver}`;
        await publisher.publish(privateChannel, JSON.stringify({ message: msg }));
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
      if (channel.startsWith('PRIVATE_MESSAGE_')) {
        const [, targetPhoneNumber] = channel.split('_');
        io.to(targetPhoneNumber).emit('private:message', JSON.parse(message));
      } else if (channel === 'MESSAGE') {
        io.emit('public:message', JSON.parse(message));
      }
    });
  }
}

export default SocketServices;