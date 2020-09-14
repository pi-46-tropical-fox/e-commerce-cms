# Ecommerce CMS
Website for manage your product. This app has : 
* CRUD Product
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
```

## RESTful endpoints
---
### POST /register

> Register
_Request Header_
```json
not needed
```

_Request Params_
```json
    not needed
```

_Request Body_
```json
{
    "email": "<email from body>",
    "password": "<password from body>",
    "role": "<role from body with >"
}
```

_Response (201)_
```json
[
  {
    "email": "<email from body>",
    "role": "<role from body>",
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### POST /login

> Login
_Request Header_
```json
not needed
```

_Request Params_
```json
    not needed
```

_Request Body_
```json
{
  "email": "<email from body>",
  "password": "<password from body>"
}
```

_Response (200)_
```json
{
  "access_token": "<access_token>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### GET /products

> Get all products
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### POST /products

> Create new product
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>"
}
```

_Response (201 - Created)_
```json
{
    "id": "<given id>",
    "name": "<posted name>",
    "image_url": "<posted image_url>",
    "price": "<posted price>",
    "stock": "<posted stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### GET /products/:id

> Get products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": "<id of product>"
}
```

_Request Body_
```
  not needed
```

_Response (200)_
```json

{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```
---
### PUT /products/:id

> Update products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of product>"
}
```

_Request Body_
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```

_Response (200)_
```json

{
  "id": "<id of product>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation errors"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### DELETE /products/:id

> Delete products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of product>"
}
```

_Request Body_
```
    not needed
```

_Response (200)_
```json
{
  "message": "successfully delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```