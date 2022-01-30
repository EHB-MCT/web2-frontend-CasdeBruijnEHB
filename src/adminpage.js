let container = document.getElementById("containerAdmin");
//let buttonAddCuratedPlaylist = document.getElementById("buttonAddCuratedPlaylist");
//let buttonAddGeneratedPlaylist = document.getElementById("buttonAddGeneratedPlaylist");
//let buttonRemovePlaylist = document.getElementById("buttonDeletePlaylist");


/*
buttonAddCuratedPlaylist.addEventListener("click", function () {
    container.innerHTML = "";
    let html = `<form>
<label for="playlistID">PlaylistID:</label>
<input type="text" id="playlistID" name="playlistID"><br>
<label for="title">Title:</label>
<input type="text" id="title" name="title"><br>
<label for="description">description:</label>
<input type="text" id="description" name="description"><br>
<label for="imageurl">Image url:</label>
<input type="text" id="imageurl" name="imageurl">
<br><br>
<button id="formbuttonAddPlaylist" class="button-3" role="button">Add playlist</button>
</form>`

    container.innerHTML = html;
    let addPlaylistButton = document.getElementById("formbuttonAddPlaylist");
    addPlaylistButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (addPlaylistButton.innerHTML != "Added!") {
            let playlistID = document.getElementById("playlistID");
            let title = document.getElementById("title");
            let description = document.getElementById("description");
            let imageurl = document.getElementById("imageurl");
            addCuratedPlaylist(playlistID, title, description, imageurl);

            addPlaylistButton.innerHTML = "Added!"
        }

    })
})

buttonAddGeneratedPlaylist.addEventListener("click", function () {
    container.innerHTML = "";
    let html = `<form>
<label for="playlistID">PlaylistID:</label>
<input type="text" id="playlistID" name="playlistID"><br>
<label for="title">Title:</label>
<input type="text" id="title" name="title"><br>
<label for="description">description:</label>
<input type="text" id="description" name="description"><br>
<label for="imageurl">Image url:</label>
<input type="text" id="imageurl" name="imageurl"><br>
<label for="mainCategory">mainCategory:</label>
<input type="text" id="mainCategory" name="mainCategory"><br>
<label for="score">Score:</label>
<input type="text" id="score" name="score">
<br><br>
<button id="formbuttonAddPlaylist" class="button-3" role="button">Add playlist</button>
</form>`
    container.innerHTML = html;
    let addPlaylistButton = document.getElementById("formbuttonAddPlaylist");
    addPlaylistButton.addEventListener("click", function (e) {

        e.preventDefault();


        if (addPlaylistButton.innerHTML != "Added!") {
            let playlistID = document.getElementById("playlistID");
            let title = document.getElementById("title");
            let description = document.getElementById("description");
            let imageurl = document.getElementById("imageurl");
            let mainCategory = document.getElementById("mainCategory");
            let score = document.getElementById("score");
            addGeneratedPlaylist(playlistID, title, description, imageurl, mainCategory, score);

            addPlaylistButton.innerHTML = "Added!"
        }
    })
})
*/
/*
buttonRemovePlaylist.addEventListener("click", function () {
    container.innerHTML = "";
    let html = `<form>
    <label for="playlistID">PlaylistID:</label>
    <input type="text" id="playlistID" name="playlistID"><br>
    <br><br>
    <button id="formbuttonDeletePlaylist" class="button-3" role="button">Delete playlist</button>
    
    </form>`;
    container.innerHTML = html;

    let deleteButton = document.getElementById("formbuttonDeletePlaylist");
    deleteButton.addEventListener("click", function () {
        console.log("Delete playlist");
    })
})
*/

async function addCuratedPlaylist(playlistID, title, description, imageurl) {
    fetch(`https://courseprojectwebii.herokuapp.com/postNewCuratedPlaylist`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playlistID: playlistID.value,
            title: title.value,
            description: description.value,
            imageurl: imageurl.value
        })

    }).then(response => {
        return response.json()
    }).then(data => {

    })
}

async function addGeneratedPlaylist(playlistID, title, description, imageurl, mainCategory, score) {
    fetch(`https://courseprojectwebii.herokuapp.com/postNewGeneratedPlaylist`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playlistID: playlistID.value,
            title: title.value,
            description: description.value,
            imageurl: imageurl.value,
            mainCategory: mainCategory.value,
            score: score.value
        })

    }).then(response => {
        return response.json()
    }).then(data => {

    })
}