# E-Commerce CMS API
E-Commerce CMS is an application for administrator(s) to manage e-commerce content.
This app has : 
* RESTful endpoint for user (admin) login feature
* RESTful endpoints for CRUD operations to products
* JSON formatted response

&nbsp;

## Endpoints
```
 - POST /users/login
 - POST /products
 - GET /products
 - PUT /products/:ProductId
 - DELETE /products/:ProductId
```

## RESTful endpoints
### POST /users/login

> User Login

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
  "access_token": "<user's access token>",
  "username": "<user's username>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "The Email or Password is invalid."
}
```

_Response (500 - Internal Server Error)_
```
[
  "<error message(s)>"
]
```
---
### POST /products

> Create New Product

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>"
}
```

_Response (201 - Created)_
```
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
  "createdAt": "<time upon product creation>",
  "updatedAt": "<time upon product latest update>"
}
```

_Response (401 - Unauthorized)_
```
{
  "The user is not authenticated."
}
```

_Response (403 - Forbidden)_
```
{
  "The user is not authorized."
}
```

_Response (500 - Internal Server Error)_
```
[
  "<error message(s)>"
]
```
---
### GET /products

> Read All Products

_Request Header_
```
{
  "access_token": "<user's access token>"
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
    "id": "<product_1 id>",
    "name": "<product_1 name>",
    "image_url": "<product_1 image url>",
    "price": "<product_1 price>",
    "stock": "<product_1 stock>",
    "category": "<product_1 category>",
    "createdAt": "<time upon product_1 creation>",
    "updatedAt": "<time upon product_1 latest update>"
  },
  {
    "id": "<product_2 id>",
    "name": "<product_2 name>",
    "image_url": "<product_2 image url>",
    "price": "<product_2 price>",
    "stock": "<product_2 stock>",
    "category": "<product_2 category>",
    "createdAt": "<time upon product_2 creation>",
    "updatedAt": "<time upon product_2 latest update>"
  },
  ...,
  {
    "id": "<product_n id>",
    "name": "<product_n name>",
    "image_url": "<product_n image url>",
    "price": "<product_n price>",
    "stock": "<product_n stock>",
    "category": "<product_n category>",
    "createdAt": "<time upon product_n creation>",
    "updatedAt": "<time upon product_n latest update>"
  }
]
```

_Response (401 - Unauthorized)_
```
{
  "The user is not authenticated"
}
```

_Response (403 - Forbidden)_
```
{
  "The user is not authorized."
}
```

_Response (500 - Internal Server Error)_
```
[
  "<error message(s)>"
]
```
---
### PUT /products/:ProductId

> Update Product by Product Id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>"
}
```

_Response (200 - OK)_
```
{
  "id": "<product id>",
  "name": "<updated product name>",
  "image_url": "<updated product image url>",
  "price": "<updated product price>",
  "stock": "<updated product stock>",
  "category": "<updated product category>",
  "createdAt": "<time upon product creation>",
  "updatedAt": "<time upon product latest update>"
}
```

_Response (401 - Unauthorized)_
```
{
  "The user is not authenticated"
}
```

_Response (403 - Forbidden)_
```
{
  "The user is not authorized."
}
```

_Response (500 - Internal Server Error)_
```
[
  "<error message(s)>"
]
```
---
### DELETE /products/:ProductId

> Delete Product by Product Id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
// return the deleted product information
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
  "createdAt": "<time upon product creation>",
  "updatedAt": "<time upon product latest update>"
}
```

_Response (401 - Unauthorized)_
```
{
  "The user is not authenticated"
}
```

_Response (403 - Forbidden)_
```
{
  "The user is not authorized."
}
```

_Response (500 - Internal Server Error)_
```
[
  "<error message(s)>"
]
```
