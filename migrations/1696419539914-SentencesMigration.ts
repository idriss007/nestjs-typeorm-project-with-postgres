import { MigrationInterface, QueryRunner } from 'typeorm';

export class SentencesMigration1696419539914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.renameColumn('sentence', 'id', 'kimlik_no');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
