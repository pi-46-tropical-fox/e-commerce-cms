# API Endpoints

```
POST /user/login

GET /products
GET /products/:id
POST /products
DELETE /products/:id
PUT /products/:id
```

## POST /user/login
### Request Header
```
none
```

### Request Body
```json
{
    "email" : "hal@g.com",
    "password" : "password"
}
```

### Response Body (200)
```json
{
    "id" : 1,
    "email" : "hal@g.com",
    "access_token" : "<jwt>"
}
```

### Response Body (401) (wrong credentials)
```json
{
    "message" : "Email/Password combination not found!"
}
```

## GET /products
### Request Headers
```json
{
    "access_token" : "<jwt>"
}

```

### Response Body (200)
```json
[
    {
        "id" : 1,
        "name" : "Kuaci",
        "image_url" : "https://goocl.c/a.jpg",
        "stock" : 2,
        "price" : 21390
    }
]
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## POST /products
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json
{
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 21390
}
```


### Response Body (201)
```json
{
    "id" : 1,
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 21390
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## PUT /products/:id
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json
{
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 1000
}
```

### Response Body (200)
```json
{
    "id" : 1,
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 1000
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## DELETE /products/:id
```json
{
    "access_token" : "<jwt>"
}
```

### Response Body (200)
```json
{
    "message" : "Item deleted"
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```
