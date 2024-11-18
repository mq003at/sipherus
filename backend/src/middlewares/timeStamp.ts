import { Schema } from 'mongoose';

/**
 * Middleware to set the `updatedAt` field before updating documents.
 * 
 * - findOneAndUpdate: Triggers before updating a single document, setting the `updatedAt` field.
 * - updateOne: Triggers before updating one or more documents, setting the `updatedAt` field.
 * 
 * This middleware ensures that the `updatedAt` timestamp is updated to the current date and time whenever a document is modified.
 * Note: This will not work on old version (current = 8.5.1)
 * https://mongoosejs.com/docs/middleware.html#pre
 */

export function setUpdatedAtOnUpdate(schema: Schema) {
    schema.pre('findOneAndUpdate', function (next) {
        this.set({ updatedAt: new Date() });
        next();
    });

    schema.pre('updateOne', function (next) {
        this.set({ updatedAt: new Date() });
        next();
    }); 
}
