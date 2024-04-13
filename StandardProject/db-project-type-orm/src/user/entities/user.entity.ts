import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
  schema: 'blogger',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'username', length: 255 })
  userName: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 255 })
  suite: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  zipcode: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column({ length: 255 })
  phone: string;

  @Column({ length: 255 })
  website: string;

  @Column({ name: 'company_name', length: 255 })
  companyName: string;

  @Column({ name: 'company_catchPhrase', length: 255 })
  companyCatchPhrase: string;

  @Column({ name: 'company_bs', length: 255 })
  companyBs: string;
}
