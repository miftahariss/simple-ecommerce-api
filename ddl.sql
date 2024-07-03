CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    image TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    qty INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
);
