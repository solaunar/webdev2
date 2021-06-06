const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const resultsDOM = document.getElementById("results");

function fetchRelevantFavoriteBookData(){
    var user_term_search = search_input.value;
    if(!user_term_search)
        user_term_search='';
    fetch('/favoritebooks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filter: user_term_search
        })
    })
    .then(res => res.json())
    .then(data => {
        //showBookData(data);
        data.serverRes === "filterFail" ? resultsDOM.innerHTML = `<h2>We're sorry! :( We could not find any favorite books for that filter.</h2>` : showBookData(data);
    })
    .catch(err => console.log(err));
}

function showBookData(data) {
    resultsDOM.innerHTML = `<h2>Here are your results kind user!</h2>`
    for (let book of data) {
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
                        Comments: ${book.comments}
                    </li>
                    <li>
                    <button type="button" class = "favorite-edit-btn" onclick="editBook(${book.workid})" >Edit book data</button>
                    <button type="button" class = "favorite-delete-btn" onclick="deleteBook(${book.workid})" >Remove from favorites</button>
                    </li>
                    <li id= "${book.workid}-favorite-message" class = "favorite-message">
                    </li>
                </ul>`;
        resultsDOM.innerHTML += bookHTML;
    }
    if (data.length > 1)
        document.getElementById("footer").style.position = "relative";
}

function deleteBook(bookid){
    const favorite_message = document.getElementById(bookid+"-favorite-message");
    fetch('/favoritebooks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: bookid
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.serverRes === "deleteFail"){
            favorite_message.innerHTML = "You can't delete the same book twice.";
        }
        else if(data.serverRes === "deleteSuccess"){
            favorite_message.innerHTML = "Book removed from favorites!";
        }
        favorite_message.style.display = "inherit";
    })
    .catch(err => console.log(err));
}

function editBook(bookid){
    window.location.href = '/editbook'+bookid;
}