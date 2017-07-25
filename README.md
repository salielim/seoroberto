## API Endpoints (assessment 3)
**`server/config/routes.js`**

* **/login** (GET & POST): check if user exists and login
* **/register** (GET & POST): check if email is already registered, login if it isn't
* **/settings** (GET): retrieve user info
* **/logout** (POST): log user out
* **/loggedin** (GET): check if user is logged in

**`server/api/data.js`**

* **api/scan**: starts scanner when URL is input and button is clicked
* **api/data**: retrieves scanned data from database

## How to get it up and running
* `bower install`
* `npm install`
* `npm start`
* requirements: mongoDB
* modify the url in database.js to connect to mongoDB 
* start server with node `server/app.js`

## SEORoberto
This tool automates the monitoring of each and every webpage on a website. 

With a click of the button, the tool crawls every webpage and saves the title, headings, meta description and other important elements of the webpage in a database. 

This can also be done with as a weekly cron job. With this tool, businesses can view and monitor HTML elements of the webpage that affects their site’s ranking at a glance.

## More Information
**Product/Service:** Search Engine Optimisation (SEO) Website Crawler Tool 

**Type:** Software as a service (SaaS), monthly subscription
