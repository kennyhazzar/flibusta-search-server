import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('Deleted', ['deleted'], {})
@Index('FileAuthor', ['fileAuthor'], {})
@Index('FileAuthor_2', ['fileAuthor'], { fulltext: true })
@Index('FileSize', ['fileSize'], {})
@Index('FileType', ['fileType'], {})
@Index('FileTypeDel', ['deleted', 'fileType'], {})
@Index('Lang', ['lang'], {})
@Index('LangDel', ['deleted', 'lang'], {})
@Index('md5', ['md5'], { unique: true })
@Index('N', ['n'], {})
@Index('Title', ['title'], {})
@Index('Title1', ['title1'], {})
@Index('Title_2', ['title'], { fulltext: true })
@Index('Year', ['year'], {})
@Entity('libbook', { schema: 'lib' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'int', name: 'BookId', unsigned: true })
  id: number;

  @Column('int', { name: 'FileSize', unsigned: true, default: () => "'0'" })
  fileSize: number;

  @Column('timestamp', { name: 'Time', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @Column('varchar', { name: 'Title', length: 254 })
  title: string;

  @Column('varchar', { name: 'Title1', length: 254 })
  title1: string;

  @Column('char', { name: 'Lang', length: 3, default: () => "'ru'" })
  lang: string;

  @Column('smallint', { name: 'LangEx', unsigned: true, default: () => "'0'" })
  langEx: number;

  @Column('char', { name: 'SrcLang', length: 3 })
  srcLang: string;

  @Column('char', { name: 'FileType', length: 4 })
  fileType: string;

  @Column('varchar', { name: 'Encoding', length: 32 })
  encoding: string;

  @Column('smallint', { name: 'Year', default: () => "'0'" })
  year: number;

  @Column('char', { name: 'Deleted', length: 1, default: () => "'0'" })
  deleted: string;

  @Column('varchar', { name: 'Ver', length: 8 })
  ver: string;

  @Column('varchar', { name: 'FileAuthor', length: 64 })
  fileAuthor: string;

  @Column('int', { name: 'N', unsigned: true, default: () => "'0'" })
  n: number;

  @Column('varchar', { name: 'keywords', length: 255 })
  keywords: string;

  @Column('binary', { name: 'md5', unique: true, length: 32 })
  md5: Buffer;

  @Column('timestamp', {
    name: 'Modified',
    default: () => "'2009-11-29 12:00:00'",
  })
  modified: Date;

  @Column('char', { name: 'pmd5', length: 32 })
  pmd5: string;

  @Column('tinyint', { name: 'InfoCode', unsigned: true, default: () => "'0'" })
  infoCode: number;

  @Column('int', { name: 'Pages', unsigned: true, default: () => "'0'" })
  pages: number;

  @Column('int', { name: 'Chars', unsigned: true, default: () => "'0'" })
  chars: number;

  @Column('varchar', { name: 'ArchiveName', nullable: true, length: 100 })
  archiveName: string | null;
}
