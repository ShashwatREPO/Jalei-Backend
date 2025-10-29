# Jalei Backend API Documentation

This document provides detailed information about all available API routes for integration.

## Base URL
```
http://localhost:3000
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## User Routes

### 1. Register User
**POST** `/api/users/register`

Creates a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

### 2. Login
**POST** `/api/users/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### 3. Get User Profile
**GET** `/api/users/profile`

Retrieves the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 4. Update User Profile
**PUT** `/api/users/profile`

Updates the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "Jonathan",
  "lastName": "Doe",
  "bio": "Software developer"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "firstName": "Jonathan",
    "lastName": "Doe",
    "bio": "Software developer"
  }
}
```

---

## Product Routes

### 1. Get All Products
**GET** `/api/products`

Retrieves all products with optional filtering and pagination.

**Query Parameters:**
- `category` (optional): Filter by category
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /api/products?category=electronics&minPrice=100&maxPrice=500&page=1&limit=20
```

**Response (200):**
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones",
      "price": 299.99,
      "category": "electronics",
      "stock": 50,
      "images": ["url1", "url2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 20
  }
}
```

---

### 2. Get Product by ID
**GET** `/api/products/:id`

Retrieves a specific product by ID.

**Example:**
```
GET /api/products/prod_123456
```

**Response (200):**
```json
{
  "id": "prod_123456",
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 299.99,
  "category": "electronics",
  "stock": 50,
  "images": ["url1", "url2"],
  "specifications": {
    "battery": "30 hours",
    "bluetooth": "5.0"
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 3. Create Product (Admin)
**POST** `/api/products`

Creates a new product (requires admin role).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Smart Watch",
  "description": "Feature-rich smartwatch",
  "price": 399.99,
  "category": "electronics",
  "stock": 30,
  "images": ["url1", "url2"],
  "specifications": {
    "display": "AMOLED",
    "waterproof": "IP68"
  }
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "prod_789012",
    "name": "Smart Watch",
    "price": 399.99,
    "stock": 30
  }
}
```

---

### 4. Update Product (Admin)
**PUT** `/api/products/:id`

Updates an existing product.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "price": 349.99,
  "stock": 25
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "prod_789012",
    "name": "Smart Watch",
    "price": 349.99,
    "stock": 25
  }
}
```

---

### 5. Delete Product (Admin)
**DELETE** `/api/products/:id`

Deletes a product.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Order Routes

### 1. Create Order
**POST** `/api/orders`

Creates a new order for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod_123456",
      "quantity": 2
    },
    {
      "productId": "prod_789012",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "order_456789",
    "userId": "user_id",
    "items": [...],
    "totalAmount": 999.97,
    "status": "pending",
    "shippingAddress": {...},
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 2. Get User Orders
**GET** `/api/orders`

Retrieves all orders for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, processing, shipped, delivered, cancelled)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "orders": [
    {
      "id": "order_456789",
      "totalAmount": 999.97,
      "status": "processing",
      "itemCount": 3,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {...}
}
```

---

### 3. Get Order by ID
**GET** `/api/orders/:id`

Retrieves a specific order.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "order_456789",
  "userId": "user_id",
  "items": [
    {
      "productId": "prod_123456",
      "productName": "Wireless Headphones",
      "quantity": 2,
      "price": 299.99,
      "subtotal": 599.98
    }
  ],
  "totalAmount": 999.97,
  "status": "processing",
  "shippingAddress": {...},
  "trackingNumber": "TRACK123456",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 4. Update Order Status (Admin)
**PATCH** `/api/orders/:id/status`

Updates the status of an order.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456"
}
```

**Response (200):**
```json
{
  "message": "Order status updated successfully",
  "order": {
    "id": "order_456789",
    "status": "shipped",
    "trackingNumber": "TRACK123456"
  }
}
```

---

### 5. Cancel Order
**POST** `/api/orders/:id/cancel`

Cancels an order (only if status is pending or processing).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Order cancelled successfully",
  "order": {
    "id": "order_456789",
    "status": "cancelled"
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "details": ["Email is required", "Password must be at least 8 characters"]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limiting

API requests are limited to:
- **100 requests per 15 minutes** for authenticated users
- **20 requests per 15 minutes** for unauthenticated users

When rate limit is exceeded:
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 900
}
```

---

## Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"SecurePass123!","firstName":"John","lastName":"Doe"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'
```

### Get products with authentication:
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create an order:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"prod_123","quantity":2}],"shippingAddress":{"street":"123 Main St","city":"NYC","state":"NY","zipCode":"10001","country":"USA"},"paymentMethod":"credit_card"}'
```

---

## Environment Setup

Make sure to set the following environment variables:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## Support

For issues or questions, please contact the development team or create an issue in the project repository.
