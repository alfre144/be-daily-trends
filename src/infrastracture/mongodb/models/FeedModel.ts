import mongoose, { Schema, Document, Model } from 'mongoose';

export interface FeedDocument extends Document {
    source: string;
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
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

export const FeedModel: Model<FeedDocument> = 
    mongoose.model<FeedDocument>('Feed', FeedSchema);