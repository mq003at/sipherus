"use strict";
// controllers/BaseController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor(service) {
        // Create a new resource
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('dataC', req.body);
                const data = yield this.service.create(req.body);
                res.status(201).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        // Get a resource by ID
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.service.findById(id);
                if (!data) {
                    res.status(404).json({ message: `Resource with ID ${id} not found` });
                }
                else {
                    res.status(200).json(data);
                }
            }
            catch (error) {
                next(error);
            }
        });
        // Update a resource by ID
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.service.update(id, req.body);
                if (!data) {
                    res.status(404).json({ message: `Resource with ID ${id} not found` });
                }
                else {
                    res.status(200).json(data);
                }
            }
            catch (error) {
                next(error);
            }
        });
        // Delete a resource by ID
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.service.delete(id);
                if (!data) {
                    res.status(404).json({ message: `Resource with ID ${id} not found` });
                }
                else {
                    res.status(200).json({ message: `Resource with ID ${id} has been deleted`, data });
                }
            }
            catch (error) {
                next(error);
            }
        });
        // Get all resources
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getAll();
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        this.service = service;
    }
}
exports.BaseController = BaseController;
