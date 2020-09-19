# My Fancy Todo App Server
Application to manage your e-commerce list. This app has :
* Product CRUD
* Banner CRUD
* Login
* JSON formatted response

# RESTful endpoints
* POST/login      
* POST/products   
* GET/products    
* PUT/products    
* DELETE/products

# RESTful endpoints
I. LOGIN
  * Route 
    POST/login
  * Request Headers
    not needed
  * Request Body
    "email"     : <username>
    "password"  : <password>
  * Response (200)
    [
        {
            "email": "<user.email>"
        }
    ]
  * Response (404)
    [
        {
            message: "User not found. Please register"
        }
    ]
  * Response (403)
    [
        {
            message: "Invalid Email or Password"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

II. Add Product
  * Route 
    POST/products
  * Request Headers
    access_token : <access_token>
  * Request Body
    "name"          : <name>
    "image_url"     : <image_url>
    "price"         : <price>
    "stock"         : <stock>
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
            "price"         : <price>
            "stock"         : <stock>
        }
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

III. Get All Product
  * Route 
    GET/products
  * Request Headers
    access_token : <access_token>
  * Request Body
    no needed
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
            "price"         : <price>
            "stock"         : <stock>
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

IV. Update a Product
  * Route 
    PUT/products/:id
  * Request Headers
    access_token : <access_token>
  * Request Body
    "name"          : <name>
    "image_url"     : <image_url>
    "price"         : <price>
    "stock"         : <stock>
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
            "price"         : <price>
            "stock"         : <stock>
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

IV. Delete a Product
  * Route 
    DELETE/products/:id
  * Request Headers
    access_token : <access_token>
  * Request Body
    not needed
  * Response (201)
    [
        {
            message: "Successfully delete product"
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]


    +++++++++++++++++++

V. Add Banner
  * Route 
    POST/banner
  * Request Headers
    access_token : <access_token>
  * Request Body
    "name"          : <name>
    "image_url"     : <image_url>
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
        }
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

VI. Get All Banners
  * Route 
    GET/Banners
  * Request Headers
    access_token : <access_token>
  * Request Body
    no needed
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

VII. Update a Banners
  * Route 
    PUT/banners/:id
  * Request Headers
    access_token : <access_token>
  * Request Body
    "name"          : <name>
    "image_url"     : <image_url>
  * Response (201)
    [
        {
            "id"            : <id>
            "name"          : <name>
            "image_url"     : <image_url>
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

VII. Delete a Banners
  * Route 
    DELETE/banners/:id
  * Request Headers
    access_token : <access_token>
  * Request Body
    not needed
  * Response (201)
    [
        {
            message: "Successfully delete product"
        }
        dst.
    ]
  * Response (400)
    [
        {
            message: "Bad request"
        }
    ]
  * Response (401)
    [
        {
            message: "User Unauthorized"
        }
    ]
  * Response (403)
    [
        {
            message: "Forbidden Access"
        }
    ]
  * Response (404)
    [
        {
            message: "Products no found"
        }
    ]
  * Response (500)
    [
        {
            message: "Internal error server"
        }
    ]

