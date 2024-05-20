// src/entity/Respuesta.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pregunta } from "./Pregunta";

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column({ type: "int", default: 0 })
  correcta: number;

  @Column()
  texto: string;

  @ManyToOne(() => Pregunta, pregunta => pregunta.respuestas)
  pregunta: Pregunta;
}

