CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    orderId bigint REFERENCES orders(id) NOT NULL,
    productId bigint REFERENCES products(id) NOT NULL
);