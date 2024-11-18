import mongoose, { CallbackError, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'tls';

dotenv.config();

const connectDb = async(): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectionOptions);
        console.log('MongoDB Connected on this port: ' + process.env.MONGODB_URI)
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;