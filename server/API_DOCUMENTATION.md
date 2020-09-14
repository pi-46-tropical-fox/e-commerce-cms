# E-Commerce CMS Server

This E-Commerce CMS server has:

- RESTful API endpoint for products (CRUD Operation)
- RESTful API endpoint for categories (CRUD Operation)
- RESTful API endpoint for banners (CRUD Operation)
- JSON formatted request & response

## RESTful API endpoints overview

- POST /login
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- POST /categories
- GET /categories
- GET /categories/:id
- PUT /categories/:id
- DELETE /categories/:id
- POST /banners
- GET /banners
- GET /banners/:id
- PUT /banners/:id
- DELETE /banners/:id

## RESTful API endpoints detail

### POST /login

> Login to app

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<user id>",
	"username": "<user username>",
	"email": "<user email>",
	"OrganizationId": "<user organization id",
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidLogin",
			"message": "Invalid email or password!"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /products

> Create a new product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		},
		{
			"name": "is_null",
			"message": "Price cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Price cannot empty"
		},
		{
			"name": "is_null",
			"message": "Stock cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Stock cannot empty"
		},
		{
			"name": "isInt",
			"message": "Price must be positive numbers with no leading zeroes"
		},
		{
			"name": "isInt",
			"message": "Stock must be positive numbers with no leading zeroes"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /products

> Get all products

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<product id>",
		"name": "<product name>",
		"image_url": "<product image url>",
		"price": "<product price>",
		"stock": "<product stock>",
		"slug": "<product slug>",
		"CategoryId": "<product category id>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /products/:id

> Get products by id

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /products/:id

> Update a product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		},
		{
			"name": "is_null",
			"message": "Price cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Price cannot empty"
		},
		{
			"name": "is_null",
			"message": "Stock cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Stock cannot empty"
		},
		{
			"name": "isInt",
			"message": "Price must be positive numbers with no leading zeroes"
		},
		{
			"name": "isInt",
			"message": "Stock must be positive numbers with no leading zeroes"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /products/:id

> Delete a product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /categories

> Create a new category

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<category id>",
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /categories

> Get all categories

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<category id>",
		"name": "<category name>",
		"slug": "<category slug>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /categories/:id

> Get task by id

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<category id>",
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCategory",
			"message": "Error category not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /categories/:id

> Update a category

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<category id>",
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCategory",
			"message": "Error category not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /categories/:id

> Delete a category

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<category id>",
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCategory",
			"message": "Error category not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /banners

> Create a new banner

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<banner id>",
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Status cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Status cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /banners

> Get all banners

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<banner id>",
		"title": "<banner title>",
		"image_url": "<banner image url>",
		"status": "<banner status>",
		"slug": "<banner slug>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /banners/:id

> Get banner by id

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<banner id>",
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundBanner",
			"message": "Error banner not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /banners/:id

> Update a banner

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<banner id>",
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundBanner",
			"message": "Error banner not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Status cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Status cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /banners/:id

> Delete a banner

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<banner id>",
	"title": "<banner title>",
	"image_url": "<banner image url>",
	"status": "<banner status>",
	"slug": "<banner slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundBanner",
			"message": "Error banner not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```
