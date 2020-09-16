# Kanban App Server
E-Commerce CMS is an application to help you to organize your e-commerce. This app has : 
* User Login
* CRUD Products
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /login
- POST /product
- GET /product
- GET /product/:id
- PUT /product/:id
- DELETE /product/:id
```

## RESTful endpoints

### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "inipassword"
}
```

_Response (200)_
```json
{
    "id": 1,
    "email": "admin@mail.com",
    "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "invalid email or password"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /product

> Create new product

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name must be filled",
  "message": "image must be filled",
  "message": "price must be filled",
  "message": "stock must be filled",
  "message": "price must be more than 0",
  "message": "stock must be more than 0",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```


### GET /product

> Show all product from database

_Request Header_
```json
{
  "access_token": "<access_token>"
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
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
  "id": 2,
  "name": "Adidas Firebird Track Jacket",
  "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/D/V/DV1530_FR_Model_eCom.jpg",
  "price": 700000,
  "stock": 7,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### GET /product/:id

> Show all product by id from database

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
"id": 1,
"name": "Lea Jeans",
"image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
"price": 489500,
"stock": 20,
"createdAt": "2020-03-20T07:15:12.149Z",
"updatedAt": "2020-03-20T07:15:12.149Z",
}

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

-------

### PUT /product/:id

> Update product by id

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 10,
  }
```

_Response (200)_
```json
{
  "message": "update success"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "product's not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name must be filled",
  "message": "image must be filled",
  "message": "price must be filled",
  "message": "stock must be filled",
  "message": "price must be more than 0",
  "message": "stock must be more than 0",
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authorize"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### DELETE /product/:id

> Delete product by id from database

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "message": "delete success"
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user is not authorize"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "product's not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```