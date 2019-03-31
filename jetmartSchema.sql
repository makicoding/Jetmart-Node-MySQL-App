DROP DATABASE IF EXISTS jetmartDB;              /* Drops (i.e. deletes) any existing databases called jetmartDB if it already exists */
CREATE DATABASE jetmartDB;                      /* Creates a database called jetmartDB */

USE jetmartDB;                                  /* Use jetmartDB for the following statements */

CREATE TABLE products(                          /* Create a new table called products */
    item_id INT NOT NULL AUTO_INCREMENT,        /* Create a numeric column (INT means Integer. You could also write INTEGER too) called item_id which is not null (not zero) and which will automatically increment its default value as we create new rows */
    product_name VARCHAR(100) NOT NULL,         /* Create a string column (VARCHAR) called product_name, which is not null (not zero). The (100) means we are setting the string to be up to 100 characters */
    department_name VARCHAR(100) NOT NULL,      /* Create a string column (VARCHAR) called department_name, which is not null (not zero).  The (100) means we are setting the string to be up to 100 characters */
    price DECIMAL(10, 2),                       /* Create a decimal number column called price. The (10, 2) means we are setting up the column to store up to 10 places (scale), with 2 to the right of the decimal point (precision). An example would be 10000000.23 */
    stock_quantity INT,                         /* Create a numeric column (INT means Integer. You could also write INTEGER too) called stock_quantity. The stock can potentially become zero and so therefore we do not set this to not null */
    PRIMARY KEY (item_id)                       /* Set the item_id as this table's primary key */
                                                /* Remember, the last line should not have a comma , at the end */

    /* Other types of columns you could add:
    availability BOOLEAN DEFAULT true           Creates a boolean column called "availability" which will automatically fill with true as the default when a new row is made and the value isn't otherwise defined
    */

);