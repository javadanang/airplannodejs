# airplannodejs
This tutorial helps you to understand about NodeJS Express and mongodb. Before we get starting please install the environment below

Part I : Installation Environment

1) Install Nodejs
   Please install node from here https://nodejs.org/en/
2) Install MongoDB
   Please install mongodb from here https://www.mongodb.org/downloads

Step 1 : Install global Express Generator
         npm install express-generator -g
Step 2 : Generate Express
         express airplannodeexpress
Step 3 : Install all depedencies in package.json
         npm install
Step 4 : Setting port for app. Put these lines below to app.js
         app.set('port',process.env.PORT || 3000);
         app.listen(app. get('port' ), function(){
           console. log( 'Express started on http://localhost:' +
               app. get('port' ) + '; press Ctrl-C to terminate.' );
         });
Step 5 : Run the application
         node app.js
Step 6 : type on browser http://localhost:3000 . You will see the page

Part II : Running Application

Step 1 : Configure the log file by using morgan middleware. It will log every request from server to access file
         var fs = require('fs');
         var morgan = require('morgan');
         var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
         app.use(morgan('combined', {stream: accessLogStream}))

Step 2 : Configure Handlebar. By default It's using Jade as template
install handlebar
         npm install --save express3-handlebars
Then we’ll link it into Express
       var handlebars = require('express3-handlebars' ).create({ defaultLayout: 'main' });
       app. engine('handlebars' , handlebars. engine);
       app. set('view engine' , 'handlebars' );
Create an layout template
        under views foler . We create an layouts folder and create a file main.handlebars. By default
        express will looking for all handlebars file under views folder
Create an index
        create in index.handlebars file under views folder.
Using Boostap