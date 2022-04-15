import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
class Transaction {
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

export default Transaction;
