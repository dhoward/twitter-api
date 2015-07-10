#Twitter API Example

This is a simple one-page application that demonstrates use of the Twitter API. Type any twitter user’s name into the search bar, and the application will load a list of their most recent tweets. If you want to go farther back, there is a “Load More” button at the bottom of the feed to get you the next set of tweets. You can also click on any @mention on a tweet to go directly to that user’s feed.




##Overview

###Front end

The majority of the front end consists of 3 React components: User, Tweet, and App.  User and Tweet should be self explanatory; App is responsible for handling input into the search bar, and rendering the User and a list of Tweets when there is data for them.

There is also one Backbone model: Feed. When the user makes a new search, the App component creates a new Feed, calls its fetch() method to get data from the back end, and displays that data when it returns. When the “Load More” button is pressed, the App calls the getMore() function of the existing Feed, and then displays that data.


###Back end

The back end is a very thin Express server that acts as a proxy between the front end and the Twitter API.



##Local Environment Setup

This assumes that you already have node installed. To run the project, simply install dependencies from the project directory and run the app.js file.

$ npm install

$ node app.js




##Build Tools

React components in this project are written in jsx, and then compiled into javascript. They are then bundled (via browserify) with all other dependencies into the bundle.js file that is served to the browser. Each of these steps is very simple:

#####Automatically compile .jsx files into .js

$ nom install -g react-tools // only do this once

$ jsx --watch public/javascripts/components/ public/javascripts/components_build/ -x jsx

#####Bundle all .js files together
$ npm install -g browserify  // only do this once

$ browserify public/javascripts/main.js -o public/javascripts/bundlej.s




##Heroku Deployment

To deploy to Heroku, simply create your Heroku app, create your git remote and deploy. (This assumes you already have the Heroku-cli installed)

$ heroku create my-app-name

$ heroku git:remote -a my-app-name

$ git push heroku master




##Tests

The included test suite is by no means comprehensive. It is there to demonstrate one way React components can be tested, without the overhead of building a fully-functional testing environment.

Tests are located in the test/ folder. To run them, you must have mocha installed (npm install -g mocha). The simply run “mocha” from the project directory.
