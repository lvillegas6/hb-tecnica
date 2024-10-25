CREATE TABLE Product (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    quantity INT NOT NULL CHECK (quantity >= 0),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);