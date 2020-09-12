# Didit

[![Dependencies](https://david-dm.org/newnebula/didit.svg)](https://david-dm.org/newnebula/didit)
[![Heroku](https://heroku-badge.herokuapp.com/?app=stormy-dusk-77243)](https://stormy-dusk-77243.herokuapp.com/)
[![Maintenance](https://img.shields.io/maintenance/yes/2020)](https://img.shields.io/maintenance/yes/2020)

### Technology

Didit is a MERN stack application:

- MongoDB with Mongoose
- Express
- React
- Node

### What Didit is about

Didit helps making new habits.
Click on "New" and describe your new habit in a few words. From now on you can call it a "didit".
Daily visit "Today" and mark every successful didit. Seeing your 60-day progress may boost your motivation and that's what Didit is about.
Go to "Recently" and have a glimpse of your weekly and monthly achievements.
If it works for you - enjoy the process of becoming that little bit better!

### Visit Didit

https://stormy-dusk-77243.herokuapp.com/

### Run your own instance of Didit

Sign up to MongoDB and create a database for your instance of Didit.

In the `config` directory, create `keys_dev.js` and fill it in with your database credentials. It is also the place to add your secret for the JWT token.

Content of the `keys_dev.js`:

```
module.exports ={
   DBString: " YOUR_DB_CONNECTION_STRING",
   tokenSecret: "YOUR_SECRET_STRING1",
   refrTokenSecret: "YOUR_SECRET_STRING2"
};
```

Install the project and run the server with:

```
npm install
npm start
```

Open a new terminal to install and run the client with the same commands from the client directory:

```
cd client
npm install
npm start
```
