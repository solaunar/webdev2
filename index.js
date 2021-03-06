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

//render an edit book page
app.get('/editbook:bookid', (req, res) => {
    FBook.findOne({
        workid: req.params.bookid
    }, (err, fBook) => {
        console.log(fBook);
        err ? res.send({ serverRes: codes.serverBookEditPageFail }) :
            res.render('editbook', {
                title: 'Edit book',
                script: 'edit-book',
                workid: fBook.workid,
                titleweb: fBook.titleweb,
                authorweb: fBook.authorweb,
                series: fBook.series,
                comments: fBook.comments
            })
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

//handle post requests for delete from client at home page
app.delete('/home', async (req, res) => {
    var bookData = req.body.data;
    await FBook.deleteOne({workid: bookData.workid}, err => {
        err ? res.send({serverRes:codes.serverDeleteFail}) : res.send({serverRes:codes.serverDeleteSuccess})
    });
});

//handle filter requests at favorites page
app.post('/favoritebooks', async (req, res)=>{
    var filterTerm = req.body.filter;
    //console.log(filterTerm);
    await FBook.find({
        $or: [
            {titleweb: { $regex: new RegExp(filterTerm, "i")}},
            {authorweb: { $regex: new RegExp(filterTerm, "i")}},
        ]
    }, (err, fBookList) =>{
        //console.log(fBookList);
        err || fBookList.length === 0?  res.send({serverRes:codes.serverFilterFail}) : res.send(fBookList);
    });
});

//handle post requests for delete from client at book favorite page
app.delete('/favoritebooks', async (req, res) => {
    var bookid = req.body.data;
    await FBook.deleteOne({workid: bookid}, err => {
        err ? res.send({serverRes:codes.serverDeleteFail}) : res.send({serverRes:codes.serverDeleteSuccess})
    });
});

app.put('/editbook:bookid', async (req, res)=>{
    var bookData = req.body.data;
    console.log(bookData);
    await FBook.updateOne({workid: bookData.workid},{
                $set: {
                    titleweb: bookData.titleweb,
                    authorweb: bookData.authorweb,
                    series: bookData.series,
                    comments: bookData.comments
                }
            }, err =>{
                err ? res.send({serverRes:codes.serverBookEditFail}) : res.send({serverRes:codes.serverBookEditSuccess});
            });
});