# My E-commerce Server
Website E-commerce. This app has : 
* Register & Login
* CRUD Products
* CRUD Banners
* JSON formatted response

&nbsp;

## endpoints
```
- POST /user/register
- POST /user/login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /banners
- POST /banners
- GET /banners/:id
- PUT /banners/:id
- DELETE /banners/:id

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

### Get /products/:id || :gender
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
id=[integer] ||
gender=['Men', 'Women']

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
        "Forbidden Access"
    ]
}
```

### Get /products/category/:CategoryId
Find detail product by CategoryId

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
        "Forbidden Access"
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
        "Name cannot empty",
        "Price cannot zero",
        "Stock cannot zero",
        "Please select category"
    ]
}
```
### PATCH /products/:id
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
    "stock": "<stock>"
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

### GET /banners

> Get all Banners

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
    "title": "<banner name>",
    "status": "<Activ or Non Activ>",
    "image_url": "<image_url>",
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
### POST /banners

> Create new Banner

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
    "title": "<banner name>",
    "status": "<Activ or Non Activ>",
    "image_url": "<image_url>",
  }
]
```

_Response (201 - Created)_
```
[
  {
    "id": "<given by system>",
    "title": "<banner name>",
    "status": "<Activ or Non Activ>",
    "image_url": "<image_url>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Title cannot empty",
        "Please input with Activ or Not Activ",
        "Image_url cannot empty"
    ]
}
```

### Get /banners/:id
Find detail banner by Id

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
    "id": "<given by system>",
    "title": "<banner name>",
    "status": "<Activ or Non Activ>",
    "image_url": "<image_url>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```
_Response (404 - Data not found)_
```
{
    "errors": [
        "Forbidden Access"
    ]
}
```


### PUT /banners/:id
Update banner by ID

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
    "title": "<banner name>",
    "status": "<Activ or Non Activ>",
    "image_url": "<image_url>",
  }
]
```
_Response (200 - ok)_
```
{
"message" : "Successfully update Banner with id:<id>"
}
```
_Response (403 - Forbidden Access)_
```
{
    "errors": [
        "Title cannot empty",
        "Please input with Activ or Not Activ",
        "Image_url cannot empty"
    ]
}
```


### DELETE /banners/:id
Delete banner data by ID

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
"message" : "Successfully delete Banner with id:<id>"
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
---
### POST /categories

> Create new CAtegory

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
    "category": "<category name>"
  }
]
```

_Response (201 - Created)_
```
[
  {
    "id": "<given by system>",
    "category": "<category name>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "category cannot empty"
    ]
}
```
