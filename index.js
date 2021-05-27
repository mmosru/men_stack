'use strict';

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true, useUnifiedTopology: true});

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body == null) {
        console.log("mmo redirecting!\n\n");
        console.log(req);
        return res.redirect('/posts/new');
    }
    next();
}

app.use('/posts/store', validateMiddleWare);
// Models:
const BlogPost = require('./models/BlogPost.js');


app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {blogpost});
});

const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

app.get('/', homeController);
app.get('/posts/new', newPostController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);


app.listen(4000, () => {
    console.log('App listening on port 4000');
});
