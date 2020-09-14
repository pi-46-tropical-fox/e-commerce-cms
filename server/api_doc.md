# E-Commerce Content-Management-System (CMS)
An app to manage the creation and modification of digital content of E-Commerce. This app has:
* CRUD Product
* Register and Login
* JSON formatted response

&nbsp;

## RESTful endpoints
```
- POST /register
- POST /login
- POST /googleLogin
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- POST /categories
- GET /categories
- GET /categories/:id
- PUT /categories/:id
- DELETE /categories/:id
- POST /banners
- GET /banners
- GET /banners/:id
- PUT /banners/:id
- DELETE /banners/:id
```

### POST /register

> Register a new user to database

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to be inserted into database>",
  "email": "<email to be inserted into database>",
  "password": "<password to authenticate user credentials>"
  "role" "<role of a user in the CMS>"
}
```

_Response (201 - Created)_
```
{
  "access_token": "<your access token>",
  "email": "<posted email>",
  "role" "<role of a user in the CMS>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ] 
}
```
---
### POST /login

> Logged in an existing user and authenticate his/her credentials

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<user's email>",
  "password": "<user's password>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "email": "<your_email@provider.domain>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /googleLogin

> Logging in a user and/or registering a new user into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "avatar": "<your gogle profile picture>",
  "email": "<your google email>"
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "The verifyIdToken method requires an ID Token"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```

#### _for more information about google oAuth please visit https://developers.google.com/gdata/docs/auth/overview_
---
### POST /products

> Insert a new product into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "image_url": "<product image>",
  "price": "<price of the product>",
  "stock": "<stock of the product>"
}
```

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres>",  
  "name": "<product name>",
  "image_url": "<product image>",
  "price": "<price of the product>",
  "stock": "<stock of the product>".
  "category": "<product category>"
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /products

> Get all products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": "<a unique id given by postgres>",  
    "name": "<product name>",
    "image_url": "<product image>",
    "price": "<price of the product>",
    "stock": "<stock of the product>".
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z" 
  },
  {
    "id": "<a unique id given by postgres>",  
    "name": "<product name>",
    "image_url": "<product image>",
    "price": "<price of the product>",
    "stock": "<stock of the product>".
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z" 
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /products/:id

> Get task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>",  
  "name": "<product name>",
  "image_url": "<product image>",
  "price": "<price of the product>",
  "stock": "<stock of the product>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /products/:id

> Update task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "image_url": "<product image>",
  "price": "<price of the product>",
  "stock": "<stock of the product>"
}
```

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>",  
  "name": "<product name>",
  "image_url": "<product image>",
  "price": "<price of the product>",
  "stock": "<stock of the product>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /products/:id

> Delete task based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Product has been deleted successfully"
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
