# e-commerce-cms
Membuat Content Management System untuk e-commerce

# RESTful Endpoints

- POST /users/register
- POST /users/login
- GET /users/admin
- POST /users/admin
- PUT /users/admin/userId
- DELETE /users/admin/userId


### POST /register

_request body_
```json
{
    "name":"string",
    "address":"string",
    "phone":"string",
    "role":"string",
    "email":"string",
    "password":"string",
}

_response (201-Created)_
```json
{
    "id":"integer",
    "name":"string",
    "email":"string",
    "role":"string"
}

_response (401-Bad request)_
```json

{
    "message":"please fill empty field"
}
```

_response (500-Internal Server error)_
```json
{
    "message":"internal server error"
}
```

### POST /users/login
_request body_
```json

{
    "email":"string",
    "password":"string"
}

```
_response (200 - Success)_
```json
{
    "access_token": "<access_token>"
}
```
_response (400 - Bad request)_
```json

{
    "message": "please fill empty field"
}
```

_response (500-Internal server error)_
```json
{
    "message":"Internal server error"
}