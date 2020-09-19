# Ecommerce CMS App Server
Ecommerce CMS APP adalah Single Page Application (SPA) yang bertujuan untuk membantu 'admin' exommerce untuk mengatur database product dan banner yang akan ditampilkan pada aplikasi exommerce customer. Aplikasi ini memudahkan admin untuk menambahlan, mengubah dan mengedit data yang diperlukan.

Aplikasi ini memiliki konfigurasi dan fitur sebagai berikut : 
* Aplikasi ini dapat diakses pada url https://ecommerce-cms-72024.web.app
* Aplikasi ini dideploy menggunakan "heroku" untuk server dan "firebase" untuk client.
* RESTful endpoint dengan operasi CRUD.
* Format respon berupa JSON.
* User memiliki dua tipe role yaitu 'Admin' dan 'Customer'
* Registrasi Admin dilakukan melalui seeding server oleh developer. Untuk admin yang telah didaftarkan adalah, email:'admin@mail.com' password:'123456'
* Sedangkan user customer dapat registrasi melalui website
* Authorized user (admin) dapat menambahkan, mengedit dan menghapus product dan banner
* Terdapat testing dengan metode TDD untuk memastikan lancarnya sistem kerja aplikasi ini


Constraint Aplikasi:
* User harus registrasi (admin:seeder, customer: via app) dan login terlebih dahulu agar dapat mengakses aplikasi.
* Hanya authorized user (admin) yang dapat mengedit dan menghapus task miliknya sendiri
* Customer akan diarahkan ke laman Customer Site - Coming Soon

&nbsp;

## Depedencies
* axios
* vue
* vue-router
* vuex
* core-js
* bootstrap
* bcryptjs
* cors
* dotenv
* express
* jsonwebtoken
* pg
* sequelize

## Endpoints
* POST /register
* POST /login
* POST /products
* GET /products
* GET /products/:id
* PUT /products/:id
* DELETE /products/:id
* POST /banners
* GET /banners
* GET /banners/:id
* PUT /banners/:id
* DELETE /banners/:id


## RESTful endpoints
### POST /register

> Create new user with role customer
  - email and password harus diisi
  - email harus unik
  - email harus menggunakan format email
  - password min 6 characters
  - 'role' akan secara otomatis terisi 'customer'
  - password akan di "hash" menggunakan bcrypjtjs sebelum disimpan dalam database

_Request Header_
```
no need
```

_Request Body_
```json
{
    "email": "amanda@mail.com",
    "password": "123456"
}
```

_Response (201 - Created)_
```json
{
    "email": "amanda@mail.com",
    "message": "Has been successfully registered!"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid required users data"
}
```


### POST /login

> Login to app
  - hash password dari database akan divalidasi pada proses ini


_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "amanda@mail.com",
  "password": "123456"
}
```

_Response (200 - Ok)_
```json
{
    "access_token": "<access_token>",
    "role": "admin",
    "message": "Success to login!"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Email or/and password is invalid"
}
```


### POST /products

> Create a new product
  - data name, Image Url, price, stock dan kategori harus diisi
  - user admin harus login terlebih dahulu untuk mengakses laman ini (authentication)
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)
  - stock dan price harus diinput dengan angka dan lebih besar dari 0 (nol)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name/image/price/stock/category harus diisi"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /products

> Get product list
  - User admin harus login untuk mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "name": "Product B",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /products/:id

> Get a certain product
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
product id
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```


### PUT /products/:id

> Update a spesific product
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user (admin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
task id
```

_Request Body_
```json
{
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
}
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /products/:id

> Delete a selected product
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat menghapus product.


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
product id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Product is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```



### POST /banners

> Create a new banner
  - data title, category, dan status harus diisi
  - user admin harus login terlebih dahulu untuk mengakses laman ini (authentication)
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "http://....",
    "status": "inactive",
    "category": "fashion"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "title/status/category harus diisi"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /banners

> Get banner list
  - user harus login untuk mengakses laman ini
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "title": "http://....",
    "status": "inactive",
    "category": "automotive",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /banners/:id

> Get a certain banner
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
banner id
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```


### PUT /banners/:id

> Update a spesific banner
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user (admin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
banner id
```

_Request Body_
```json
{
    "title": "http://....",
    "status": "inactive",
    "category": "fashion"
  }
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /banners/:id

> Delete a selected banner
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat menghapus product.


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
banner id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Banner is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```