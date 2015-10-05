# airplannodejs
This tutorial helps you to understand about NodeJS Express and mongodb. Before we get starting please install the environment below

Part I : Installation Environment

1) Install Nodejs
   Please install node from here https://nodejs.org/en/
2) Install MongoDB
   Please install mongodb from here https://www.mongodb.org/downloads or  http://mongolab.com
   Step 1 : create a database name airplane
   Step 2 : create a collection flights
   Step 3 : insert the data belows
   {

       "code" : "VN 126",
       "name" : "Viet Nam AirLine",
       "source" : "Ho Chi Minh",
       "destination" : "Da Nang",
       "time" : "11:00 am"
   }
3) Install the project
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
         Step 1 : copy bootstrap under folder stylesheets
         Step 2 : making a static file
                create a lib folder
                create a file static.js inside lib folder
                change the configure of handlebars in app.js as below
                var handlebars = require('express3-handlebars' )
                    .create({ defaultLayout: 'main',helpers: {
                      section: function(name, options){
                        if(!this._sections) this._sections = {};
                        this._sections[name] = options.fn(this);
                        return null;
                      },
                      static: function(name) {
                        return require('./lib/static.js').map(name);
                      }
                    } });
          Step 3 : link css to main layout
                   open the layout file in views/main.handlebars
                   <link rel="stylesheet" href="{{static 'stylesheets/bootstrap/css/bootstrap.min.css'}}">
Connect MongoDB
        Step 1 : install mongoose module
        npm install --save mongoose
        Step 2 : require  mongoose and connect database
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/airplane', function (error) {
          if (error) {
            console.log(error);
          }
        });

Creating Schemas and Models
        Step 1 : create an folder models
        Step 2 : create a file flight.js with content below
        var mongoose = require('mongoose')
            , Schema = mongoose.Schema

        var fightSchema = mongoose.Schema({
            code : String,
            name : String,
            source : String,
            destination : String,
            time : String

        });

        var Fight = mongoose.model('fight',fightSchema,"fight");
        module.exports = Fight;

        Step 3 : Modify the controller

        router.get('/flights', function(req, res, next) {
           Flights.find({},function(error,result){
              if(error) console.log(error);
              res.render('flights', { flights: result });
          });

        Step 4 : change flights.handlebars file
        <table class="table">
            <thead>
            <th>Flight Number</th>
            <th>Flight Name</th>
            <th>Source</th>
            <th>Destination</th>
            </thead>
            <tbody>
            {{#flights}}
                <tr>
                    <td>{{code}}</td>
                    <td>{{name}}</td>
                    <td>{{source}}</td>
                    <td>{{destination}}</td>
                </tr>
            {{/flights}}
            </tbody>
        </table>

RUN THE APPLICATION : http://localhost:3000 to check the result

Testing our application with

Page Testing

Step 1 : install mocha
npm install --save-dev mocha
Step 2 : create an vendor folder inside the public folder and copy 2 files mocha.js and mocha.css
Step 3 : Insert Assert library from chain
npm install --save-dev chai
Step 4 : copy file chai.js to vendor folder
Step 5 : configure test url parameter in app.js
app.use(function(req, res, next){
  res.locals.showTests = app. get('env' ) !== 'production' &&
      req. query. test === '1' ;
  next();
});
Step 6 : create tests-global.js to test the page
suite('Global Tests', function(){
	test('page has a valid title', function(){
		assert(document.title && document.title.match(/\S/) &&
			document.title.toUpperCase() !== 'Air Plane');
	});
});
Step 7 : change to display test in template file
 {{#if showTests}}

            <div id="mocha"></div>
            <script src="{{static '/vendor/mocha.js'}}"></script>
            <script src="{{static '/vendor/chai.js'}}"></script>
            <script>
                mocha.ui('tdd');
                var assert = chai.assert;
            </script>
            <script src="{{static '/vendor/tests-global.js'}}"></script>
            {{#if pageTestScript}}
                <script src="{{pageTestScript}}"></script>
            {{/if}}
            <script>mocha.run();</script>
        {{/if}}

 Step 8 : run globle test
 http://localhost:3000/?test=1


Running specific test case
Step 1 : inside folder vendor create a test-allfights.js to test the list all air plane page
suite('All Flights Page Tests' , function(){
    test('page should contain link to contact page' , function(){
        assert($('a[href="/flights"]' ).length);

    });
});

Step 2 : in the layout file enable pageTestScript
{{#if pageTestScript}}
                <script src="{{pageTestScript}}"></script>
            {{/if}}


Running Unitest
Step 1 create a unit test file name tests-unit inside the qa folder
var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune cookie tests', function(){

    test('getFortune() should return a fortune', function(){
        expect(typeof fortune.getFortune() === 'string');
    });

});

Step 2 : in the console run this command line
mocha -u tdd -R spec qa/tests-unit.js

