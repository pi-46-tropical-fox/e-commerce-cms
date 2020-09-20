# BENZO
A simple website to manage orgnization's task.

&nbsp;

## RESTful endpoints
### POST /register

> Register new account

_Request Header_
```
{
 not needed
}
```

_Request Body_
```
{
  "email":"<your email>"
  "password":"<your password>",
  "role":"<your organization>",
  }
```

_Response (201)_
```
  {
      "message":"Register Succeeded"
    "id":"<your id>"
    "email":"<your email>"
  }
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
_Response (400)_
```
{
  "message": "Invalid email format"
}
```
_Response (400)_
```
{
  "message": "Password must contain min. 6 and max. 100 characters"
}
```


---
### POST /login

> Login account

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email":"<your email>",
  "password":"<your password>"
  }
```

_Response (200)_
```
  {
      "message": "Login succeeded",
        "id": "<your user id>",
    "access_token": "<your access token>",
    "email" : "<your registered email>" 
  }
```

_Response (400)_
```
{
  "message": "Email or Password is invalid"
}
```
_Response (400)_
```
{
  "message": "Each of the following forms must be filled"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /product

> Show all products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": 1,
            "name": "Jersey Durrant",
            "imageURL": "https://cdn.shopify.com/s/files/1/0025/8034/8995/products/ythdurantasc1_large.png?v=1599767525",
            "price": 1500000,
            "stock": 2,
            "category": "sportinggoods",
            "createdAt": "2020-09-19T10:01:34.232Z",
            "updatedAt": "2020-09-19T10:04:34.063Z"
        }
    ]
}
```
_Response (401)_
```
{
  "message": "User is not authenticated"
}
```
_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /Product

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{   
  "name" : "<your product name>",
  "price": "<your product price>",
  "stock": "<youtr product stock>",
  "imageURL":"<your iamge url
  "category": "<your category>"
}
```

_Response (201 - Created)_
```
{
   {
    "id": 1,
    "message": "Product has been successfully added",
    "name": "<your product name>",
    "stock": 50000,
    "price": "Rp50,000,00"
}
}
```
_Response (400)_
```
{
  "message": "Name must be filled"
}
```

_Response (400)_
```
{
  "message": "Price must be filled"
}
```

_Response (400)_
```
{
  "message": "Stock must be filled"
}
```

_Response (400)_
```
{
  "message": "Price must be greater than 0"
}
```
_Response (400)_
```
{
  "message": "Stock must be equal or greater than 0"
}
```
_Response (400)_
```
{
  "message": "Price must be a valid integer"
}
```
_Response (400)_
```
{
  "message": "Stock must be a valid integer"
}
```

_Response (401)_
```
{
  "message": "User is not authenticated"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PATCH /product/:id

> Update specific product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  {
    "name" : "<your product name>",
    "imageURL":"asfgasfg",
    "price": <your product price>,
    "stock": <your product stock>,
    "category": <your product category>
  }
}
```

_Response (200)_
```
{
    "message": "Product has been successfully updated."
}

```

_Response (400)_
```
{
  "message": "Price must be greater than 0"
}
```

_Response (400)_
```
{
  "message": "Stock must be equal or greater than 0"
}
```

_Response (401 - Bad Request)_
```
{
  "message": "User is not authenticated"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /product/:id

> Delete task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Product has been successfully deleted."
}
```

_Response (401 - Bad Request)_
```
{
  "message": "User is not authenticated"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---