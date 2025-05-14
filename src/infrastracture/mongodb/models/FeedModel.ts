import mongoose, { Schema, Document, Model } from 'mongoose';

export interface FeedDocument extends Document {
    source: string; // TODO: enum > ElPais, ElMundo, Manual
    url: string;
    title: string;
    content: string;
    author: string;
}

const FeedSchema: Schema = new Schema(
    {
        source: { type: String, required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const FeedModel: Model<FeedDocument> = 
    mongoose.model<FeedDocument>('Feed', FeedSchema);