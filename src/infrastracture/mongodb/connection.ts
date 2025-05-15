import mongoose from 'mongoose';

export const connectToMongoDB = async (): Promise<void> => {

    const mongodbURI = process.env.MONGODB_URI;
    
    if(!mongodbURI) {
        console.error('MONGODB_URI is not defined.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }

}

export const disconnectFromMongoDB = async (): Promise<void> => {

    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }

}