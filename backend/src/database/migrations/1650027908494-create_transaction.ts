import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTransaction1650027908494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'tipo',
              type: 'varchar',
            },
            {
              name: 'valor',
              type: 'decimal',
            },
            {
              name: 'cpf',
              type: 'varchar',
            },
            {
              name: 'cartao',
              type: 'varchar',
            },
            {
              name: 'data',
              type: 'date',
            },
            {
              name: 'hora',
              type: 'varchar',
            },
            {
              name: 'dono',
              type: 'varchar',
            },
            {
              name: 'loja',
              type: 'varchar',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions');
    }

}
