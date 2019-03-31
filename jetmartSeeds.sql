INSERT INTO products (product_name, department_name, price, stock_quantity)     /* Insert into the products table
                                                                                No comma after the ) here */
VALUES 
("iPhone", "Electronics", 999.99, 50),                          /* Comma after ) here */
("Canon Camera Body", "Camera", 2999.99, 20),                   /* Comma after ) here */
("Canon Camera Lens", "Camera", 1999.99, 20),                   /* Comma after ) here */
("Yamaha Electric Piano", "Musical Instruments", 669.99, 5),    /* Comma after ) here */
("Bedding Sheets Set Queen Size", "Household", 118.95, 20),     /* Comma after ) here */
("Contemporary Sofa", "Furniture", 370.44, 5),                  /* Comma after ) here */
("Kitchen Aid Stand Mixer", "Home & Kitchen", 279.99, 5),       /* Comma after ) here */
("Gain Laundry Detergent", "Home & Kitchen", 16.99, 30),        /* Comma after ) here */
("Aveeno Moisturizer", "Personal Care", 7.99, 80),              /* Comma after ) here */
("Copy Paper", "Stationary", 8.99, 100);                        /* Semicolon after ) here */



/* -------------------- */
/* A long hand way of writing the above would be:

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iPhone", "Electronics", 999.99, 10); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Canon Camera Body", "Camera", 2999.99, 30); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Canon Camera Lens", "Camera", 1999.99, 30); 

etc.
*/