let defaultStrength = 0.4
let defaultFadeAmount = 250

let themes = {
    light: "rgb(255, 255, 255, ",
    dark: "rgb(0, 0, 0, "
}

//ADD STYLES
addStyles()

function addStyles() {
    let styles = `

.waveButton {
    position: relative;
    overflow: hidden;
}

.wave {
    position: absolute;
    width: 0;
    height: 0;
    width: 0.1px;
    height: 0.1px;
    border-radius: 100%;
    margin: auto;
}
    `

    var styleSheet = document.createElement("style")
    styleSheet.innerHTML = styles
    document.head.appendChild(styleSheet)
}

let waveButtons = document.getElementsByClassName("waveButton")

window.onload = function() {

    for (let button of waveButtons) {

        button.addEventListener("mousedown", addWave)

        for (let child of button.childNodes) {

            if (child.style) {

                child.style.pointerEvents = "none"
            }
        }
    }
}

async function addWave(e) {

    let button = e.target

    // Add wave

    let wave = document.createElement("div")

    wave.classList.add("wave")

    button.appendChild(wave)

    // Apply additional styling

    let x = e.clientX
    let y = e.clientY

    wave.style.left = x - button.getBoundingClientRect().left + "px"

    wave.style.top = y - button.getBoundingClientRect().top + "px"

    /* wave.style.left = button.getBoundingClientRect().left + "px"

    wave.style.top = button.getBoundingClientRect().top + "px" */

    if (!button.dataset.waveFadeAmount) {

        button.dataset.waveFadeAmount = defaultFadeAmount
    }

    if (!button.dataset.waveStrength) {

        button.dataset.waveStrength = defaultStrength
    }

    if (!button.dataset.waveTime) {

        button.dataset.waveTime = 2
    }

    let theme

    switch (button.dataset.waveTheme) {
        case "dark":

            theme = themes.dark

            break
        default:

            theme = themes.light
    }

    // Timer

    function waveTimer(multiplier) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve()
            }, button.dataset.waveTime * multiplier)
        })
    }

    // Transform wave

    let size = 0

    for (let i = 0; i < (button.dataset.waveTime * 100); i++) {

        size += button.offsetWidth / 100

        /* wave.style.width = size + "px"
        wave.style.height = size + "px" */

        /* wave.style.background = theme + button.dataset.waveStrength + ")" */

        wave.style.boxShadow = theme + button.dataset.waveStrength + ") 0 0 0 " + size + "px"

        /* wave.style.transform = "translate3d(" + size * -0.5 + "px, " + size * -0.5 + "px, 0)" */

        wave.style.opacity = 1 - i / button.dataset.waveFadeAmount

        await waveTimer(1)
    }

    wave.style.transition = "opacity " + button.dataset.waveTime / 5 + "s"

    wave.style.opacity = 0

    await waveTimer(200)

    // Delete wave

    wave.parentNode.removeChild(wave)
}