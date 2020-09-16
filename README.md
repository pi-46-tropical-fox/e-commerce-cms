# e-commerce-cms
Membuat Content Management System untuk e-commerce
E-Commerce CMS on Thrift & Co. This app has:

&nbsp;

## Endpoints
````
- POST /register
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
````

### RESTful endpoints

### POST /register

> Register
_Request Header_
```
not needed
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
    "email": "admincms@mail.com",
    "message": "Successfully registered"
}
```
_Response (401 - Bad Request)_
```json
{
    "errors": [
        "Invalid email format",
        "Email is required!",
        "Email has been taken!",
        "Password is required!",
        "password must 6-15 characters"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /login

> Login
_Request Header_
```
not needed
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "access_token": "<generate unique token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "errors": [
        "Register first!",
         "Invalid username or password!"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /products

> Create new Thrift & Co products
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
	"name": "sample",
	"image_url": "https://sample.jpg",
	"price": 99,
	"stock": 99,
	"updatedAt": "2020-09-16T16:51:37.327Z",
	"createdAt": "2020-09-16T16:51:37.327Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required!, Image Url is required!, price cant set less than 0, stock cant set less than 0"
}
```

### GET /products

> Show all Thrift & Co products
_Request Header_
```json
{
  "access_token": "<user access token>"
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
		"name": "sample",
		"image_url": "https://sample.jpg",
		"price": 99,
		"stock": 99,
		"updatedAt": "2020-09-16T16:51:37.327Z",
		"createdAt": "2020-09-16T16:51:37.327Z"
	},
	{
		"id": 2,
		"name": "sample",
		"image_url": "https://sample.jpg",
		"price": 99,
		"stock": 99,
		"updatedAt": "2020-09-16T16:51:37.327Z",
		"createdAt": "2020-09-16T16:51:37.327Z"
	}
]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

> Get detail Thrift & Co product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "id": 1,
	"name": "sample",
	"image_url": "https://sample.jpg",
	"price": 99,
	"stock": 99,
	"updatedAt": "2020-09-16T16:51:37.327Z",
	"createdAt": "2020-09-16T16:51:37.327Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Null"
}
```

### PUT /products/:id

> Update Thrift & Co product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```json
{
  "id": 1,
	"name": "edited sample",
	"image_url": "https://sample.jpg",
	"price": 999,
	"stock": 999,
}
```

_Response (200)_
```json
{
  "id": 1,
	"name": "edited sample",
	"image_url": "https://sample.jpg",
	"price": 999,
	"stock": 999,
	"updatedAt": "2020-10-16T16:51:37.327Z",
	"createdAt": "2020-09-16T16:51:37.327Z"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Name is required!, Image Url is required!, price cant set less than 0, stock cant set less than 0"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

> Delete Thrift & Co products data by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
  "message": "Success"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```