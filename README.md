# Continuous Deployment

Push to this branch automatically pushes to [site](http://therealpantrypal.herokuapp.com/). CD through GitHub Actions.


## To run locally
1. Clone project on your machine.
2. Replace PantryPal links in `RestController.java`, `frontend/package.json`, `App.js`, `FoodService.js`, and `UserService.js` to `http://localhost`.
3. Within `frontend`, run `npm install` to install "node_modules" package dependencies.
4. Run local [PostgresQL](https://www.postgresql.org/) database from command line and update `spring.datasource.url` in `java/resources/application.properties` to map to your DB. Also set `spring.jpa.hibernate.ddl-auto=create` on the first time running application.
5. Run in directory: `./mvnw clean install` and then `./mvnw spring-boot:run` to run on `http://localhost:8080`.
