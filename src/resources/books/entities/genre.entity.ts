import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('ibook', ['bookId'], {})
@Index('igenre', ['genreId'], {})
@Index('u', ['bookId', 'genreId'], { unique: true })
@Entity('libgenre', { schema: 'lib' })
export class Genre {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id', unsigned: true })
  id: number;

  @Column('int', { name: 'BookId', unsigned: true, default: () => "'0'" })
  bookId: number;

  @Column('int', { name: 'GenreId', unsigned: true, default: () => "'0'" })
  genreId: number;
}
