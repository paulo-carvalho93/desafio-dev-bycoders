import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  dono: string;

  @Column()
  nome: string;

  @OneToMany(() => Transaction, () => Store)
  transactions: Promise<Transaction[]>;
}
