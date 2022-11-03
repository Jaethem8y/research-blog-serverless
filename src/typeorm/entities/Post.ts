import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './Content';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  createdAt: Date;
  @Column()
  description: string;
  @Column()
  category: string;
  @OneToMany(() => Content, (content) => content.post, { onDelete: 'CASCADE' })
  contents: Content[];
}
