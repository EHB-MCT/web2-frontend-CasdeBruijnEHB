export function loaderAnimation() {
    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        generatorAnimation();
    });
}
loaderAnimation();

export function generatorAnimation() {
    let wrapper = document.getElementById("loader-wrapper");
    let html = `
    <span class = "loader" >
    <span class = "loader-inner" >
    </span> 
    </span>`;
    wrapper.style.display = "flex";
    wrapper.style.opacity = 1;
    wrapper.innerHTML = html;
    fadeEffect(wrapper);
}


function fadeEffect(wrapper) {
    var fade = setInterval(function () {
        if (!wrapper.style.opacity) {
            wrapper.style.opacity = 1;
        }
        if (wrapper.style.opacity > 0) {
            wrapper.style.opacity -= 0.1;
        } else {
            clearInterval(fade);
        }
    }, 200);


    var fadeEffectTwee = setTimeout(function () {
        wrapper.style.display = "none";
    }, 300);
}