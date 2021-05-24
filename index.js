const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home', {
    title: 'Im the home page',
}));

const PORT = process.env.PORT || 9000

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}...`);
});