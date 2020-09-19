# Gadget Space E-Commerce App Server
Gadget Space is an admin application web to manage database for e-commerce. This app has : 
* RESTful endpoint for product's CRUD operation
* Login as admin
* JSON formatted response

&nbsp;

## Endpoints
``` 
- GET /products
- GET /products/:productId
- POST /products
- PUT /products/:productId
- DELETE /products/:productId
- GET /categories
- POST /login
```

## RESTful endpoints
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

_Response (200)_
```
[
  {
    "id": 3,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-7-hubble-x1-cloud-pink-gallery-mobile-img.jpg",
    "color": "Cloud Pink",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T05:23:35.135Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  },
  {
    "id": 2,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/fr/smartphones/galaxy-s20/buy/carousel/mobile/1-9-hubble-x1-cosmic-gray-gallery-img.jpg",
    "color": "Cosmic Gray",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T04:56:39.457Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /products/:productId

> Get product by id

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

_Response (200)_
```
  {
    "id": 2,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/fr/smartphones/galaxy-s20/buy/carousel/mobile/1-9-hubble-x1-cosmic-gray-gallery-img.jpg",
    "color": "Cosmic Gray",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T04:56:39.457Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": <product name>,
    "img_url": <product img url>,
    "color": <product color>,
    "capacity": <product capacity>,
    "price": <product price>,
    "stock": <product stock>,
    "CategoryId": <category id>
}
```

_Response (201)_
```
{
  "product": {
    "id": <given by system>,
    "name": "Samsung Galaxy S20+",
    "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg",
    "color": "Cloud Blue",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "updatedAt": "2020-09-19T06:09:38.426Z",
    "createdAt": "2020-09-19T06:09:38.426Z"
  },
  "message": "New product has been added"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### PUT /products/:productId

> Update product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": <product name>,
    "img_url": <product img url>,
    "color": <product color>,
    "capacity": <product capacity>,
    "price": <product price>,
    "stock": <product stock>,
    "CategoryId": <category id>
}
```

_Response (200)_
```
{
  "message": "Product has been updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /products/:productId

> Delete product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
{
  "message": "Product has been deleted"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /categories

> Get all categories

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "Smartphone",
    "createdAt": "2020-09-19T04:56:39.424Z",
    "updatedAt": "2020-09-19T04:56:39.425Z"
  },
  {
    "id": 2,
    "name": "Tablet",
    "createdAt": "2020-09-19T04:56:39.425Z",
    "updatedAt": "2020-09-19T04:56:39.425Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /register

> Register your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "firstName": "<your first name>",
  "lastName": "<your last name>",
  "email": "<your email>"
  "password": "<your password>",
}
```

_Response (201 - created)_
```

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /login

> Login to your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your registered email>"
  "password": "<your registered password>",
}
```

_Response (200 - ok)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---