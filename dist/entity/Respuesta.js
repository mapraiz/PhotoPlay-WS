"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respuesta = void 0;
// src/entity/Respuesta.ts
const typeorm_1 = require("typeorm");
const Pregunta_1 = require("./Pregunta");
let Respuesta = class Respuesta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Respuesta.prototype, "id_respuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 })
], Respuesta.prototype, "correcta", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Respuesta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pregunta_1.Pregunta, pregunta => pregunta.respuestas)
], Respuesta.prototype, "pregunta", void 0);
Respuesta = __decorate([
    (0, typeorm_1.Entity)()
], Respuesta);
exports.Respuesta = Respuesta;
//# sourceMappingURL=Respuesta.js.map