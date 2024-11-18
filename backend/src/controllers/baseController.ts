// controllers/BaseController.ts

import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { Document } from 'mongoose';

export class BaseController<T extends Document<unknown, any, any>> {
    protected service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    // Create a new resource
    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log('dataC', req.body)
            const data = await this.service.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };

    // Get a resource by ID
    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;

        try {
            const data = await this.service.findById(id);
            if (!data) {
                res.status(404).json({ message: `Resource with ID ${id} not found` });
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            next(error);
        }
    };

    // Update a resource by ID
    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;

        try {
            const data = await this.service.update(id, req.body);
            if (!data) {
                res.status(404).json({ message: `Resource with ID ${id} not found` });
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            next(error);
        }
    };

    // Delete a resource by ID
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;

        try {
            const data = await this.service.delete(id);
            if (!data) {
                res.status(404).json({ message: `Resource with ID ${id} not found` });
            } else {
                res.status(200).json({ message: `Resource with ID ${id} has been deleted`, data });
            }
        } catch (error) {
            next(error);
        }
    };

    // Get all resources
    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.service.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };
}
