# My E-commerce Server
Website E-commerce. This app has : 
* Register & Login
* CRUD Products
* JSON formatted response

&nbsp;

## endpoints
```
- POST /user/:register
- POST /user/:login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

```

## RESTful endpoints


### POST /register
> Create new User

_Request Header_
```
not needed
```
_Request Body_
```
{
  "name": "<username>",
  "email": "<email>",
  "status": "<password>",
}
```
_Response (201 - Ok)_
```
[
  {
    "name": "<username>",
    "email": "<email>",
  },
]
```
_Response (400 - Bad Request)_
```
{
  "errors": [
      "Username cannot empty",
      "Invalid email format",
      "Pasword min 6 characters max 15 characters"
  ]
}
```
### POST /login

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<email>",
  "status": "<password>",
}
```
_Response (200 - Ok)_
```
{
    "access_token": <access_token>,
    "id" : <id>,
    "name": <name>,
    "email": <email>    
}
```
_Response (400 - Bad Request)_
```
{
  "errors": [
      "Invalid username or password"
  ]
}
```

### GET /products

> Get all Products

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

_Response (200 - Ok)_
```
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "category": "<category>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (401 - User not authenticated  or 404 - Data not Found)_
```
{
    "errors": [
        "User not authenticated"    
        "Data not found",
    ]
}
```
---
### POST /products

> Create new Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
[
  {
    "name": "<product name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "category": "<category>",
  }
]
```

_Response (201 - Created)_
```
[
  {
    "id": "<given by system>",
    "name": "<product name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "category": "<category>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Name cannot empty",
        "Price cannot zero",
        "Stock cannot zero",
        "Please select category"
    ]
}
```

### Get /products/:id
Find detail product by Id

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
_Request params_
```
id=[integer]
```
_Response (200 - Ok)_
```
[
  {
    "id": "<product Id>",
    "name": "<product name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "category": "<category>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```
_Response (404 - Data not found)_
```
{
    "errors": [
        "Data not found",
    ]
}
```


### PUT /products/:id
Update product by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
[
  {
    "name": "<product name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "category": "<category>",
  }
]
```
_Response (200 - ok)_
```
{
"message" : "Successfully update Product with id:<id>"
}
```
_Response (403 - Forbidden Access)_
```
{
    "errors": [
        "Forbidden Access"
    ]
}
```


### DELETE /products/:id
Delete product data by ID

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
_Request params_
```
id=[integer]
```
_Response (200 - ok)_
```

{
"message" : "Successfully delete Product with id:<id>"
}

```
_Response (403 - Forbidden Access)_
```
{
    "errors": [
        "Forbidden Access"
    ]
}
```
