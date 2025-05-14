import dotenv from 'dotenv';
import { server } from './presentation';
import { connectToMongoDB } from './infrastracture/mongodb/connection';

dotenv.config();

const main = async () => {

    try {
        await connectToMongoDB();
        await server.start();
        console.log('Server is up and running');
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

main();