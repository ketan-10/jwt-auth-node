import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

// Typeorm entity
@Entity("users") // type-graphql
@ObjectType()  // typeorm
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('text')
    email: string;

    @Column('text')
    password: string;


    @Field(() => Int)
    @Column('int', {default: 0})
    tokenVersion: number;
}
