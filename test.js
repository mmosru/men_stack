const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true, useUnifiedTopology: true});

/*
BlogPost.create({
    title: 'Yoga for Feet',
    body: 'If you wear shoes, you need specific exercises and stretches to counter the negative effects of shoe wearing.'
}, (error, blogpost) => {
    console.log(error, blogpost);
});
*/

let id = "60aea6766114480cb7fc4af9";
BlogPost.findByIdAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost);
});
