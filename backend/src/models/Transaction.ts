import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Store } from "./Store";

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
  data: Date;

  @Column()
  cartao: string;

  @Column()
  hora: string;

  @ManyToOne(() => Store, () => Transaction, { eager: true })
  @JoinColumn({ name: 'store_id' })
  loja: Store;
}
