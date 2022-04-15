import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tipo: string;

  @Column()
  valor: number;

  @Column()
  cpf: string;

  @Column()
  cartao: string;

  @Column()
  data: Date;

  @Column()
  hora: string;

  @Column()
  dono: string;

  @Column()
  loja: string;
}
