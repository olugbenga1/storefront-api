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

### GET/products

Displays all the products available in the store.

### GET/products/:id

Displays a product whose id matches the query. This is a protected route, only an authenticated user can view the details of this product.

---

## Orders

### POST/orders

Place an order on existing products in the store. For an order to be placed, user account must be logged in.

The following data is required to create an order:

    {
        "status": "", // can either be open or closed
        "userId": ""
    }

### POST/orders/orderId/products

Add products to existing orders.

1. User account must be logged in.
2. Product(s) must exist in the database.
3. Order status must be "open".

The following data is required to add products to an order:

    {
        "productId": "",
        "orderId": "",
        "quantity": "" // expects a number
    }
