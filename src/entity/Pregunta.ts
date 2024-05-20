// src/entity/Pregunta.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Tema } from "./Tema";
import { Respuesta } from "./Respuesta";

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  id_pregunta: number;

  @Column()
  img: string;

  @Column()
  texto: string;

  @ManyToOne(() => Tema, tema => tema.preguntas)
  tema: Tema;

  @OneToMany(() => Respuesta, respuesta => respuesta.pregunta)
  respuestas: Respuesta[];
}
