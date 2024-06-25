import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { Routes } from './interfaces/routes.interface.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { connect, disconnect, set } from 'mongoose';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = 'development';
    this.port = 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    console.log('App is listening on port %s', this.port);
    this.app.listen(this.port);
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    set('strictQuery', false);
    await connect('mongodb+srv://imennaija:0196@cluster0.yh3cwrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: '*', credentials: true }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
