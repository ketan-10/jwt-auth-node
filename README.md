# Server

## Start
`yarn install`
`yarn start`
http://localhost:4000/graphql

## Steps

By Ben Awad :
[JWT Authentication Node.js Tutorial with GraphQL and React](https://www.youtube.com/watch?v=25GS0MLT8JU)

#### Used Typeorm to init a project
`typeorm init --name server --database postgres`

[Create postgress docker Image](https://www.youtube.com/watch?v=G3gnMSyX-XM)

`docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=stripe-example -v pgdata:/var/lib/postgresql/data postgres`

[Create table inside docker container]( 
https://stackoverflow.com/questions/19674456/run-postgresql-queries-from-the-command-line)

1) `docker exec -it 1f7961b5333a bash`
2) `psql -U postgres`
3) `CREATE DATABASE "jwt-auth-example";`

## Dependencies:
**TypeORM already added in init**

**Apollo GraphQL server :**

`yarn add express apollo-server-express graphql`

**Type-GraphQL :** 

`yarn add type-graphql`

**Dev dependencies:**

`yarn add -D @types/express @types/graphql`
`yarn add -D nodemon`

## Architecture

Design Flow                |  User Flow
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/35309821/128605543-eb907e65-eec1-4fc7-a788-3d28f2175112.png)  |  ![](https://user-images.githubusercontent.com/35309821/128605428-280738fb-21a9-4a92-981f-c19764241fbf.png)

