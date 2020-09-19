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
        "name" : ""
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

```


### Response Body (201)
```json
{

}
```


## PUT /products/:id
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json

```


### Response Body (201)
```json
{

}
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
