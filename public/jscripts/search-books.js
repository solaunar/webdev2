const randomhouseSearchWorkURI = "https://reststop.randomhouse.com/resources/works?search=";
const randomhouseWorkURI = "https://reststop.randomhouse.com/resources/works/"; 

const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const resultsDOM = document.getElementById("results");
//console.log(resultsDOM);

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
    .catch(error => console.log(error));
}

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
                </ul>`;
            resultsDOM.innerHTML += bookHTML;
        }
        document.getElementById("footer").style.position="relative";
    }
}