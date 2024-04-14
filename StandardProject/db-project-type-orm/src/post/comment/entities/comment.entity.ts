import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  body: string;

  @Column()
  postId: number;
}
