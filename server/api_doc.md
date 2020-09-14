# E-Commerce CMS App Server
E-Commerce CMS  App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
```
    POST /tasks
    GET /tasks
    PUT /tasks/:id
    DELETE /tasks/:id

```
```
    POST /users/register
    POST /users/login

```


### POST /tasks

> Create new asset

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "<insert new asset's title>",
  "description": "<insert new asset's description>"
  "category" : "<insert new asset's description : backlog, todo, doing, done>"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "<new asset's title>",
  "description": "<new asset's description>"
  "category" : "<new asset's description : backlog, todo, doing, done>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /tasks

> Get all asset

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
    not needed
}
```

_Response (200 - Ok)_
```
{
  "id": 1,
  "title": "<asset's title>",
  "description": "<asset's description>"
  "category" : "<asset's description : backlog, todo, doing, done>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PUT /tasks/:id

> Replace asset with specific id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "<enter new asset's title>",
  "description": "<enter new asset's description>"
  "category" : "<enter new asset's category>"
}
```

_Response (200 - Ok)_
```
{
  "id": 1,
  "title": "<new asset's title>",
  "description": "<new asset's description>"
  "category" : "<new asset's category>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request - Error Validation"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### DELETE /tasks/:id

> Get asset with specific id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
    "id": "<select id from table >"
}
```

_Response (200 - Ok)_
```
{
  "message": "Deleted data from specific id"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /users/ register

> Create new users

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "email": "<insert new email>",
  "password" : "<insert new password>",
  "organization" : "<insert new organization, default : Hacktiv8>"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "<user's new email>",
  "password" : "<user's new password>",
  "organization" : "<user's new organization, default : Hacktiv8>"
  "updatedAt" : "<new Date>"
  "createdAt" : "<new Date>"

}
```

_Response (403 - Forbidden Access)_
```
{
  "message": "Forbidden Access"
}
```

### POST /users/login

> Signing in users

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "email": "<insert registered email>"
  "password" : "<insert registered  password>"
}
```

_Response (200 - Ok)_
```
{
  "token" : "access_token"

}
```

_Response (403 - Forbidden Access)_
```
{
  "message": "Forbidden Access"
}
```
_Response (404 - Not Found_
```
{
  "message": "Email or Password is wrong"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```







