// src/entity/PartidaPregunta.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Partida } from "./Partida";
import { Pregunta } from "./Pregunta";

@Entity()
export class PartidaPregunta {
  @PrimaryGeneratedColumn()
  id_partida_pregunta: number;

  @ManyToOne(() => Partida, partida => partida.partidaPreguntas)
  partida: Partida;

  @ManyToOne(() => Pregunta, pregunta => pregunta.id_pregunta)
  pregunta: Pregunta;
}
