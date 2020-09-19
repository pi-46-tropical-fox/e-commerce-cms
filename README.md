# e-commerce-cms
Content Management System for E-Commerce

Admin link: https://ecommerce-4fca5.web.app/admin/login

### Restfull API

---
#### POST /register
###### Login admin
- Requst Body:
```
{
	"email": < user email >,
	"password":< password >
}
```

- Request Header:
```
	not needed
```
 Response ( 200 - Logged In ):
```
{
    "access_token": <access_token>,
    "email": < user email >
}
```

- Error Response ( 400 - Wrong password):
```
{
    "message": "Wrong password"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "message": "Internal server error"
}
```

---
#### GET admin/products
###### load all product
- Request Body:
```
    not needed
```

- Request Header:
```
{
    "access_token": <access_token>
}
```

- Response ( 200 - Load data ):
```
[
    {
        "id": 9,
        "name": "samsung 9",
        "image_url": "google.com",
        "category": "completed",
        "price": 10000000,
        "stock": 23,
        "category": "smartphone",
        "description: "new",
        "createdAt": "2020-04-09T18:45:51.986Z",
        "updatedAt": "2020-04-09T18:45:51.986Z"
    },
    {
        "id": 10,
        "name": "samsung s9",
        "image_url": "google.com",
        "category": "completed",
        "price": 11000000,
        "stock": 23,
        "category": "smartphone",
        "description: "new",
        "createdAt": "2020-04-09T18:45:51.986Z",
        "updatedAt": "2020-04-09T18:45:51.986Z"
    }
]
```

- Error Response ( 404 - Token not found ):
```
{
    "message": "Token not found"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "message": "Internal server error"
}
```

---
#### POST /admin/products
###### post the product
- Request headers:
```
{
    "access_token": <access_token>
}
```

- Request body:
```
{
	"name": "samsung 
	"image_url": "google.com",
	"category": "completed",
	"price": 10000000,
	"stock": 23,
	"category": "smartphone",
	"description: "new",
}
```

- Response ( 200 - Data created )
```
{
	"message" : "data created"
}
```

- Error Response ( 404 - Token not found ):
```
{
    "message": "Token not found"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "message": "Internal server error"
}
```

---
#### DELETE /admin/products
###### delete product
- Request body:
```
not needed
```

- Request headers:
```
{
    "access_token": <access_token>
}
```

- Request params:
```
{
    "id": 7
}
```

- Response ( 200 - Data created):
```
{
    "message": "Product successfully deleted"
}
```

- Error Response ( 404 - Product not found ):
```
{
    "message": "Product not found"
}
```

- Error Response ( 403 - Unauthorized account ):
```
{
    "message": "Unauthorized account"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "message": "Internal server error"
}
```

---
#### PUT /admin/products/:id
###### edit product
- Request params:
```
{
    "id": 7
}
```

- Request headers:
```
{
    "access_token": <access_token>
}
```

- Request Body:
```
{
	"name": "samsung 
	"image_url": "google.com",
	"category": "completed",
	"price": 10000000,
	"stock": 23,
	"category": "smartphone",
	"description: "new"
}
```

- Response ( 200 Product edited ):
```
{
	"name": "samsung 
	"image_url": "google.com",
	"category": "completed",
	"price": 10000000,
	"stock": 23,
	"category": "smartphone",
	"description: "new",
	"createdAt": "2020-04-09T18:45:51.986Z",
	"updatedAt": "2020-04-09T18:45:51.986Z"
}
```

- Error Response ( 404 - Product not found ):
```
{
    "message": "Product not found"
}
```

- Error Response ( 403 - Unauthorized account ):
```
{
    "message": "Unauthorized account"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "message": "Internal server error"
}
```




