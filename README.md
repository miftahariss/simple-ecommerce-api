# Simple E-Commerce API

E-Commerce API is a simple API for managing products and adjustment transactions.

## Features

- Manage products:
  - Get a list of products with pagination capability
  - Get product details
  - Create and update products
  - Delete products
  - Import products from an external API (https://dummyjson.com)
- Manage adjustment transactions:
  - Get a list of transactions with pagination capability
  - Get transaction details
  - Create and update transactions
  - Delete transactions

## Technologies

- Node.js
- Hapi.js
- PostgreSQL

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/miftahariss/simple-ecommerce-api.git
    cd simple-ecommerce-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a PostgreSQL database and run the DDL file to create tables:

    ```sql
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        sku VARCHAR(50) NOT NULL UNIQUE,
        image TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT
    );

    CREATE TABLE transactions (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(50) REFERENCES products(sku) ON DELETE CASCADE,
        qty INTEGER NOT NULL,
        amount NUMERIC(10, 2) NOT NULL
    );
    ```

4. Create a `.env` file in the root of the project and add your database configuration:

    ```env
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ```

5. Start the server in development mode:

    ```bash
    npm run dev
    ```

## Endpoints

### Products

- **GET** `/products` - Get a list of products with pagination
- **GET** `/products/{sku}` - Get product details
- **POST** `/products` - Add a new product
- **PUT** `/products/{sku}` - Update a product
- **DELETE** `/products/{sku}` - Delete a product
- **POST** `/products/import` - Import products from an external API

### Transactions

- **GET** `/transactions` - Get a list of transactions with pagination
- **GET** `/transactions/{id}` - Get transaction details
- **POST** `/transactions` - Add a new transaction
- **PUT** `/transactions/{id}` - Update a transaction
- **DELETE** `/transactions/{id}` - Delete a transaction
