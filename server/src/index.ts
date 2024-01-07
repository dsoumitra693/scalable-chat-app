import http from "http"
import SocketServices from "./services/socket"

async function init() {

  const httpServer = http.createServer();
  const socketService = new SocketServices(httpServer)
  const PORT = 3000

  httpServer.listen(PORT, () => console.log(`HTTP server running on PORT ${PORT}`))

  socketService.initListner()
}

init();