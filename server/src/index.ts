import http from "http"
import SocketServices from "./services/socket"
require('dotenv').config();

async function init() {

  const httpServer = http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Congrats you have a created a web server');
    res.end();
  });
  
  const socketService = new SocketServices(httpServer)
  const PORT = process.env.PORT

  httpServer.listen(PORT, () => console.log(`HTTP server running on PORT ${PORT}`))

  socketService.initListner()
}

init();