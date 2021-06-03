const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fbooksSchema = new Schema({
    workid: {
        type: String,
        required: true
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
    }
});

const FBook = mongoose.model('Favorite-book', fbooksSchema);

module.exports = FBook;