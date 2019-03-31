









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
COMMAND LINE commands

Before running this JS file in node, install packages from npmjs.com type the following 
into the command line (the name npm stands for Node Package Manager):
// npm install mysql
// npm install inquirer



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



To run node for jetmart.js, type into the command line:
// node jetmart



If you need to exit at any point, type into the command line:
// control c



*/