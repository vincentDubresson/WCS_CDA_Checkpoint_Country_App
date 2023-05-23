import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Country {
  constructor(
    country: string,
    code: string,
    capital: string,
    continent: string,
    flag: string
  ) {
    this.country = country;
    this.code = code;
    this.capital = capital;
    this.continent = continent;
    this.flag = flag;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  country: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  capital: string;

  @Column()
  @Field()
  continent: string;

  @Column()
  @Field()
  flag: string;
}
