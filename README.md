
### SERVER
Deploy Server = https://cms-commerce-obos.herokuapp.com/

### CLIENT
Deploy Client = https://e-commercecms-obos.web.app


# E-Commerce CMS Server

E-Store is here to help you choose what you need (and perhaps, want). We use RESTful API with JSON formatted responses.

## Global Response
```json
    _Response 500: Internal server error_
        {
            "message": "Internal Server Error."
        }
    
    _Response 401: Unauthorized_
        {
            "message": "Please login to access this page."
        }

    _Response 403: Forbidden_
        {
            "message": "You don't have access to this."
        }

```
## User Routes
### POST /register : Create new user
```json
    _Request Body_
        {
            "name": "<user's name>",
            "email": "<user's email>",
            "password": "<user's password>",
            "role": "<user's role>"
        }
    
    _Response 201: Created_
        {   
            "id": "<created id by system>"
            "name": "<posted user's name>",
            "email": "<posted user's email>",
            "password": "<posted user's password>",
            "role": "<posted user's role>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    _Response 400: Bad Request_
        {
            "message": [...] "<list of validation errors>"
        }
```
### POST /login : login to user's account
    _Request Body_
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }
    
    _Response 200: OK_
        {
            "access_token": "<user's token>"
        }
   
    _Response 400: Bad Request_
        {
            "message": "Invalid Email or Password, please check again!"
        }

## Product Routes

### POST /products
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }


    _Request Body_
        {
            "name": "<product's name>",
            "image_url": "<image of product>",
            "price": "<product's price>",
            "stock": "<product's stock>",
            "category": "<product's category>"
        }
    
    _Response 201: Created_
        {
            "id": "<given id by system>",
            "name": "<product's name>",
            "image_url": "<image of product>",
            "price": "<product's price>",
            "stock": "<product's stock>",
            "category": "<product's category>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    _Response 400: Bad Request_
        {
            "message": [...] "<list of validation errors>"
        }
```
### GET /products : show all products.
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }
    _Response 200: OK_
        [
            {
                "id": "<given id by system>",
                "name": "<product's name>",
                "image_url": "<image of product>",
                "price": "<product's price>",
                "stock": "<product's stock>",
                "category": "<product's category>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            },
            {
                "id": "<given id by system>",
                "name": "<product's name>",
                "image_url": "<image of product>",
                "price": "<product's price>",
                "stock": "<product's stock>",
                "category": "<product's category>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            },
            {
                "id": "<given id by system>",
                "name": "<product's name>",
                "image_url": "<image of product>",
                "price": "<product's price>",
                "stock": "<product's stock>",
                "category": "<product's category>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            }
        ]
```
### GET /products/:id
```json
    - Request Header
        {
            "access_token":"<access token>"
        }

    _Request Parameter_
        {
            "id": "<selected product's id>"
        }

    _Request Body_
        Not required.
    
    _Response 200: OK_
        {
            "id": "<given id by system>",
            "name": "<product's name>",
            "image_url": "<image of product>",
            "price": "<product's price>",
            "stock": "<product's stock>",
            "category": "<product's category>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    _Response 404: Not Found_
        {
            message: "Can't find the data."
        }
```
### PUT /products/:id
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }

    _Request Parameter_
        {
            "id": "<selected product's id>"
        }

    _Request Body_
        {
            "name": "<product's name>",
            "image_url": "<image of product>",
            "price": "<product's price>",
            "stock": "<product's stock>",
            "category": "<product's category>"
        }
    
    _Response 200: OK_
        {
            "id": "<given id by system>",
            "name": "<updated product's name>",
            "image_url": "<updated image of product>",
            "price": "<updated product's price>",
            "stock": "<updated product's stock>",
            "category": "<updated product's category>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
    
    _Response 404: Not Found_
        {
            message: "Can't find the data."
        }
   
    _Response 400: Bad Request_
        {
            "message": [...] "<list of validation errors>"
        }
```
### DELETE /products/:id
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }

    _Request Parameter_
        {
            "id": "<selected product's id>"
        }

    _Request Body_
        Not required.
    
    _Response 200_

        {
            "message": "Successfully delete product '<product's name>'!"
        }
   
    _Response 404: Not Found_
        {
            "message": "Can't find the data."
        }

## Banner Routes

### POST /banners
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }

    _Request Body_
        {
            "name": "<banner's name>",
            "image_url": "<image of banner>",
            "description": "<banner's description>",
            "status": "<banner's status>"
        }
    
    _Response 201: Created_
        {
            "id": "<given id by system>",
            "name": "<banner's name>",
            "image_url": "<image of banner>",
            "description": "<banner's description>",
            "status": "<banner's status>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    _Response 400: Bad Request_
        {
            "message": [...] "<list of validation errors>"
        }
```
### GET /banners
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }
    _Response 200_
        [
            {
                "id": "<given id by system>",
                "name": "<banner's name>",
                "image_url": "<image of banner>",
                "description": "<banner's description>",
                "status": "<banner's status>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            },
            {
                "id": "<given id by system>",
                "name": "<banner's name>",
                "image_url": "<image of banner>",
                "description": "<banner's description>",
                "status": "<banner's status>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            },
           {
                "id": "<given id by system>",
                "name": "<banner's name>",
                "image_url": "<image of banner>",
                "description": "<banner's description>",
                "status": "<banner's status>",
                "createdAt": "<date given by system>",
                "updatedAt": "<date given by system>"
            }
        ]
```
### GET /banners/:id
```json
    - _Request Header_
        {
            "access_token":"<access token>"
        }
    _Request Parameter_
        {
            "id": "<selected banner's id>"
        }
    _Response 200_
        {
            "id": "<given id by system>",
            "name": "<banner's name>",
            "image_url": "<image of banner>",
            "description": "<banner's description>",
            "status": "<banner's status>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
    _Response 404: Not Found_
        {
            "message": "Can't find the data."
        }
```
### PUT /banners/:id
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }
    _Request Parameter_
        {
            "id": "<selected banner's id>"
        }
    _Request Body_
        {
            "name": "<banner's name>",
            "image_url": "<image of banner>",
            "description": "<banner's description>",
            "status": "<banner's status>"
        }
    _Response 200: OK_
        {
            "id": "<given id by system>",
            "name": "<updated banner's name>",
            "image_url": "<updated image of banner>",
            "description": "<updated banner's description>",
            "status": "<updated banner's status>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
    _Response 404: Not Found_
        {
            "message": "Can't find the data."
        }
    _Response 400: Bad Request_
        {
            "message": [...] "<list of validation errors>"
        }
   ```
### DELETE /banners/:id
```json
    _Request Header_
        {
            "access_token":"<access token>"
        }

    _Request Parameter_
        {
            "id": "<banner's id>"
        }

    _Request Body_
        Not required.
    
    _Response 200: OK_

        {
            "message": "Successfully delete banner '<banner's name>'!"
        }
   
    - Response 404: Not Found
        {
            "message": "Can't find the data."
        }
```
