# API Documentation

This document provides the endpoints and methods of the API for this service. The service allows users to register, login, manage products, and make transactions.

## Base URL

The base URL for all endpoints is: `https://example.com/api`

## Endpoints

### Register

Endpoint: `/signup`

Method: `POST`

Request body:
```json
{
  "username": "string",
  "password": "string"
}
```

Success response: `201 Created`

Error responses:
- `409 Conflict` Data already exists
- `422 Unprocessable Entity` Invalid request data
- `500 Internal Server Error` Unexpected server error

### Login

Endpoint: `/signin`

Method: `POST`

Request body:
```json
{
  "username": "string",
  "password": "string"
}
```

Success response: `200 OK`

Error responses:
- `401 Unauthorized` Invalid credentials
- `422 Unprocessable Entity` Invalid request data
- `500 Internal Server Error` Unexpected server error

### Read Products

Endpoint: `/product`

Method: `GET`

Request query: 
- `category_id` (optional, number)

Request headers: 
- `Authorization` (bearer token)

Success response: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Product 1",
    "category_id": 2,
    "price": 1000
  },
  {
    "id": 2,
    "name": "Product 2",
    "category_id": 3,
    "price": 2000
  }
]
```

Error responses:
- `401 Unauthorized` Invalid token
- `404 Not Found` Data not found
- `500 Internal Server Error` Unexpected server error

### Add Product to Cart

Endpoint: `/addcart`

Method: `POST`

Request body:
```json
{
  "product_id": 1
}
```

Request headers: 
- `Authorization` (bearer token)

Success response: `201 Created`

Error responses:
- `401 Unauthorized` Invalid token
- `404 Not Found` Data not found
- `422 Unprocessable Entity` Invalid request data
- `500 Internal Server Error` Unexpected server error

### Read Cart

Endpoint: `/cart`

Method: `GET`

Request headers: 
- `Authorization` (bearer token)

Success response: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 1000
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 2000
  }
]
```

Error responses:
- `401 Unauthorized` Invalid token
- `404 Not Found` Data not found
- `500 Internal Server Error` Unexpected server error

### Delete Product from Cart

Endpoint: `/deletecart`

Method: `PUT`

Request query:
- `id` (number)

Request headers: 
- `Authorization` (bearer token)

Success response: `200 OK`

Error responses:
- `401 Unauthorized` Invalid token
- `404 Not Found` Data not found
- `500 Internal Server Error` Unexpected server error

### Checkout

Endpoint: `/checkout`

Method: `POST`

Request headers: 
- `Authorization` (bearer token)

Success response: `201 Created`

Error responses:
- `401 Unauthorized` Invalid token
- `422 Unprocessable Entity` Invalid request data
- `500 Internal Server Error` Unexpected server error

### Payment

Endpoint: `/payment`

Method: `PUT`

Request headers: 
- `Authorization` (bearer token)

Success response: Thank You