let containerLibrary = document.getElementById("playlistPictures");


const playlist = {
    playlistLibrary: [{
        title: "Cooking",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedCooking.png"
    }, {
        title: "Dancing",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedDancingV1_VersieKleiner.png"
    }, {
        title: "Driving",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedDriving.png"
    }, {
        title: "Laundry",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedLaundry.png"
    }, {
        title: "Reading",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedReadingV1_VersieKleiner.png"
    }, {
        title: "Romantic Night",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedRomantic.png"
    }, {
        title: "Running",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedRunning.png"
    }, {
        title: "Working Out",
        description: "A cooking playlist curated by Cas d. B.",
        image: "./Images/PlaylistLibrary/CDCuratedWorkingOut.png"
    }],
    fillHTML() {
        let html = "";
        this.playlistLibrary.forEach((element, index) => {
            html += `
            <img class="playlistImage" src="${element.image}"
            alt="Cover ${element.title}">
            `
        })
        containerLibrary.innerHTML = html;
    }

}


function init() {
    //Create playlists naargelang de hoeveelheid 
    playlist.fillHTML();
}
init();