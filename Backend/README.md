# User Registration API Documentation

## Register User Endpoint

### `POST /users/register`

Creates a new user account in the system.

### Request

- **Method:** POST
- **URL:** `/users/register`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "string", // minimum 3 characters
    "lastname": "string"   // optional, minimum 3 characters if provided
  },
  "email": "string",      // valid email format, minimum 5 characters
  "password": "string"    // minimum 6 characters
}
```

### Validation Rules

* `firstname` is required and must be at least 3 characters long
* `email` is required, must be unique and in valid email format
* `password` is required and must be at least 6 characters long
* `lastname` is optional but if provided must be at least 3 characters long

### Responses

#### Success Response

* **Status Code:** 201 Created
* **Content:**

  {
  "token": "jwt_token_string",
  "user": {
  "_id": "mongodb_generated_id",
  "fullname": {
  "firstname": "string",
  "lastname": "string"
  },
  "email": "string",
  "socketId": null
  }
  }

---

#### Error Responses

##### Validation Error

* **Status Code:** 400 Bad Request
* **Content:**

**{**

**  **"errors"**: **[

**    **{

**      **"msg"**: **"Invalid email"**,**

**      **"param"**: **"email"**,**

**      **"location"**: **"body"

**    **}**,**

**    **{

**      **"msg"**: **"First name must be atleast 3 characters long"**,**

**      **"param"**: **"fullname.firstname"**,**

**      **"location"**: **"body"

**    **}**,**

**    **{

**      **"msg"**: **"Password must be atleast 6 characters in length"**,**

**      **"param"**: **"password"**,**

**      **"location"**: **"body"

**    **}

**  **]

**}**

##### Server Error

* **Status Code:** 500 Internal Server Error
* **Content:**

**{**

**  **"error"**: **"All fields are required"

**}**

### Security

* Password is hashed using bcrypt before storage
* JWT token is generated using the user's ID
* Password is excluded from user object in responses

**This README provides comprehensive documentation f**or the /users/register endpoint, including:

**1. Request format and requirements**

**2. Validation rules**

**3. Success and error responses**

**4. Security measures implemented**

## Login User Endpoint

### `POST /users/login`

Authenticates a user and returns a JWT token.

### Request

- **Method:** POST
- **URL:** `/users/login`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Validation Rules

- `email` is required and must be in valid email format
- 

password

 is required and must be at least 6 characters long

### Responses

#### Success Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "mongodb_generated_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  }
}
```

#### Error Responses

##### Validation Error

- **Status Code:** 400 Bad Request
- **Content:**

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password should be atleast 6 characters in lengths",
      "param": "password",
      "location": "body"
    }
  ]
}
```

##### Authentication Error

- **Status Code:** 401 Unauthorized
- **Content:**

```json
{
  "message": "Invalid email or password"
}
```

## Get User Profile Endpoint

### `GET /users/profile`

Retrieves the authenticated user's profile information.

### Request

- **Method:** GET
- **URL:** `/users/profile`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
  - or
  - `Cookie: token=<jwt_token>`

### Responses

#### Success Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "_id": "mongodb_generated_id",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": null
}
```

#### Error Response

* **Status Code:** 401 Unauthorized
* **Content:**

```json
{
  "message": "Authentication required"
}
```

## Logout User Endpoint

### `GET /users/logout`

Logs out the currently authenticated user.

### Request

* **Method:** GET
* **URL:** `/users/logout`
* **Headers:**
  * `Authorization: Bearer <jwt_token>`
  * or
  * `Cookie: token=<jwt_token>`

### Responses

#### Success Response

* **Status Code:** 200 OK
* **Content:**

  ```json
  {
    "message": "Logged Out"
  }
  ```

  #### Error Response


  * **Status Code:** 401 Unauthorized
  * **Content:**

    ```json
    {
      "message": "Authentication required"
    }
    ```

### Security Notes

* Both endpoints require valid JWT token authentication
* Token can be provided via Authorization header or Cookie
* On logout, token is blacklisted to prevent reuse
* Cookies are cleared on logout.

# Captain API Documentation

## Register Captain Endpoint

### `POST /captain/register`

Creates a new captain account in the system.

### Request

- **Method:** POST
- **URL:** `/captain/register`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "fullname": {
    "firstName": "string",  // minimum 3 characters
    "lastName": "string"    // optional, minimum 3 characters if provided
  },
  "email": "string",        // valid email format
  "password": "string",     // minimum 6 characters
  "vehicle": {
    "color": "string",      // minimum 3 characters
    "plate": "string",      // minimum 3 characters
    "capacity": "number",   // minimum 1
    "vehicleType": "string" // "car" | "motorcycle" | "auto"
  }
}
```

### Responses

#### Success Response

* **Status Code:** 201 Created
* **Content:**

  ```json
  {
    "token": "jwt_token_string",
    "captain": {
      "_id": "mongodb_generated_id",
      "fullname": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": number,
        "vehicleType": "string"
      },
      "status": "inactive",
      "socketId": null,
      "location": {
        "lat": null,
        "lon": null
      }
    }
  }
  ```

#### Error Responses

##### Validation Error

* **Status Code:** 400 Bad Request
* **Content:**

  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstName",
        "location": "body"
      },
      {
        "msg": "Please fill a valid email address",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

### Security

* Password is hashed using bcrypt before storage
* JWT token is generated using the captain's ID
* Password is excluded from response objects


## Login Captain Endpoint

### `POST /captain/login`

Authenticates a captain and returns a JWT token.

### Request

- **Method:** POST
- **URL:** `/captain/login`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Responses

#### Success Response


**Status Code:** 200 OK


**Content:**

```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "mongodb_generated_id",
    "fullname": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lon": null
    }
  }
```

## Get Captain Profile Endpoint

### `GET /captain/profile`

Retrieves the authenticated captain's profile.

### Request

* **Method:** GET
* **URL:** `/captain/profile`
* **Headers:**
  * `Authorization: Bearer <jwt_token>`
  * or
  * `Cookie: token=<jwt_token>`

### Responses

#### Success Response


**Status Code:** 200 OK


**Content:**

```json
{
  "captain": {
    "_id": "mongodb_generated_id",
    "fullname": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lon": null
    }
  }
}
```

## Logout Captain Endpoint

### `GET /captain/logout`

Logs out the currently authenticated captain.

### Request

* **Method:** GET
* **URL:** `/captain/logout`
* **Headers:**
  * `Authorization: Bearer <jwt_token>`
  * or
  * `Cookie: token=<jwt_token>`

### Responses

#### Success Response

* **Status Code:** 200 OK

  ```json
  {
    "message": "Logout success"
  }
  ```
  ### Security Notes


  * All endpoints except login require valid JWT token
  * Token can be provided via Authorization header or Cookie
  * Tokens are blacklisted on logout
  * Cookies are cleared after logout
