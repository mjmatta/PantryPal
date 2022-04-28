# PantryPal
[Smart pantry application](http://therealpantrypal.herokuapp.com/) developed using create-react-app [React](https://create-react-app.dev/) frontend, Maven [Spring Boot](https://start.spring.io/) backend, and [PostgreSQL](https://www.postgresql.org/) database.

## Continuous Deployment

Push to this branch automatically pushes to [site](http://therealpantrypal.herokuapp.com/). CD through GitHub Actions.


## To run locally
1. Clone project on your machine.
2. Replace PantryPal links in `RestController.java`, `frontend/package.json`, `App.js`, `FoodService.js`, and `UserService.js` to `http://localhost`.
3. Within `frontend`, run `npm install` to install "node_modules" package dependencies.
4. Run local [PostgreSQL](https://www.postgresql.org/) database from command line and update `spring.datasource.url` in `java/resources/application.properties` to map to your DB. Also set `spring.datasource.username` and `spring.datasource.password` to your local Postgres credentials. Set `spring.jpa.hibernate.ddl-auto=create` on the first time running application.
5. Run in directory: `./mvnw clean install` and then `./mvnw spring-boot:run` to run on `http://localhost:8080`.
