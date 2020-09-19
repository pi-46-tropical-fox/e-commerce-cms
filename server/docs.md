# Dota Mall

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /products`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`

### `POST` /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

### `POST` /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "role": "string",
    "access_token": "jwt string"
}
```

### `GET` /products


Get all products registered

Request:

- headers: `access_token: (string)`

Response:

- status: 200
- body:

```json
{
  "products": [
    {
      "id": "integer",
      "name": "string",
      "image_url": "string",
      "price": "integer",
      "stock": "integer",
      "category": "string"
    }
  ]
}
```

### `POST` /products

Add a product

Request:

- headers: `access_token (string)`
- body: 
```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "category": "string"
}
```


Response:

- status: 201
- body:

```json
{
    "task": {
        "id": "integer",
        "name": "string",
        "image_url": "string",
        "price": "integer",
        "stock": "integer",
        "category": "string"
    }
}
```

### `PUT` /products/:id

Restock product

Request:

- headers: `access_token (string)`
- params: `id (integer)`
- body: `amount (integer)`

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": "integer",
        "name": "string",
        "stock": "integer"
    }
}
```

### `PATCH` /products/:id
Edit product

Request:

- headers: `access_token (string)`
- params: `id: (integer)`
- body:
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "category": "string"
}
```

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": "integer",
        "name": "string",
        "image_url": "string",
        "price": "integer",
        "stock": "integer",
        "category": "string"
    }
}
```

### `DELETE` /products/:id

Delete product

Request:

- headers: `access_token (string)`
- params: `id: (integer)`

Response:

- status: 200
- body:

```json
{
  "message": "Product deleted Successfully"
}
```

