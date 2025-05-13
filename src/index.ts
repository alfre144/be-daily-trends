import { server } from './presentation';

// import dotenv from 'dotenv';
// dotenv.config();

const main = async () => {

    try {
        await server.start();
        console.log('Server is up and running');
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

main();