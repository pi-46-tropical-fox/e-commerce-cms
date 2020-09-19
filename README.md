# e-commerce-cms
Membuat Content Management System untuk e-commerce

# BOOKIEPEDIA store
This is e-commerce website to sell all popular books around the world, including book from Indonesia tho.

Disclaimer:
For your convenience, please use full screen resolution browser on your desktop (1920 x 1080) pixels while using this website.


##
Firebase: 


If you're want to login as an admin, please use samuel@mail.com as a login email
If you're want to login as an security (not admin), please use aming@mail.com as a login email


Admin can access all feature in this bookepedia website (CRUD).
Meanwhile, security (not admin) only have access for read all books and banner.


# API Documentation
&nbsp;

## RESTful endpoints
```
  - POST /login
  - POST /products
  - GET /products
  - GET /products/:product_id
  - DELETE /products/:product_id
  - PUT /products/:product_id
  - GET /banners
  - GET /banners/:banner_id
  - DELETE /banners/:banner_id
  - PUT /banners/:banner_id
```

### POST /login

> User login

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<your admin email>",
  "password": "<your admin password>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>,
  "email": "<your admin email>",
  "name": "<your admin name>",
  "role": "<your admin role>",
  
  
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    Invalid name or password
  ]
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
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "name": "<your product name>",
  "image_url": "<your product url image>",
  "price": "<your product price>",
  "stock": "<your product stock>"
}
```

_Response (200 - OK)_
```
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "createdAt": "2020-09-15T14:20:17.621Z",
  "updatedAt": "2020-09-15T14:20:17.621Z"
}
```

_Response (400 )_
```
{
  "errors": [
    "Product name must not empty"
    "Invalid price input"
    "Invalid stock input "
  ]
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

> Show all product

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
    {
        "id": "<your product id>",
        "name": "<your product name>",
        "image_url": "<your product image_url>",
        "price": "<your product price>",
        "stock": "<your product stock>",
        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    },
    {
        "id": "<your product id>",
        "name": "<your product name>",
        "image_url": "<your product image_url>",
        "price": "<your product price>",
        "stock": "<your product stock>",
        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    }
    
]
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Product does not exist!"
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products/:product_id

> Get product by its owner

_Request Header_
```
{
  "access_token": "<your admin access token>",
}
```
_Request Params_
```
{
  "product_id": "<your product id>",
}
```

_Request Body_
```
  not needed
```

_Response (200 - )_
```
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "createdAt": "2020-09-15T14:22:28.867Z",
  "updatedAt": "2020-09-15T14:30:51.816Z"    
```

_Response (404 - Bad Request)_
```
{
  "errors": [
    Product does not exist!
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



### DELETE /products/:product_id
> delete product by its id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "id": <request id of product for delete>
}
```

_Response (200 - OK)_
```
"Product has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    Product does not exist! 
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### PUT /products/:product_id
> update product by its id
_Request Header_
```
 { 
  "access_token": "<your admin access token>",
 }
 ```
_Request Params_
```
 { 
  "product_id": "<your product id>
 }
```

_Request Body_
```
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
}
```

_Response (200 - OK)_
```
{
  "id": "<selected product id>",
  "name": "<updated product name>",
  "image_url": "<updated product image_url>",
  "price": "<updated product price>",
  "stock": "<updated product stock>",
  "createdAt": "<updated date>",
  "updatedAt": "<updated date>"
}
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    "Product name must not empty"
    "Invalid price input"
    "Invalid stock input "
  ]

}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /banners

> Create new banner

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "name": "<your banner name>",
  "image_url": "<your banner url image>",
  "status": "<your banner status>",

}
```

_Response (200 - OK)_
```
{
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

  "createdAt": "2020-09-15T14:20:17.621Z",
  "updatedAt": "2020-09-15T14:20:17.621Z"
}
```

_Response (400 )_
```
{
  "errors": [
    "banner name must not empty"
    "Invalid status input"

  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners

> Show all banner

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
    {
        "id": "<your banner id>",
        "name": "<your banner name>",
        "image_url": "<your banner image_url>",
        "status": "<your banner status>",

        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    },
    {
        "id": "<your banner id>",
        "name": "<your banner name>",
        "image_url": "<your banner image_url>",
        "status": "<your banner status>",

        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    }
    
]
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "banner does not exist!"
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners/:banner_id

> Get banner by its owner

_Request Header_
```
{
  "access_token": "<your admin access token>",
}
```
_Request Params_
```
{
  "banner_id": "<your banner id>",
}
```

_Request Body_
```
  not needed
```

_Response (200 - )_
```
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

  "createdAt": "2020-09-15T14:22:28.867Z",
  "updatedAt": "2020-09-15T14:30:51.816Z"    
```

_Response (404 - Bad Request)_
```
{
  "errors": [
    banner does not exist!
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



### DELETE /banners/:banner_id
> delete banner by its id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "id": <request id of banner for delete>
}
```

_Response (200 - OK)_
```
"banner has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    banner does not exist! 
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## PUT /banners/:banner_id
> update banner by its id
_Request Header_
```
 { 
  "access_token": "<your admin access token>",
 }
 ```
_Request Params_
```
 { 
  "banner_id": "<your banner id>
 }
```

_Request Body_
```
{
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

}
```

_Response (200 - OK)_
```
{
  "id": "<selected banner id>",
  "name": "<updated banner name>",
  "image_url": "<updated banner image_url>",
  "status": "<updated banner status>",

  "createdAt": "<updated date>",
  "updatedAt": "<updated date>"
}
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    "banner name must not empty"
    "Invalid status input"

  ]

}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

