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

* `email` is required and must be in valid email format
* [password](vscode-file://vscode-app/c:/Users/tusha/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) is required and must be at least 6 characters long

### Responses

#### Success Response

* **Status Code:** 200 OK
* **Content:**

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

Error Responses

##### Validation Error

* **Status Code:** 400 Bad Request
* **Content:**

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
  ##### Authentication Error


  * **Status Code:** 401 Unauthorized
  * **Content:**

  ```json
  {
    "message": "Invalid email or password"
  }
  ```
  ### Security

  * Passwords are compared using bcrypt
  * JWT token is generated upon successful authentication
  * Password is excluded from response
