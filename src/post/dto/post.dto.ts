import { ContentDTO } from './content.dto';

export class PostDTO {
  title: string;
  description: string;
  category: string;
  contents: ContentDTO[];
}
