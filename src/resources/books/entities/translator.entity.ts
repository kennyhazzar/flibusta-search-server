import { Column, Entity, Index } from 'typeorm';

@Index('TranslatorId', ['translatorId'], {})
@Entity('libtranslator', { schema: 'lib' })
export class Translator {
  @Column('int', { primary: true, name: 'BookId', unsigned: true })
  bookId: number;

  @Column('int', { primary: true, name: 'TranslatorId', unsigned: true })
  translatorId: number;

  @Column('tinyint', { name: 'Pos', unsigned: true, default: () => "'0'" })
  pos: number;
}
