import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('meta', ['genreMeta'], {})
@Entity('libgenrelist', { schema: 'lib' })
export class GenreList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'GenreId', unsigned: true })
  genreId: number;

  @Column('varchar', { primary: true, name: 'GenreCode', length: 45 })
  genreCode: string;

  @Column('varchar', { name: 'GenreDesc', length: 99 })
  genreDesc: string;

  @Column('varchar', { name: 'GenreMeta', length: 45 })
  genreMeta: string;
}
