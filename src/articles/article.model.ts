import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field(() => ID)
  id: number;

  @Field()
  isPublished: boolean;

  @Field()
  authorId: string;
}
