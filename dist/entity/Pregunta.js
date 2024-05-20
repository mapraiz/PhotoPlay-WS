"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pregunta = void 0;
// src/entity/Pregunta.ts
const typeorm_1 = require("typeorm");
const Tema_1 = require("./Tema");
const Respuesta_1 = require("./Respuesta");
let Pregunta = class Pregunta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Pregunta.prototype, "id_pregunta", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Pregunta.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Pregunta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tema_1.Tema, tema => tema.preguntas)
], Pregunta.prototype, "tema", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Respuesta_1.Respuesta, respuesta => respuesta.pregunta)
], Pregunta.prototype, "respuestas", void 0);
Pregunta = __decorate([
    (0, typeorm_1.Entity)()
], Pregunta);
exports.Pregunta = Pregunta;
//# sourceMappingURL=Pregunta.js.map