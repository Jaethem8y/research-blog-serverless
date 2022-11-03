import { Post } from './Post';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  order: number;
  @Column({ nullable: true })
  header: string;
  @Column({ nullable: true })
  writing: string;
  @Column({ nullable: true })
  tag: string;
  @Column({ nullable: true })
  link: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  important: string;
  @ManyToOne(() => Post, (post) => post.contents, { onDelete: 'CASCADE' })
  post: Post;
}
