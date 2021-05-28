const randomhouseSearchWorkURI = "https://reststop.randomhouse.com/resources/works?search=";
const randomhouseWorkURI = "https://reststop.randomhouse.com/resources/works/"; 

const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const resultsDOM = document.getElementById("results");
console.log(resultsDOM);
//if(search_button){
//    console.log(search_button);
//}
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
    for (let book of data.work) {
        var bookHTML = `<li id="${data.workid}-book">
            <ul class = "book-results">
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