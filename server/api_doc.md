# API Endpoints

```
POST /user/login

GET /products
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
