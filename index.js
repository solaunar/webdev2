const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('home', {
    title: 'Book Search',
}));

const PORT = process.env.PORT || 9000

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}...`);
});