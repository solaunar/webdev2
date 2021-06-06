//get needed modules and path
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const codes = JSON.parse(fs.readFileSync("public/jscripts/codes.json", 'utf8'));

//create server
const app = express();
//set view to handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//get the default localhost:port/ and redirect to homepage
app.get('/', (req, res) => {
    res.redirect('/home');
});

//render the homepage
app.get('/home', (req, res) =>{
    res.render('home', {
        title: 'Book Search',
        script: 'search-books'
    });
});

//render the favoritespage
app.get('/favoritebooks', (req, res) =>{
    res.render('favoritebooks', {
        title: 'Favorite Books',
        script: 'get-favorites'
    });
});

//define a connection port
const PORT = process.env.PORT || 9000

//get databaseURI and schema
const databaseURI = 'mongodb+srv://admin:webdev2project@webdev2db.bi4fs.mongodb.net/book-haven?retryWrites=true&w=majority';
const FBook = require('./models/favorite-books');

//connect to the database and AFTER successful connection open the server
mongoose.connect(databaseURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((results)=> {
        console.log('Connected to database book-haven.'),
        app.listen(PORT, () =>{
            console.log(`Listening on ${PORT}...`);
        })
    })
    .catch((err) => console.log(err));

//handle post requests for save from client (save book)
app.post('/home', async (req, res) => {
    var bookData = req.body.data;
    const book = new FBook({
        workid: bookData.workid,
        titleweb: bookData.titleweb,
        authorweb: bookData.authorweb,
        series: bookData.series,
        comments: ''
    });
    await book.save(err => {
        err ? res.send({serverRes:codes.serverSaveFail}) : res.send({serverRes:codes.serverSaveSuccess})
    });
});

app.delete('/home', async (req, res) => {
    var bookData = req.body.data;
    await FBook.deleteOne({workid: bookData.workid}, err => {
        err ? res.send({serverRes:codes.serverDeleteFail}) : res.send({serverRes:codes.serverDeleteSuccess})
    });
});