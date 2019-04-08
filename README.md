# Jetmart-Node-MySQL-App

This is an inventory system for the store Jetmart. It is a Command Line Node app that communicates with a MySQL database. 
<br></br>
The jetmartCustomer.js app takes in a user's order and updates the database. The jetmartManager.js app shows the inventory and allows items to be added to the database.
***

[Click here to view short demo video of app](https://drive.google.com/file/d/1sDDfytu3DzhJ28mqIO1QySa6r55XvKUL/view?usp=sharing)
<br></br>
[Click here to view full length demo video of app](https://drive.google.com/file/d/1oZIz1vHuH8QGqyc8nidygUZippOpFPKZ/view?usp=sharing)
***

### Terminal Commands:

node jetmartCustomer
<br>
node jetmartManager
***

### MySQL Database for Jetmart

The initial MySQL database for Jetmart is set up by running the files:
<br></br>
jetmartSchema.sql
<br>
jetmartSeeds.sql
![Jetmart_Screenshot_01](https://raw.githubusercontent.com/makicoding/Jetmart-Node-MySQL-App/master/screenshots/Jetmart_Screenshot_01.png)
***

### node jetmartCustomer

By entering the following into the command line:
<br></br>
*node jetmartCustomer*
<br></br>
the app takes in a user's order and updates the MySQL database. The app uses the inquirer npm package to prompt the user with questions.
<br></br>
![liri_screenshot_01](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_01.png)
***

### node liri spotify-this-song

By entering the following into the command line:
<br></br>
*node liri spotify-this-song songname*
<br></br>
the app will search the Spotify API for a song and render the following information:

* Artist

* Song name

* Preview link of song from Spotify

* Album where song appears 

If no song is provided by the user, then the app defaults to the song "ghostbusters".

In the first example,  we provide no song.
<br>
The command line is:
<br>
*node liri spotify-this-song*
<br></br>
![liri_screenshot_02](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_02.png)

In the second example,  we set the song name to be "blackbird".
<br>
The command line is:
<br>
*node liri spotify-this-song blackbird*
<br></br>
![liri_screenshot_03](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_03.png)
***

### node liri movie-this

By entering the following into the command line:
<br></br>
*node liri movie-this movietitle*
<br></br>
the app will search the OMDB API for a movie title and render the following information:

* Title of movie

* Year

* IMDB rating

* Rotten Tomatoes rating

* Country where movie was produced

* Language of movie

* Plot

* Actors 

If no movie title is provided by the user, then the app defaults to the movie "mr.nobody".

In the first example,  we provide no movie title.
<br>
The command line is:
<br>
*node liri movie-this*
<br></br>
![liri_screenshot_04](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_04.png)

In the second example,  we set the movie title to be "avengers".
<br>
The command line is:
<br>
*node liri spotify-this-song avengers*
<br></br>
![liri_screenshot_05](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_05.png)
***

### node liri do-what-it-says

By entering the following into the command line:
<br></br>
*node liri do-what-it-says*
<br></br>
and using the fs node package, LIRI will read the text inside of random.txt and then use it to call one of LIRI's commands.

In this example, the text inside random.txt is 
<br>
*spotify-this-song, i want it that way*  
<br>
To call different LIRI commands we can modify the text inside random.txt to be:
<br>
*concert-this, the black keys*
<br>
*movie-this, iron man*


The command line for this example is:
<br>
*node liri do-what-it-says*
<br></br>
![liri_screenshot_06](https://raw.githubusercontent.com/makicoding/LIRI-Node-App/master/screenshots/liri_screenshot_06.png)
