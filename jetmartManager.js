var mysql = require("mysql");       // This will require a user to install the npm package mysql (npm install mysql).
var inquirer = require("inquirer"); // This will require a user to install the npm package inquirer (npm install inquirer)



// Create connection information for the SQL Database:
var connection = mysql.createConnection({
    host: "localhost",                                                                  // Comma , is needed at end here.
    port: 8889,              // Maki's port # is 8889. Change this if it is not 8889.   // Comma , is needed at end here.
    user: "root",            // Username is "root".                                     // Comma , is needed at end here.
    password: "root",        // Password is "root".                                     // Comma , is needed at end here.
    database: "jetmartDB"    // Connect to the database jetmartDB.                      // This is the end of var connection so no comma , needed here.
});

// Connect to the MySQL server and SQL Database:
connection.connect(function(err) {      // Connection to the MySQL server and SQL database
    if (err) throw err;     // If there is an error, throw an error.
    console.log("Connected as threadId: " + connection.threadId);       // console log connection threadId 
    start();                // Run the start function after the connection is made
});



// FUNCTION start
function start() {
    inquirer
        .prompt({
            name: "menuOptions",                                                                                        // Comma , is needed at end here.
            type: "rawlist",          // "rawlist" is a built in type of inquirer                                       // Comma , is needed at end here.
            message: "Please choose from the following options:",                                                       // Comma , is needed at end here.
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]    // This is the end of this prompt so no comma , needed here.
        })

        .then(function(answer) {
            // Based on the user's answer, call one of the functions or close the connection:
            if (answer.menuOptions === "View products for sale") {
                viewProductsForSale();
            }
            else if (answer.menuOptions === "View low inventory") {
                viewLowInventory();
            }
            else if (answer.menuOptions === "Add to inventory") {
                addToInventory();
            }
            else if (answer.menuOptions === "Add new product") {
                addNewProduct();
            }
            else {
                connection.end();
            }
        })
}



// FUNCTION viewProductsForSale
function viewProductsForSale() {
    connection.query("SELECT * FROM products", function(err, results) {     // Send a query through the connection made to the MySQL server and SQL database.
                                                                            // * means ALL. In this case it means SELECT all FROM the products table
        if (err) throw err;     // If there is an error, throw an error.
        
        console.log("These are the products for sale:");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].product_name);           // console log all the product for sale       // `string ${} string` format of writing code is a "template literal"
        }

        start();
    })
}



// FUNCTION viewLowInventory
function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, results) {     // Send a query through the connection made to the MySQL server and SQL database.
                                                                            // * means ALL. In this case it means SELECT all FROM the products table
        if (err) throw err;     // If there is an error, throw an error.
        
        console.log("These are the products with low inventory:");
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {            // if any of the products have a stock quantity less than 5 (i.e. low inventory)...
                
                console.log(results[i].product_name);       // console log all the products with low inventory
            }
        }

        start();
    })
}



// FUNCTION addToInventory
function addToInventory() {
    connection.query("SELECT * FROM products", function(err, results) {     // Send a query through the connection made to the MySQL server and SQL database.
                                                                            // * means ALL. In this case it means SELECT all FROM the products table
        if (err) throw err;     // If there is an error, throw an error.
              
        inquirer
            .prompt([
                {
                    name: "choice",                                                         // Comma , is needed at end here.
                    type: "rawlist",        // "rawlist" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "What would you like to add inventory to?",                    // Comma , is needed at end here. 
                    choices: function() {
                        var choiceArray = []                            // An empty choiceArray
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);  // push to choiceArray all the product_name within the results object.
                        }
                        return choiceArray;     // return means "to display" (in this case display to the command line).
                                                // So here it means to display the choiceArray to the command line. 
                    }                                                                       // This is the end of this prompt so no comma , needed here.
                },                                                                          // Comma , is needed here after the } because we are going on to the next prompt (i.e. the next question).
                
                {
                    name: "addQuantity",                                               // Comma , is needed at end here.
                    type: "input",         // "input" is a built in type of inquirer   // Comma , is needed at end here.
                    message: "How many would you like to add?"                         // This is the end of this prompt so no comma , needed here.
                }
            ])

            .then(function(answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {                  // For the entire length of the results:
                    if (results[i].product_name === answer.choice) {        // if the product_name from the results is equal to the answer of prompt "choice", then...
                        chosenItem = results[i];                            // that particular index-result (result[i]) is the chosenItem.
                    }
                }

                if (answer.addQuantity > 0) {    // If the answer of prompt "addQuantity"  is greater than zero then...
                    
                    console.log(`The total quanity to be added to the inventory for ${answer.choice} is ${answer.addQuantity}`)         // `string ${} string` format of writing code is a "template literal"
                   
                    inquirer
                        .prompt({
                            name: "confirmAdd",                                                 // Comma , is needed at end here.
                            type: "confirm",                                                    // Comma , is needed at end here.   // The answer choices available are either yes or no boolean values so either true or false. No choices line of code.
                            message: "Are you sure you would like to add to the inventory?"     // This is the end of this prompt so no comma , needed here.
                        })

                        .then(function(answer) {
                            if (answer.confirmAdd === true) {           // type is a "confirm" for confirmAdd, so the answer will be a boolean (either true or false)
                                updateStockQuantity();                  // Go to the function updateStockQuantity()
                            }

                            else {
                                start();                                // Go back to the function start()
                            }
                        })

                    // ------------------------------
                    // FUNCTION updateStockQuantity
                    function updateStockQuantity() {   
                        connection.query(                                       // Send a query through the connection made to the MySQL server and SQL database.
                            "UPDATE products SET ? WHERE ?",                                                        // UPDATE the products table, 
                            [
                                {
                                    stock_quantity: (chosenItem.stock_quantity + parseInt(answer.addQuantity))      // SET to the column stock_quantity. Add the answer of the addQuantity prompt to the stock_quantity of the chosen item. 
                                                                                                                    // Convert the user's answer for the prompt addQuantity from a string to an integer using parseInt() 
                                },
                                {
                                    item_id: chosenItem.item_id                                                     // the item_id is WHERE this update will be assigned. The assigned position is the the item_id of the chosen_Item. 
                                }
                            ],
                            function(err) {
                                if (err) throw err;                                 // If there is an error, throw an error.
                                console.log("Added to inventory successfully!");     
                                start();                                            // Go back to the function start()
                            }
                        );
                    }
                    // ------------------------------
                }

                else {
                    console.log("Add quantity must be greater than zero. Please try again.");
                    start();        // Go back to the function start()
                }
            })
    })
}



// FUNCTION addNewProduct
function addNewProduct() {
    connection.query("SELECT * FROM products", function(err, results) {     // Send a query through the connection made to the MySQL server and SQL database.
                                                                            // * means ALL. In this case it means SELECT all FROM the products table
        if (err) throw err;     // If there is an error, throw an error.
              
        inquirer
            .prompt([
                {
                    name: "newProductItemId",                                           // Comma , is needed at end here.
                    type: "input",        // "input" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "Enter item ID",                                           // This is the end of this prompt so no comma , needed here.
                },                                                                      // Comma , is needed here after the } because we are going on to the next prompt (i.e. the next question).
                
                {
                    name: "newProductName",                                             // Comma , is needed at end here.
                    type: "input",        // "input" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "Enter product name",                                      // This is the end of this prompt so no comma , needed here.
                },                                                                      // Comma , is needed here after the } because we are going on to the next prompt (i.e. the next question).

                {
                    name: "newProductDepartmentName",                                   // Comma , is needed at end here.
                    type: "input",        // "input" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "Enter department name",                                   // This is the end of this prompt so no comma , needed here.
                },                                                                      // Comma , is needed here after the } because we are going on to the next prompt (i.e. the next question).

                {
                    name: "newProductPrice",                                            // Comma , is needed at end here.
                    type: "input",        // "input" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "Enter price",                                             // This is the end of this prompt so no comma , needed here.
                },                                                                      // Comma , is needed here after the } because we are going on to the next prompt (i.e. the next question).

                {
                    name: "newProductStockQuantity",                                    // Comma , is needed at end here.
                    type: "input",        // "input" is a built in type of inquirer     // Comma , is needed at end here.
                    message: "Enter stock quantity"                                     // This is the end of this prompt so no comma , needed here.
                }
            ])

            .then(function(answer) {
                
                    
                    console.log("You are about to add the following new product to the database:");         
                    console.log(`Item Id: ${answer.newProductItemId}`);                             // `string ${} string` format of writing code is a "template literal"
                    console.log(`Product Name: ${answer.newProductName}`);                          // `string ${} string` format of writing code is a "template literal"
                    console.log(`Department Name: ${answer.newProductDepartmentName}`);             // `string ${} string` format of writing code is a "template literal"
                    console.log(`Price: ${answer.newProductPrice}`);                                // `string ${} string` format of writing code is a "template literal"
                    console.log(`Stock Quantity: ${answer.newProductStockQuantity}`);               // `string ${} string` format of writing code is a "template literal"

                    inquirer
                        .prompt({
                            name: "confirmAddNewProduct",                                                       // Comma , is needed at end here.
                            type: "confirm",                                                                    // Comma , is needed at end here.   // The answer choices available are either yes or no boolean values so either true or false. No choices line of code.
                            message: "Are you sure you would like to add the new product to the database?"      // This is the end of this prompt so no comma , needed here.
                        })

                        .then(function(answer) {
                            if (answer.confirmAddNewProduct === true) {     // type is a "confirm" for confirmAddNewProduct, so the answer will be a boolean (either true or false)
                                updateDatabaseWithNewProduct();             // Go to the function updateDatabaseWithNewProduct()
                            }

                            else {
                                start();                                    // Go back to the function start()
                            }
                        })

                    // ------------------------------
                    // FUNCTION updateDatabaseWithNewProduct
                    function updateDatabaseWithNewProduct() {   
                        connection.query(                                       // Send a query through the connection made to the MySQL server and SQL database.
                            "INSERT INTO products SET ?",                                       // INSERT INTO the products table. For INSERT INTO, we do not use WHERE ? 
                            [
                                {
                                    item_id: answer.newProductItemId,                           // SET to the column item_id. Add the answer of the newProductItemId prompt to item_id.                                 // Comma , is needed at end here.                                 
                                    product_name: answer.newProductName,                        // SET to the column product_name. Add the answer of the newProductName prompt to product_name.                         // Comma , is needed at end here.                                 
                                    department_name: answer.newProductDepartmentName,           // SET to the column department_name. Add the answer of the newProductDepartmentName prompt to department_name.         // Comma , is needed at end here.
                                    price: answer.newProductPrice,                              // SET to the column price. Add the answer of the newProductPrice prompt to price.                                      // Comma , is needed at end here.
                                    stock_quantity: answer.newProductStockQuantity              // SET to the column stock_quantity. Add the answer of the newProductStockQuantity prompt to stock_quantity.            // This is the end of SET so no comma , needed here.      
                                }   
                            ],
                            function(err) {
                                if (err) throw err;                                 // If there is an error, throw an error.
                                console.log("New item added to database successfully!");     
                                start();                                            // Go back to the function start()
                            }
                        );
                    }
                    // ------------------------------
                
            })
    })
}



// ----------------------------------------
// INSTRUCTIONS AND ADDITIONAL NOTES

/*
.gitignore file

For when uploading folder to a gitHub repository.

Create .gitignore file at start of project and include inside it the following lines of code:
node_modules
.DS_Store

It's good practice to always include node_modules in the .gitignore file because this folder can get huge.
We have coded to "require" npm install of any packages necessary for this node app, so if someone clones this repo from
gitHub, all they have to do is npm install any necessary packages for the app to work. Therefore the node_modules folder 
doesn't need to be uploaded to gitHub.



--------------------
RUN SQL FILE TO CREATE DATABASE

From the Mac Finder, open the jetmartSchema.sql file in Sequel Pro.

From the middle right of the page where there is a drop down menu that says "Run Previous",
select "Run All Queries" from the drop down list. This will create the database (and table
if the .sql file has the populate-database instructions inside it after the database-creation
instructions. See notes below if the database-creation instructions are in a separate .sql
file from the populate-database instructions .sql).



--------------------
IMPORT DATABASE CONTENT (IMPORT .sql FILE OR .csv FILE)    

In the Sequel Pro App, select File / Import 
Then select the .sql file that contains the instructions (i.e. the code) to populate database content
This is the file that has the instructions:

    // INSERT INTO
and // VALUES

In this case we would import jetmartSeeds.sql.

Since this is a .sql file with 
populate-database instructions (unlike a csv without instructions), instead of doing File/Import
in Sequel Pro, we can go to the Mac Finder, locate the jetmartSeeds.sql file and from there open 
in Sequel Pro. From the middle right of the page where there is a drop down menu that says 
"Run Previous", select "Run All Queries" from the drop down list. This will create the table.



Sometimes, the populate-database instructions may or may not be a separate .sql file from the .sql file that 
had the instructions to create the database and table itself.  So we could put the content of jetmartSeeds.sql 
(populate-database instructions) at the bottom of the jetmartSchema.sql file (create-database instructions)
if we wanted to.  But in our case we separated the create-database instructions (jetmartSchema.sql)
from the populate-database instructions (jetmartSeeds.sql). This is just purely to keep things organized.

If the create-database instructions are in another .sql file (like in our case here), then you must have 
selected and be inside the database you just created in Sequel Pro before importing the .sql that has the 
populate-database instructions.



You could also select File / Import and then import a .csv file and this would import all the data that is
in that file. 

.csv file can be created and saved from an Excel spreadsheet.



For CSV import:
Make sure that when the import prompt appears to map out the CSV fields properly. To do this, click on 
each CSV field and this would show a drop down menu.  From there choose the corresponding to match
the Table Target Fields that is in the column on the right (next to the CSV Fields column).



Once these steps are done, the data is now imported to the database in Sequel Pro.



--------------------
REFRESH DATABASE CONTENT

To refresh the database content in Sequel Pro, press the "refresh table contents" button at the bottom
of the "Content section" of the databse.  You could also press on your keyboard:
// command r



--------------------
EXPORT DATABASE CONTENT

You can also select File / Export and your database as a SQL file.
It is good practice to export and save your database as a SQL file periodically with the date 
in the file name because each time you import a .csv file or .sql file to your database, 
it will overwrite any previous database entries that you previously had for a particular database.

So for example, let's say you have created a database called jetmartDB and within that you have
created a table called products. 
If you imported a SQL file or CSV file to the products table within jetmartDB,
and then later on you once again imported a SQL file or CSV file to the products table within jetmartDB,
the second import will overwrite all the data from the first import.



--------------------
npm init -y          (must do this at start of any node project if you are going to be using npm install to install packages!)

At the start of any node project, this must be done:
Navigate to the root of project and type the following into the command line: npm init -y 
This will initialize a package.json file for the project. 
The package.json file is required for installing third party npm packages and saving their version numbers. 
If you fail to initialize a package.json file, it will be troublesome, and at times almost impossible for 
anyone else to run your code after cloning your project.

// -y here is used to install all default settings for the package.json file.  If you prefer to look at each setting you are installing,
you can just type:
// npm init
and the command line will ask you about the settings for each.



--------------------
inquirer

name:       this is a string "" and is the name assigned to this particular prompt for referencing in the code later if needed (you can call the name string anything you want).
type:       this is used to set the type of input that the prompt receives from the user
                type includes:
                    "list"      // 
                    "rawlist"   // this is a numbered list i.e. 1) item1 2) item2 etc.
                    "checkbox"
                    "input"     // this accepts a typed string input from the user.
                    "confirm"
                    "password"
                other type are:
                    "expand"
                    "editor"
message:    this is the question to print to the command line.
choices:    this is a choices array or a function returning a choices array.

npm inquirer documentation: https://www.npmjs.com/package/inquirer



--------------------
TEMPLATE LITERALS

`string ${} string` format of writing code is a template literal.

Example:
    var totalQuantity = 3 * 2;
    console.log(`The total quantity is: ${totalQuantity}`);
        
    // "The total quantity is: 6" would be printed to the console.



--------------------
toFixed()

Use toFixed(insertDecimalPlacesNumberHere) to show only a set number of decimal places.

Example:
    var myNumber = 5.56789;
    var myNumberTwoDecimalPlaces = myNumber.toFixed(2);     // Here the (2) indicated 2 decimal places.
    console.log(myNumberTwoDecimalPlaces);

    // "5.57" would be printed to the console.



--------------------
COMMAND LINE commands

Before running this JS file in node, install packages from npmjs.com type the following 
into the command line (the name npm stands for Node Package Manager):
// npm install mysql
// npm install inquirer



If a package.json file already exists with dependencies listed inside (if for example you have
cloned this repo from gitHub), then you can just type either of the following without installing 
each individual package manually:
// npm i            // this is just a shorthand version of npm install
// npm install



To check that everything installed properly, type the following into the command line:
// cat package.json

Then check under "dependencies" that is displayed in the command line. If everything installed
properly it will say:
"inquirer": "^6.2.2",     // 6.2.2 is the version number
"mysql": "^2.16.0"        // 2.16.0 is the version number



If cloning a CLI App (Command Line Interface App) like LIRI from a GitHub repository and a package.json file already exists
inside it, you can just type the following into the command line:
npm install  // or:
npm i                    // npm i is just a shortcut version of npm install.
This will install everything listed in the dependencies area of the package.json file.
You don't need to manually install every npm package like:
npm install mysql   // or:
npm install inquirer        // etc.



To run node for jetmartManager.js, type into the command line:
// node jetmartManager             // No need to type in .js, although node jetmartManager.js will work too.



If you need to exit at any point, type into the command line:
// control c



*/