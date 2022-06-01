## Users

### POST /users

To create new users. The following data is required to create a new user:

    {
        firstname: "",
        lastname: "",
        password: ""
    }

### Get /users

To display all users that have been created

### POST /login

To login to the store as an existing user. The following data is required to authenticate a user:

    {
        firstname: "",
        lastname: "",
        password: ""
    }

### GET /users/:id

Displays a user whose id matches the query. This is a protected route, only an authenticated user can view the details of another user.

---

## Products

### POST/products

To create new products. The following data is required to create a new product:

    {
        name: "",
        price: "",
        category: ""
    }

### GET/products/:id

Displays a product whose id matches the query. This is a protected route, only an authenticated user can view the details of this product.
