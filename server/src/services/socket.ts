import { Server } from "socket.io"
import { IMessage } from "../Types/Message"
import { Redis } from "ioredis"
import { redisConfig } from "../config/redisConfig"

const publiser = new Redis(redisConfig)
const subscriber = new Redis(redisConfig)

class SocketServices {
    private _io: Server
    constructor(httpServer: any) {
        console.log("Initialising socket server....")
        this._io = new Server(httpServer, {
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            },
        })
        subscriber.subscribe(`MESSAGE`)
    }

    get io() {
        return this._io
    }

    public initListner() {
        const io = this.io
        io.on("connect", socket => {
            console.log("New socket connected ", socket.id)
            socket.on("event:message", async (msg: IMessage) => {
                console.log("new message recive ", msg)
                await publiser.publish(`MESSAGE`, JSON.stringify(msg))
            })
        })

        subscriber.on('message', (channel, message)=> {
            if(channel==='MESSAGE'){
                io.emit('message', message)
            }
        })
    }
}

export default SocketServices