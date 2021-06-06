const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fbooksSchema = new Schema({
    workid: {
        type: String,
        required: true,
        unique: true
    },
    titleweb: {
        type: String,
        required: true
    },
    authorweb: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: false
    },
    comments:{
        type: String
    }
});

const FBook = mongoose.model('Favorite-book', fbooksSchema);

module.exports = FBook;