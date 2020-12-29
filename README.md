## ILMS Project

`Notes about ILMS Service` project:
Structure has been borrowed from Github link https://github.com/anandundavia/express-api-structure
This project is being implemented for reading data from database based on the ID tag passed by 
front end application which is interacting with Zebra Scanner hand held device. 
This service will communicate with SQL Server database and return the data based on the tag provided
by front end application.

All the comment below are from original Github project which explains the structure of the whole project.

## WANT TO RUN WITHOUT READING ANYTHING?

`Steps to be followed`:
-   Make a copy of `.env.example` and call it `.env`
-   Run command `npm install`
-   Run command `npm start`
-   On browser: Try `http://localhost:8123/api/v1/user/greet-me?name=kvs` OR `http://localhost:8123/api/v1/status`
-	Response of `/api/v1/status`: `{"message":"OK","timestamp":"2020-12-06T04:19:02.924Z","IP":"::1","URL":"/api/v1/status"}`
-	Response of `/api/v1/user/greet-me?name=kvs`: `{"message":"GREET_USER","user":"kvs"}`

## Crypto Feature
-   Encrypt feature 
-	POST API: http://localhost:8123/api/v1/user/encrypt
	{
		"name" : "my name is khan"
	}

-   Decrypt feature 
-	POST API: http://localhost:8123/api/v1/user/decrypt
	{
    	"name" : "U2FsdGVkX18jXZhA4wNViPX5Jr6F9ZRD5ky0EtGLc+E="
	}

## MSSQL feature for SQL server connection
*   > I am using mssql component to communicate with SQL server. 

https://www.npmjs.com/package/mssql
Examples: 
	http://localhost:8123/api/v1/user/test_mssql?id=1
	This api will run query
		SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id
	
	Output in json format:
	[{"CustomerID":1,"NameStyle":false,"Title":"Mr.","FirstName":"Orlando","MiddleName":"N.","LastName":"Gee","Suffix":null,"CompanyName":"A Bike Store","SalesPerson":"adventure-works\\pamela0","EmailAddress":"orlando0@adventure-works.com","Phone":"245-555-0173","PasswordHash":"L/Rlwxzp4w7RWmEgXX+/A7cXaePEPcp+KwQhl2fJL7w=","PasswordSalt":"1KjXYs4=","rowguid":"3F5AE95E-B87D-4AED-95B4-C3797AFCB74F","ModifiedDate":"2005-08-01T00:00:00.000Z"}]


	http://localhost:8123/api/v1/user/test_mssql_multiple_args?id=1&name=Harris
	This api will run query with multiple arguments: 
		SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id OR LastName = @name
	
	Output in json format:
	[{"CustomerID":1,"NameStyle":false,"Title":"Mr.","FirstName":"Orlando","MiddleName":"N.","LastName":"Gee","Suffix":null,"CompanyName":"A Bike Store","SalesPerson":"adventure-works\\pamela0","EmailAddress":"orlando0@adventure-works.com","Phone":"245-555-0173","PasswordHash":"L/Rlwxzp4w7RWmEgXX+/A7cXaePEPcp+KwQhl2fJL7w=","PasswordSalt":"1KjXYs4=","rowguid":"3F5AE95E-B87D-4AED-95B4-C3797AFCB74F","ModifiedDate":"2005-08-01T00:00:00.000Z"},{"CustomerID":2,"NameStyle":false,"Title":"Mr.","FirstName":"Keith","MiddleName":null,"LastName":"Harris","Suffix":null,"CompanyName":"Progressive Sports","SalesPerson":"adventure-works\\david8","EmailAddress":"keith0@adventure-works.com","Phone":"170-555-0127","PasswordHash":"YPdtRdvqeAhj6wyxEsFdshBDNXxkCXn+CRgbvJItknw=","PasswordSalt":"fs1ZGhY=","rowguid":"E552F657-A9AF-4A7D-A645-C429D6E02491","ModifiedDate":"2006-08-01T00:00:00.000Z"},{"CustomerID":29816,"NameStyle":false,"Title":"Mr.","FirstName":"Keith","MiddleName":null,"LastName":"Harris","Suffix":null,"CompanyName":"Progressive Sports","SalesPerson":"adventure-works\\david8","EmailAddress":"keith0@adventure-works.com","Phone":"170-555-0127","PasswordHash":"YPdtRdvqeAhj6wyxEsFdshBDNXxkCXn+CRgbvJItknw=","PasswordSalt":"fs1ZGhY=","rowguid":"E10291DA-B850-451C-9A22-DD4E1DBA22CC","ModifiedDate":"2006-08-01T00:00:00.000Z"}]

-   The service code is at location: `src\api\services\customer\customer.service.js`
-   `src\api\repository\mssql\sql_db.js` has all base CRUD methods defined 
-   `src\config\sql_db_config.js` has all configuration setup details


## Structure

`src` contains the whole source code of the api.
Inside `src`, there are three directories: `api`, `config`, `constants` and one `index.js` file which will be the entry point to the application

### `constants` directory

`index.js` will export all the constants required in the api.

-   constants which are common across environments like dev and prod should be defined in `constants.common.js`

-   constants which are specific for environments should be defined in `constants.dev.js` or `constants.prod.js`. Make sure to have the same shape of constants in all the `constants.[env].js` files

*   > DO NOT include sensitive information like credentials of database in the constants, they should be defined in the .env file which is explained

### `config` directory

This directory will have self-contained config files for different modules in your api.
In the boilerplate, `express.js` and `session.js` are included which configures the appropriate modules.

While creating new config files, in the mind that self-contained config files will help in scaling the application as well as make it more maintainable,
For example, If in future you want to shift to sails from express, all you need to do is create one `sails.js` file, require it in the `src/index.js` and done!

You can even take this to one level further by doing `express.dev.js` and `express.prod.js` and require appropriate file in `src/index.js` based on the env. For the most applications however, that part will be taken care by constants. But if needed, above can be done as well

### `api` directory

This directory will be the one you will be working with most of the time
This directory contains more directories:

-   `controllers`
-   `middlewares`
-   `repository`
-   `routes`
-   `services`
-   `utils`
-   `validations`

#### controllers

A controller will have all the business logic related to one object or one api path ( `/v1/product` )

Naming convention: If your api is `/v1/product` then name your controller as `product.controller.js`
`product.controller.js` will have all the business logic that will be performed at `/v1/product/...` endpoints.
API and controller function mapping:

```
API                         | controller function
                            |
GET: /v1/product/all        | `exports.getAllProducts`
GET: /v1/product/:productID | `exports.getSingleProduct`
POST: /v1/product           | `exports.createProduct`
PUT: /v1/product/productID  | `exports.updateProduct`
```

A `product.controller.js` file should ideally use `product.service.js` and `response.service.js` files located in `api/services` directory

#### middlewares

Any common functions that are needed across routes should be inside this directory.
Middlewares with functionalities of error handling and authentication are the most common across routes and thus are included in this boilerplate

Convention: In case of express, all the middlewares should be a function which takes either (req, res, next) or (error, req, res, next) as argument

#### repository

All the queries to database should reside here. In this boilerplate, `mongo` directory is included as example. Which will have all the queries to the mongo database.

Convention:

-   A separate directory for each repository/database used. For example if you use `redis` and
    `mysql`, you will have two directories inside `repository`
-   Each database specific directory should have `[name-of-db].repository.js` file (`mongo.repository.js` is included in the example). This file should have logic to open and close the connection to
    the database. This files also multiplexes the queries fired on that database.
    You might want to have one more directory named `collection` or `table` inside each database specific directory. If you have two collection/table named `product` and `user` in your database, then `collection` directory should have `product.collection.js` and `user.collection.js` ( or `table` directory should have `product.table.js` and `user.table.js` ).
-   Each `[entity].collection.js` or `[entity].table.js` should at least export two members. A function named `setDatabase` and An object named `queries` containing all the query functions. Explore the boilerplate example for more information
-   All the queries should be exported in such a manner that a controller or a service using that query should not know on which database it is being fired. For example a controller should import a query like: `import { findUser, setSession } = require('../repository');` Chances are, `findUser` is exported by `mongo` and `setSession` is exported by `redis`. Use object destructuring at appropriate places to achieve the same

#### routes

All the API routes.

Convention:

-   Create version wise directories ( `v1`, `v2` )
-   Each version directory should have `index.js`.
-   If there are apis of `user` and `product`, the `v1` directory should have `user.route.js` and `product.route.js`

Look at the example given in the boilerplate and read the comments to get the better idea

#### services

A service should be created:

1. To increase code reuse ( `response.service.js` )
2. To encapsulate complex business logic which is outside of the scope of a controller
3. If you need to manage some sort of state in the API ( when was the last time some cron job ran )

> If a service maintains some state, it must be a singleton

#### utils

Utility classes and functions that are used frequently in the API ( which can not be inside middlewares or can not be a service on their own )

#### validations

Validations for each api.

Convention:

-   All the validations of `/v1/product/...` route should be inside `product.validation.js`
    Have a look at the `user.validation.js` included in the boilerplate example.

---

## Some Details combining everything together

To create a /v1/product/... API routes:

1. Create `product.controller.js` in `controllers`
2. Create `product.route.js` in `routes`
3. Create `product.validation.js` in `validations`
4. Create `product.collection.js` in `repository/mongo`
5. You might want to create `product.service.js` inside `services`

Inside the `routes/v1/index.js` file, the routes should be mounted like

```
const productRoutes = require('./product.route');
...
router.use('/product', productRoutes);
```

<br>
`product.route.js` should look like:

```
const validate = require('express-validation');

const controller = require('../../controllers/product.controller');
const validation = require('../../validations/product.validation');


...
router.route('/')
    .get(validate.validate(validation.getProduct), controller.getProduct)
    .post(validate.validate(validation.createProduct), controller.createProduct)
```

<br>
`product.controller.js` should make use of functions exported by `product.collection.js`

## Sensitive information and .env files

Sensitive information like database credentials and keys to sign cookies should not be included in
constants file. They should be in `.env` file

> `.env` must never be committed to version control. `.env.example` file should be committed to let other developers know what env variables should be defined

Checkout `.env.example` and `.env` to get the better idea
