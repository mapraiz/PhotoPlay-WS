"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tema = void 0;
// src/entity/Tema.ts
const typeorm_1 = require("typeorm");
const Pregunta_1 = require("./Pregunta");
let Tema = class Tema {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Tema.prototype, "id_tema", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Tema.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Pregunta_1.Pregunta, pregunta => pregunta.tema)
], Tema.prototype, "preguntas", void 0);
Tema = __decorate([
    (0, typeorm_1.Entity)()
], Tema);
exports.Tema = Tema;
//# sourceMappingURL=Tema.js.map