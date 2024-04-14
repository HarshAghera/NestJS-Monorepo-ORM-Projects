import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  albumId: number;

  // @ManyToOne(() => Album, (album) => album.photos)
  // @JoinColumn({ name: 'albumId' })
  // album: Album;
}
