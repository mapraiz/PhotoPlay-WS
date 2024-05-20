"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partida = void 0;
// src/entity/Partida.ts
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const PartidaPregunta_1 = require("./PartidaPregunta");
let Partida = class Partida {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Partida.prototype, "id_partida", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Partida.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Partida.prototype, "puntuacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, usuario => usuario.partidas)
], Partida.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PartidaPregunta_1.PartidaPregunta, partidaPregunta => partidaPregunta.partida)
], Partida.prototype, "partidaPreguntas", void 0);
Partida = __decorate([
    (0, typeorm_1.Entity)()
], Partida);
exports.Partida = Partida;
//# sourceMappingURL=Partida.js.map