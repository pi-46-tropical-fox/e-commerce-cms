# My e-Commerce CMS App Server
My e-Commerce CMS App is an application to manage e-commerce content. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## endpoints
``` 
- POST /users/login
- GET /items
- POST /items
- PUT /items/:itemId
- DELETE /items/:itemId
```


## RESTful endpoints
### POST /user/login

> user login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### GET /items

> Get all items

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    },
    {
        "id": 2,
        "name": "Seiko SKX009",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    },
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### POST /items

> Post new item

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
        "id": 4,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    }
```

_Response (201 - Created)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### PUT /items/:itemId

> Update existing item where id: req.params.itemId

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
        "id": 4,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    }
```

_Response (200 - OK)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### DELETE /items/:itemId

> Delete existing item where id: req.params.itemId

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---