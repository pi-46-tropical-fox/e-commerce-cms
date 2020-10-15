# e-commerce-cms
Membuat Content Management System untuk e-commerce

## RESTful endpoints
&nbsp;
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
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
}
```

_Response (201 - Created)_
```
{
  "name": "<name to get insert into>",
  "price": "<price to get insert into>",
  
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /products

> Get all product

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
    "id": 1,
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /products/:id

> Get products based id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of product>"
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
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Product not found"
}
```


### PUT /products/:id

> Update product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of product>"
}
```

_Request Body_
```
{
 "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
}
```

_Response (200 - Updated)_
```
{
  "message":'Succes update'
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product not found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### DELETE /products/:id

> delete product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of product>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
  {
    "message": 'Succes delete'
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Product not found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```



### POST /login

> Login user

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",  
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
