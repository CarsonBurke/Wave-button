let waveTime = 2

function waveTimer() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve()
        }, waveTime * 1000)
    })
}

//ADD STYLES
addStyles()

function addStyles() {
    let styles = `

    @keyframes waveExpand {
        0% {

            background: rgb(255, 255, 255, 0);
        }
        100% {

            background: rgb(255, 255, 255, 0.6);
            
        }
    }

.waveButton {

    position: relative;
    overflow: hidden;
}
.wave {

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: auto;
    background: white;
    display: none;
    border-radius: 100%;
    transition: all 0.3s;
}
.waveShow {

    display: block;
    animation: waveExpand ${waveTime}s;
}
    `

    var styleSheet = document.createElement("style")
    styleSheet.innerHTML = styles
    document.head.appendChild(styleSheet)
}

let waveButtons = document.getElementsByClassName("waveButton")

window.onload = function() {

    for (let button of waveButtons) {

        let wave = document.createElement("div")

        wave.classList.add("wave")

        button.appendChild(wave)

        button.onmousedown = addWave
    }
}

async function addWave(e) {

    let button = e.target

    let wave = button.childNodes[2]

    wave.classList.add("waveShow")

    setInterval(expandWave, (waveTime * 1))

    async function expandWave() {

        console.log("hi")

        wave.style.width = 5 + wave.scrollWidth + "px"
        wave.style.height = 5 + wave.scrollHeight + "px"

        await waveTimer()

        return
    }

    await waveTimer()

    wave.classList.remove("waveShow")

    wave.style.width = 0
    wave.style.height = 0

    return
}