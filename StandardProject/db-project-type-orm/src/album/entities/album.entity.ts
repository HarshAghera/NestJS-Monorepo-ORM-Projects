import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  userId: number;

  // @OneToMany(() => Photo, photo => photo.album, { cascade: true })
  // photos: Photo[];
}
