const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const databaseURI = 'mongodb+srv://admin:webdev2project@webdev2db.bi4fs.mongodb.net/book-haven?retryWrites=true&w=majority';


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('home', {
    title: 'Book Search',
    script: 'search-books'
}));

const PORT = process.env.PORT || 9000

mongoose.connect(databaseURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((results)=> console.log('Connected to database book-haven.'),
    app.listen(PORT, () =>{
        console.log(`Listening on ${PORT}...`);
    }))
    .catch((err) => console.log(err));
