const randomhouseSearchWorkURI = "https://reststop.randomhouse.com/resources/works?search=";
const randomhouseWorkURI = "https://reststop.randomhouse.com/resources/works/"; 

const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");

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
    .then(data => console.log(data))
    .catch(error => console.log(error));
}