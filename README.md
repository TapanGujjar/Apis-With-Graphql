# Apis-With-Graphql
Creating Simple Ecommerce apis with graphql

Before running, clone the project and cd into the project directory and run the following steps to reproduce

To run do the following

i) Go to the config folder and go to the file config.json and change the database setting

ii) Install packages with npm using the command
```
npm install
```

iii) The server will not start until the connection with database is not made

iv) Next we create migration using sequelize command below

```
/* if you have installed sequelize globally */
sequelize db:migrate
/* If you have not installed sequelize globally */
node_modules/.bin/sequelize db:migrate
```

v) After running migrations, add dummy products using the following command.
```
/* if you have installed sequelize globally */
sequelize db:seed:all 
/* If you have not installed sequelize globally */
node_modules/.bin/sequelize db:migrate
```

vi) Next start the server using the following command
```
npm start
```

vii) Check if you have all the tables in the databases 

viii) Run tests to make sure everything is working property using the following command. 
#### Make sure the server is running for the test

```
npm test
```

IX) The test contains the complete user story from adding the products to cart, searching the products ,purchasing the products


