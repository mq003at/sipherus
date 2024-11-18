import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseService<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        console.log('data', data)
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAll(): Promise<T[] | null> {
        return await this.model.find().exec();
    }
}
