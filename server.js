const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DBConfig = require('./config/secrets.js');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

const diditRoutes = require('./routes/didits');
app.use(diditRoutes);
const authRoutes = require('./routes/auth.js');
app.use(authRoutes);
const soulsearchRoutes = require('./routes/soulsearch');
app.use(soulsearchRoutes);

app.use((error, req, res, next)=>{
    // console.log('In final error middleware, will print the error:')
    // console.log(error);
    const status = error.statusCode ||500;
    const message = error.message || "Something went wrong.";
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

// Server static assets if in production
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8000;
mongoose.connect(DBConfig.DBString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(nothingSpecial => {
    // console.log('Connected!');
    app.listen(port, () => console.log('server running'));
})
.catch(err=>console.log(err))

