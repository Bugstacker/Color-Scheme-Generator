const getSchemeBtn = document.getElementById('get-scheme-btn') // Get color Scheme button
const form = document.forms['color-form'] //The form in the document

// modes from the selection and required by default
const modeVal = form.modes
modeVal.required = true

// get selected Mode to give to the mode attribute in the api
const getSelectedMode = () => {
    const selectedMode = form.modes.value
    return selectedMode
}

// get input color value === the browser lets the client select rgb but the output is hex ===

const getColor = () => {
    const color = document.getElementById('color').value
    return color.slice(1, ) // remove the '#' from the returned hex value 
}


// function to render colors to the Dom
function renderColors() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${getColor()}&mode=${getSelectedMode()}&count=5`)
        .then(response => response.json())
        .then(colorData => {
            let colorHtml = ``
            let colorVal = ''
            for (color of colorData.colors) {
                colorVal = color.hex.value
                colorHtml += `
                <div class="color">
                    <div class="color-scheme" style="background-color:${colorVal}" >
                    </div>
                    <div>
                        <p class="text"  id='text' data-color="${colorVal}">${colorVal}</p>
                    </div>
                </div>
                `
            }
            document.getElementById('colors-container').innerHTML = colorHtml
        })
}

renderColors()

// handle form submit
form.onsubmit = (e) => {
    e.preventDefault()
    renderColors()
}
