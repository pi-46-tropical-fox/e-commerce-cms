# E-Commerce App Server

## List of available endpoints:
```
- POST /admin/login
- POST /product
- GET /product
- GET /product/:id
- PUT /product/:id
- DELETE /product/:id
```

## POST /admin-login
> Login user

_Request_:

- data:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "access_token": "access_token",
  "role": "admin"
}
```
- status: 400
```json
{  
  "email": "email must be filled",
  "password": "password must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /product
> add new product

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 201
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 400
```json
{  
  "name": "name item must be filled",
  "price": "price must be greater than -1",
  "stock": "stock must be greater than 0"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /product
> show all product

_Request_:

- header:
```json
{
    "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /product/:id
> show product by id

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## PUT /product/:id
> edit product

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 400
```json
{  
  "name": "name item must be filled",
  "price": "price must be greater than -1",
  "stock": "stock must be greater than 0"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## DELETE /product/:id
> delete product

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```
- params:
```json
{
  "id": "integer"
}
```

_Response_:

- status: 200
- body:
```json
{
    "message": "Successfully delete product"
}
```
- status: 400
```json
{  
  "message": "Failed delete product"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```