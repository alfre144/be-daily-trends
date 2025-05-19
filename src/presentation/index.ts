import { ExpressServer } from './server';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = process.env.PORT ? 
    parseInt(process.env.PORT, 10) : 3000;

const server = new ExpressServer(PORT);

export { server };