import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('email', ['email'], {})
@Index('FirstName', ['firstName'], {})
@Index('Homepage', ['homepage'], {})
@Index('LastName', ['lastName'], {})
@Index('MasterId', ['masterId'], {})
@Index('uid', ['uid'], {})
@Entity('libavtorname', { schema: 'lib' })
export class AuthorName {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AvtorId', unsigned: true })
  id: number;

  @Column('varchar', { name: 'FirstName', length: 99 })
  firstName: string;

  @Column('varchar', { name: 'MiddleName', length: 99 })
  middleName: string;

  @Column('varchar', { name: 'LastName', length: 99 })
  lastName: string;

  @Column('varchar', { name: 'NickName', length: 33 })
  nickName: string;

  @Column('int', { name: 'uid', default: () => "'0'" })
  uid: number;

  @Column('varchar', { name: 'Email', length: 255 })
  email: string;

  @Column('varchar', { name: 'Homepage', length: 255 })
  homepage: string;

  @Column('char', { name: 'Gender', length: 1 })
  gender: string;

  @Column('int', { name: 'MasterId', default: () => "'0'" })
  masterId: number;
}
