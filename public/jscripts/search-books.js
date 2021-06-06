const randomhouseSearchWorkURI = "https://reststop.randomhouse.com/resources/works?search=";
const randomhouseWorkURI = "https://reststop.randomhouse.com/resources/works/"; 
const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const resultsDOM = document.getElementById("results");

//console.log(resultsDOM);

//get book data from api based on user input
function fetchRelevantBookData(){
    var user_term_search = search_input.value;
    console.log(user_term_search);
    fetch(randomhouseSearchWorkURI+user_term_search, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then(res => res.ok ? res.json() : console.log("Request Failed"))
    .then(data => {console.log(data);  showBookData(data);})
    .catch(err => console.log(err));
}

//show the data to the user
function showBookData(data){
    if (data.work === undefined){
        resultsDOM.innerHTML = `<h2>We're sorry! :( We could not find any books for that search.</h2>`
    }
    else if (!data["work"].length){
        var book = data["work"];
        resultsDOM.innerHTML = `<h2>Here are your results kind user!</h2>`
        var bookHTML = `
            <ul class = "book-results" id="${book.workid}-book">
                <li>
                    ID: ${book.workid}
                </li>
                <li>
                    Title: ${book.titleweb}
                </li>
                <li>
                    Author:  ${book.authorweb}
                </li>
                <li>
                    Series: ${book.series}
                </li>
                <li>
                <button type="button" class = "favorite-save-btn" onclick="saveBook(${book.workid})" >Add to favorites</button>
                <button type="button" class = "favorite-delete-btn" onclick="deleteBook(${book.workid})" >Remove from favorites</button>
                </li>
                <li id= "${book.workid}-favorite-message" class ="favorite-message">
                </li>
            </ul>`;
        resultsDOM.innerHTML += bookHTML;
    }
    else{
        resultsDOM.innerHTML = `<h2>Here are your results kind user!</h2>`
        for (let book of data.work) {
            var bookHTML = `
                <ul class = "book-results" id="${book.workid}-book">
                    <li>
                        ID: ${book.workid}
                    </li>
                    <li>
                        Title: ${book.titleweb}
                    </li>
                    <li>
                        Author:  ${book.authorweb}
                    </li>
                    <li>
                        Series: ${book.series}
                    </li>
                    <li>
                    <button type="button" class = "favorite-save-btn" onclick="saveBook(${book.workid})" >Add to favorites</button>
                    <button type="button" class = "favorite-delete-btn" onclick="deleteBook(${book.workid})" >Remove from favorites</button>
                    </li>
                    <li id= "${book.workid}-favorite-message" class ="favorite-message">
                    </li>
                </ul>`;
            resultsDOM.innerHTML += bookHTML;
        }
        document.getElementById("footer").style.position="relative";
    }
}

function saveBook(bookid){
    fetch(randomhouseWorkURI+bookid, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then(res => res.ok ? res.json() : console.log("Request Failed"))
    .then(data => {
        requestFavorite(data, 'save');
    })
    .catch(err => console.log(err));
}

function deleteBook(bookid){
    fetch(randomhouseWorkURI+bookid, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then(res => res.ok ? res.json() : console.log("Request Failed"))
    .then(data => {
        requestFavorite(data, 'delete');
    })
    .catch(err => console.log(err));
}

function requestFavorite(book, request){
    //console.log("In the post func");
    //console.log(book);
    //console.log(book.workid);
    const favorite_message = document.getElementById(book.workid+"-favorite-message");
    if (request === 'save'){
        fetch('/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: book
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.serverRes === "saveFail"){
                favorite_message.innerHTML = "You probably have saved this book to your favorites already.";
            }
            else if(data.serverRes === "saveSuccess"){
                favorite_message.innerHTML = "Book saved to favorites!";
            }
        })
        .catch(err => console.log(err));
    }
    if (request === 'delete'){
        fetch('/home', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: book
            })
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            if(data.serverRes === "deleteFail"){
                favorite_message.innerHTML = "You probably haven't saved this book to your favorites yet.";
            }
            else if(data.serverRes === "deleteSuccess"){
                favorite_message.innerHTML = "Book removed from favorites!";
            }
        })
        .catch(err => console.log(err));
    }
}