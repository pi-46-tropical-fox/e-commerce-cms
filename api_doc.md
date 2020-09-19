# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* POST /register => Untuk Register User
* POST /login => Untuk Login User
* GET /products => Untuk Menampilkan Products
* POST /products => Untuk Menambahkan Product
* GET /products/:productId => Untuk Menampilkan Product berdasarkan Id
* PUT /products/:productId => Untuk Memperbarui Product berdasarkan Id
* DELETE /products/:productId => Untuk Menghapus Product berdasarkan Id
---
### POST /login

> Login to User

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "email": "admin@mail.com",
    "password": "1234",
    "role":"admin",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /register

> Register User

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```
_Request Body_
```
{
    "email": "user2@mail.com",
    "password": "abc123",
}
```

_Response (201)_
```
[
  {
    "id": 2,
    "email": "user2@mail.com",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /products

> Get all Products

_Request Header_
```
{
  "access_token": "jwt_token"
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
    "id": 1,
    "name": "Hoodie Hitam",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/05/20/jaket_sweater_hoodie_hitam_pria_wanita_10544211_1558285233.jpg",
    "price": "50000",
    "stock": "2",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "jwt_token"
}
```

_Request Body_
```
{
    "id": 2,
    "name": "Hoodie Putih",
    "image_url": "https://cf.shopee.co.id/file/c9fc391da5ad1a2b4aae6ca18cbce361",
    "price": "30000",
    "stock": "2",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (201 - Created)_
```
{
    "id": 2,
    "name": "Hoodie Putih",
    "image_url": "https://cf.shopee.co.id/file/c9fc391da5ad1a2b4aae6ca18cbce361",
    "price": "30000",
    "stock": "2",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /products/:productId

> Get Product By Id

_Request Header_
```
{
  "access_token": "jwt_token"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": 1,
    "name": "Hoodie Hitam",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/05/20/jaket_sweater_hoodie_hitam_pria_wanita_10544211_1558285233.jpg",
    "price": "80000",
    "stock": "5",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /products/:productId

> Update Product

_Request Header_
```
{
  "access_token": "jwt_token"
}
```

_Request Body_
```
{
    "id": 1,
    "name": "Hoodie Hitam",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/05/20/jaket_sweater_hoodie_hitam_pria_wanita_10544211_1558285233.jpg",
    "price": "80000",
    "stock": "5",
}
```
_Response (200)_
```
{
    "id": 1,
    "name": "Hoodie Hitam",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/05/20/jaket_sweater_hoodie_hitam_pria_wanita_10544211_1558285233.jpg",
    "price": "50000",
    "stock": "2",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /products/:productId

> Delete Product

_Request Header_
```
{
  "access_token": "jwt_token"
}
```
_Response (200)_
```
{
    "id": 1,
    "name": "Hoodie Hitam",
    "image_url": "https://s.kaskus.id/r480x480/images/fjb/2019/05/20/jaket_sweater_hoodie_hitam_pria_wanita_10544211_1558285233.jpg",
    "price": "50000",
    "stock": "2",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```