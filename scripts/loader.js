window.addEventListener('load', (event) => {

    console.log('page is fully loaded');

    var loaderWrapper = document.getElementById("loader-wrapper");
    var fade = setInterval(function () {
        if (!loaderWrapper.style.opacity) {
            loaderWrapper.style.opacity = 1;
        }
        if (loaderWrapper.style.opacity > 0) {
            loaderWrapper.style.opacity -= 0.1;
        } else {
            clearInterval(fade);
        }
    }, 200);

    //Dit nog extra omdat anders de layer er nog over staat en je niks kan intypen.
    var fadeEffectTwee = setTimeout(function () {
        loaderWrapper.style.display = "none";
    }, 300);
});