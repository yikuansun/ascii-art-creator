//initiate vars
var docName, docWidth, docHeight, bgChar;
// read from location.search
var searchParams = new URLSearchParams(location.search);
// go to index.html if no search params
if (!searchParams.get("title")) location.replace("index.html");
docName = searchParams.get("title");
docWidth = searchParams.get("width");
docHeight = searchParams.get("height");
bgChar = searchParams.get("bgChar");
mouseDown = false;

//set up the text
centeritem = document.createElement("center");
document.body.appendChild(centeritem);
textelem = document.createElement("code");
centeritem.appendChild(textelem);
textelem.style.userSelect = "none";
textelem.style.fontSize = "24px";
textelem.style.whiteSpace = "pre";

//set up input area
inputfield = document.createElement("input");
inputfield.type = "text";
inputfield.maxLength = "1";
label = document.createElement("label");
label.innerText = "Character to replace: ";
centeritem.appendChild(label);
centeritem.appendChild(inputfield);

//create array
for (i = 0; i < docHeight; i++) {
    for (j = 0; j < docWidth; j++) {
        cell = document.createElement("span");
        cell.innerText = bgChar;
        textelem.appendChild(cell);
        cell.onclick = function() {alert("wtf")};
    }
    textelem.innerHTML += "<br/>"
}

//add event listeners
for (cell of document.getElementsByTagName("span")) {
    cell.onmouseover = function() {
        if (mouseDown) {
            if (inputfield.value.length > 0) {
                this.innerText = inputfield.value;
            }
        }
    };
    //onmouseover is not accurate for the initial click
    cell.onmousedown = function() {
        if (inputfield.value.length > 0) {
            this.innerText = inputfield.value;
        }
    }
}
document.body.onmousedown = function() {mouseDown = true;};
document.body.onmouseup = function() {mouseDown = false;};

//export funtion
function exportFile() {
    //create blob
    file = new Blob([textelem.innerText], {type: "txt"});
    //create a
    link = document.createElement("a");
    link.download = docName + ".txt";
    link.href = URL.createObjectURL(file);
    //download
    link.click();
}

//CTRL+S
document.addEventListener("keydown", function(e) {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
        e.preventDefault();
        exportFile();
    }
}, false);

//export button
exportButton = document.createElement("button");
exportButton.onclick = exportFile;
exportButton.innerText = "Export project";
centeritem.appendChild(document.createElement("br")); //add line break
centeritem.appendChild(document.createElement("br")); //add line break
centeritem.appendChild(exportButton);

//copy to clipboard button
var clipboardButton = document.createElement("button");
clipboardButton.addEventListener("click", function() {
    navigator.clipboard.writeText(textelem.innerText);
    alert("Copied to clipboard!");
});
clipboardButton.innerText = "Copy result to clipboard";
centeritem.appendChild(document.createElement("br")); //add line break
centeritem.appendChild(document.createElement("br")); //add line break
centeritem.appendChild(clipboardButton);