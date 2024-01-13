import express, { Request, Response } from 'express';
import http from 'http';
import SocketServices from './services/socket';
import authRouter from './routes/auth';
import * as dotenv from 'dotenv'
import cors from 'cors';
import listendpoint from 'express-list-endpoints';

async function init() {
  dotenv.config()
  const app = express();
  const httpServer = http.createServer(app);
  const socketService = new SocketServices(httpServer)
  const port = process.env.PORT || 8080

  //middlewares
  app.use(cors({origin: true, credentials: true}))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))


  // routes
  app.use('/auth', authRouter)
  app.get('/', (req:Request, res:Response) => {
    res.send("Welcome to fast chat server")
  });

  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  socketService.initListner()
  console.log(listendpoint(app))
}

init();