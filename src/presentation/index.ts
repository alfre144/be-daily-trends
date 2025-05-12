import { ExpressServer } from "./server";

const PORT: number = process.env.PORT ? 
    parseInt(process.env.PORT, 10) : 3000;

const server = new ExpressServer(PORT);

export { server };