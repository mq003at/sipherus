import mongoose, { Schema, Document } from 'mongoose';
import { setUpdatedAtOnUpdate } from '../middlewares/timeStamp';

export interface IBaseModel extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IBaseDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export const baseSchema: Schema<IBaseModel> = new Schema({
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
}, );

setUpdatedAtOnUpdate(baseSchema);

// Create a BaseModel (not typically used directly, but as a base class)
const BaseModel = mongoose.model<IBaseModel>('BaseModel', baseSchema);

export default BaseModel;
