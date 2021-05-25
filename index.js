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

// Models:
const BlogPost = require('./models/BlogPost.js');

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
    console.log(blogposts);
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {
    // console.log(req.body); // delete this soon
    await BlogPost.create(req.body);
    res.redirect('/');
});


app.listen(4000, () => {
    console.log('App listening on port 4000');
});
