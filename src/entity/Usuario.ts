// src/entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Partida } from "./Partida";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column()
  contrasena: string;

  @OneToMany(() => Partida, partida => partida.usuario)
  partidas: Partida[];
}
