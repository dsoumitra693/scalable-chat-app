import { Server } from "socket.io"
import { IMessage } from "../Types/Message"

class SocketServices {
    private _io: Server
    constructor(httpServer:any) {
        console.log("Initialising socket server....")
        this._io = new Server(httpServer, {
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        })
    }

    get io() {
        return this._io
    }

    public initListner() {
        const io = this.io
        console.log("Listening to socket ")
        io.on("connect", socket => {
            console.log("New socket connected ", socket.id)
            socket.on("event:message", async({content}:IMessage)=>{
                console.log("new message recive ", {content})
            })
        })
    }
}

export default SocketServices