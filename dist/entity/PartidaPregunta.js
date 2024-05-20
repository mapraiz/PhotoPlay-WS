"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartidaPregunta = void 0;
// src/entity/PartidaPregunta.ts
const typeorm_1 = require("typeorm");
const Partida_1 = require("./Partida");
const Pregunta_1 = require("./Pregunta");
let PartidaPregunta = class PartidaPregunta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], PartidaPregunta.prototype, "id_partida_pregunta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Partida_1.Partida, partida => partida.partidaPreguntas)
], PartidaPregunta.prototype, "partida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pregunta_1.Pregunta, pregunta => pregunta.id_pregunta)
], PartidaPregunta.prototype, "pregunta", void 0);
PartidaPregunta = __decorate([
    (0, typeorm_1.Entity)()
], PartidaPregunta);
exports.PartidaPregunta = PartidaPregunta;
//# sourceMappingURL=PartidaPregunta.js.map