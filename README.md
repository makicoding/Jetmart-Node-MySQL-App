# Jetmart-Node-MySQL-App

[Click here to view short demo video of app](https://drive.google.com/file/d/1sDDfytu3DzhJ28mqIO1QySa6r55XvKUL/view?usp=sharing)
<br></br>
[Click here to view full length demo video of app](https://drive.google.com/file/d/1oZIz1vHuH8QGqyc8nidygUZippOpFPKZ/view?usp=sharing)
***

### Overview

This is an inventory system for the store Jetmart. It is a Command Line Node app that communicates with a MySQL database. 
<br></br>
The jetmartCustomer.js app takes in a customer's order and updates the database. The jetmartManager.js app shows the inventory and allows items to be added to the database.
***

### Terminal Commands

node jetmartCustomer
<br>
node jetmartManager
***

### Initial MySQL Database for Jetmart

The initial MySQL database for Jetmart is set up by running these files:
<br></br>
jetmartSchema.sql
<br>
jetmartSeeds.sql
<br></br>
This is the intial MySQL database for Jetmart:
<br></br>
![Jetmart_screenshot_01](https://raw.githubusercontent.com/makicoding/Jetmart-Node-MySQL-App/master/screenshots/Jetmart_screenshot_01.png)
***

### node jetmartCustomer

By entering the following into the command line:
<br></br>
*node jetmartCustomer*
<br></br>
the app takes in a customer's order and updates the MySQL database. The app uses the inquirer npm package to prompt the customer with questions.
<br></br>
![Jetmart_screenshot_02](https://raw.githubusercontent.com/makicoding/Jetmart-Node-MySQL-App/master/screenshots/Jetmart_screenshot_02.png)
***

### node jetmartManager

By entering the following into the command line:
<br></br>
*node jetmartManager*
<br></br>
the app shows the inventory of Jetmart and allows items to be added to the database. The app uses the inquirer npm package to prompt the manager with the following options:

* View products for sale

* View low inventory

* Add to inventory

* Add new product 

![Jetmart_screenshot_03](https://raw.githubusercontent.com/makicoding/Jetmart-Node-MySQL-App/master/screenshots/Jetmart_screenshot_03.png)
***

### Updated MySQL Database for Jetmart

Here is the updated MySQL database for Jetmart:

![Jetmart_screenshot_04](https://raw.githubusercontent.com/makicoding/Jetmart-Node-MySQL-App/master/screenshots/Jetmart_screenshot_04.png)