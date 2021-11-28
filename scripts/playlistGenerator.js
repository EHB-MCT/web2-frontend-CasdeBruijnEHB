let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let progressBarCircles = document.getElementsByClassName("progressItems");

function init() {
    //Deze variabelen wordt gebruikt voor de eerstvolgende progressbar circle te kiezen & opvullen.
    progressBarClicks = 1;
    containerImages.innerHTML = `
    <img class="generatorImages" src="./Images/Generator_p1/One.png" alt="Image one">
    <img class="generatorImages" src="./Images/Generator_p1/Two.png" alt="Image Two">
    `;

    generatorImages();
}
init();

function generatorImages() {
    //Eerst de foto's ophalen en gebruiken als knop. Hier wordt functie aan vastgebonden bij klik event.
    let imageButtons = document.getElementsByClassName("generatorImages");
    for (let i = 0; i < imageButtons.length; i++) {
        imageButtons[i].addEventListener("click", function (e) {
            //Progressbar circeltjes aanpassen op klik event.
            if (progressBarClicks < 3) {
                progressBarCircles[progressBarClicks].classList.add("active");
                progressBarClicks++;
            }



        })
    }
}