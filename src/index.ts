import dotenv from 'dotenv';
import { server } from './presentation';
import { connectToMongoDB } from './infrastracture/mongodb/connection';

dotenv.config();

const main = async () => {

    try {
        await connectToMongoDB();
        await server.start();
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

main();