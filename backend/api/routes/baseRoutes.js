"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutes = void 0;
const express_1 = require("express");
class BaseRoutes {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.controller = controller;
        this.initializeRoutes();
        this.initializeCustomRoutes();
    }
    initializeRoutes() {
        this.router.post('/', this.controller.create);
        this.router.get('/id/:id', this.controller.getById);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
        this.router.get('/', this.controller.getAll);
    }
    initializeCustomRoutes() {
        // To be overridden by derived classes
    }
}
exports.BaseRoutes = BaseRoutes;
