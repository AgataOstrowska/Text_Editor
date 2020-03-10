function bold() {
    document.execCommand("bold")
}

function italic() {
    document.execCommand("italic")
}

function copy() {
    document.execCommand("copy")
}

function paste() {
    navigator.clipboard.readText().then(text => {
        let selection = window.getSelection()
        let cursor = selection.getRangeAt(0)
        let el =  document.createElement('div')
        text = text.replace('\n', "<br>")
        el.innerHTML = text
        cursor.insertNode(el)
    })
}

function changeFont() {
    document.execCommand("fontName", false, "Arial")
}

let fonts = [
    "Arial",
    "Calibri",
    "Bebas Neue Bold",
    "Comic Sans MS",
    "DejaVu Sans Mono",
    "Ink Free",
    "Microsoft Himalaya",
    "Segoe Script"
]

let range = null
let currentFont = 'Arial'
let fontList = document.getElementById("font-list")

for (let font of fonts) {
    let fontItem = document.createElement("div")
    fontItem.setAttribute("class", "font-item")
    let fontName = document.createElement("h1")
    fontName.style.fontFamily = font
    fontName.textContent = font
    fontItem.appendChild(fontName)

    fontItem.addEventListener("mouseover", () => {
        document.execCommand("fontName", false, font)
    })

    fontItem.addEventListener("mousedown", (event) => {
        event.preventDefault()
        currentFont = font
        let currFont = document.getElementById("font-current")
        currFont.children[0].style.fontFamily = font
        currFont.children[0].textContent = font
    })

    fontList.appendChild(fontItem)
}

fontList.addEventListener("mouseleave", () => {
    document.execCommand("fontName", false, currentFont)
})

let editor = document.getElementById("editor")
editor.addEventListener('blur', (e) => {
    let selection = window.getSelection()
    let newRnge = selection.getRangeAt(0)
})

let fontSize = document.getElementById("font-size")
fontSize.addEventListener('input', (e) => {
    let newFontSize = parseInt(e.target.value)
    if(!isNaN(newFontSize)) {
        let selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand("fontSize", false, newFontSize)
    }
})

fontSize.addEventListener("mousedown", (e) => {
    let selection = window.getSelection()
    range = selection.getRangeAt(0)
})

let state = {
    value: ''
}

document.getElementById("editor")
    .addEventListener("keydown", (e) => {
        e.preventDefault()
        let key = e.key
        if(k == 'Enter') key = '<br>'
        state.value += key
        editor.innerHTML = state.value
    })