# SPM3510SEF_2025
#### Course Title : Software Project Management (2025 – Spring Term)
#### Course Code : COMP 3510SEF
#### Group : 31
#### Project Topic : Shopping App
#### Simulation (Figma) : https://www.figma.com/proto/8HHmGuPE0PzGZY3xRuwOsR/Shopping-App?node-id=9-68&t=yPYusViAMkNsT0xT-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=9%3A68![image](https://github.com/user-attachments/assets/22594cc8-76ab-4aea-8724-3363e519af41)

## Frontend - Android App


## Backend - Server
#### Starting the Server
To start the server, run:
```bash
npm start
```

#### API Endpoints
All endpoints require an authorization token except for registration and login.

##### Authentication
- **Register** (`POST /api/auth/signup`):
  - Request Body: `{ username: string, password: string }`
  - Response: `{ message: string }`
- **Login** (`POST /api/auth/login`):
  - Request Body: `{ username: string, password: string }`
  - Response: `{ access_token: string }`

##### Account Management
- **Get User Data** (`GET /api/user`):
  - Requires authorization
  - Response: `{ username: string }`

##### Image Management
- **Upload Image** (`POST /api/images`):
  - Requires authorization
  - Request Body: Form data with image file
  - Response: `{ imageUrl: string }`
- **Get Image** (`GET /api/images/:filename`):
  - Public endpoint
  - Response: Image file

##### Item Management
- **Get Items** (`GET /api/meun/item`):
  - Response: Array of items `{ id: string, name: string, price: number }`
- **Get Item by ID** (`GET /api/meun/item/:id`):
  - Response: Item details
- **Get Disabled Items** (`GET /api/meun/disableditem`):
  - Requires admin authorization
  - Response: Array of disabled items
- **Get Disabled Item by ID** (`GET /api/meun/disableditem/:id`):
  - Requires admin authorization
  - Response: Disabled item details
- **Add Item** (`POST /api/meun/additem`):
  - Requires admin authorization
  - Request Body: `{ name: string, description: string, price: number, category: string, available: boolean }`
  - Response: `{ id: string, item: object }`
- **Edit Item** (`PUT /api/meun/edititem/:id`):
  - Requires admin authorization
  - Request Body: Same as add item
  - Response: Updated item details
- **Delete Item** (`DELETE /api/meun/deleteitem/:id`):
  - Requires admin authorization
  - Response: Empty response with status 204
- **Disable Item** (`PATCH /api/meun/disableitem/:id`):
  - Requires admin authorization
  - Response: Updated item details with availability status

##### Notes
- All protected endpoints require an `Authorization` header with `Bearer <access_token>`.
- Data-modifying operations (POST, PUT, DELETE, PATCH) require appropriate permissions (admin for most).
