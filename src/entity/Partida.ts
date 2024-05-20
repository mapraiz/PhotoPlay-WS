// src/entity/Partida.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { PartidaPregunta } from "./PartidaPregunta";

@Entity()
export class Partida {
  @PrimaryGeneratedColumn()
  id_partida: number;

  @Column()
  fecha: Date;

  @Column()
  puntuacion: number;

  @ManyToOne(() => Usuario, usuario => usuario.partidas)
  usuario: Usuario;

  @OneToMany(() => PartidaPregunta, partidaPregunta => partidaPregunta.partida)
  partidaPreguntas: PartidaPregunta[];
}
