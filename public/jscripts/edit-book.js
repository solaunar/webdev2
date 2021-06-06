const workid_input = document.getElementById("workid");
const titleweb_input = document.getElementById("titleweb");
const authorweb_input = document.getElementById("authorweb");
const series_input = document.getElementById("series");
const comments_input = document.getElementById("comments");

function updateBook(){
    var update_message = document.getElementById("update-message");
    var workid = workid_input.value;
    var titleweb = titleweb_input.value;
    var authorweb = authorweb_input.value;
    var series = series_input.value;
    var comments = comments_input.value;

    fetch('/editbook'+workid, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:{   workid: workid,
                    titleweb: titleweb,
                    authorweb: authorweb,
                    series: series,
                    comments: comments}
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.serverRes === "editFail"){
            update_message.innerHTML = "Something went wrong while updating.";
        }
        else if(data.serverRes === "editSuccess"){
            update_message.innerHTML = "Book updated successfully!";
        }
        update_message.style.display = "inherit";
    })
    .catch(err => console.log(err));
}