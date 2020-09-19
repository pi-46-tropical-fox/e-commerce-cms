# e-commerce-cms
Membuat Content Management System untuk e-commerce


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


## PUT /products/:product_id
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

