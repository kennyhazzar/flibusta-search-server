import { Column, Entity, Index } from 'typeorm';

@Index('iav', ['avtorId'], {})
@Entity('libavtor', { schema: 'lib' })
export class Author {
  @Column('int', {
    primary: true,
    name: 'BookId',
    unsigned: true,
    default: () => "'0'",
  })
  bookId: number;

  @Column('int', {
    primary: true,
    name: 'AvtorId',
    unsigned: true,
    default: () => "'0'",
  })
  avtorId: number;

  @Column('tinyint', { name: 'Pos', unsigned: true, default: () => "'0'" })
  pos: number;
}
