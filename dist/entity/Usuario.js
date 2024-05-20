"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
// src/entity/Usuario.ts
const typeorm_1 = require("typeorm");
const Partida_1 = require("./Partida");
let Usuario = class Usuario {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Usuario.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Usuario.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Usuario.prototype, "contrasena", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Partida_1.Partida, partida => partida.usuario)
], Usuario.prototype, "partidas", void 0);
Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map