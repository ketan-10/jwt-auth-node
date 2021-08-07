import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

// Typeorm entity
@Entity("users") // typeorm 
@ObjectType()  // type-graphql
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
