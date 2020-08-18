var Arr = [];
updateArray();

//It is to update array every time 
function updateArray(keyword) {
    Arr = [];
    for (var i = 1; i <= 30; i++) //To retrieve the images from the array
    {
        if (keyword == null) {
            Arr.push("Gallery/" + i + ".png");

        } else if (keyword == 'all') {
            Arr.push("Gallery/" + i + ".png");

        } else {
            Arr.push("Gallery/" + keyword + "-" + i + ".png");
        }

    }
    displayImage();         //To display the image
}


function imgResize(index, sizefactor) {     //To resize image based on number of click
    if (sizefactor == 'medium') {           //When clicked once
        document.body.innerHTML += `<div class="setSize">
                                    <img id="resizedimg" onclick="imgResize(${index}, 'large')" class="toMedium" src="${Arr[index]}">
                                    </div>`;
    }
     else if (sizefactor == 'large') {      //when clicked twice
        document.getElementById("resizedimg").innerHTML = "";
        document.getElementById("resizedimg").className = "toLarge";
        document.getElementById("resizedimg").setAttribute("onclick", "imgResize(" + index + ", 'wide')");
    } 
    else if (sizefactor == 'wide') {        //When clicked thrice
        document.getElementById("resizedimg").className = "toWide";
        document.getElementById("resizedimg").setAttribute("onclick", "imgResize(" + index + ", 'exit')");
    } 
    else if (sizefactor == 'exit') {        //When you give the fourth click image go back to its original size
        var el = document.getElementsByClassName("setSize");
        el[0].parentNode.removeChild(el[0]);
    }
}

function Before(index) {        //To send image to the previous image position
    if (index > 0) {
        var t = Arr[index];
        var next = index - 1; 
        Arr[index] = Arr[next];
        Arr[next] = t;
        displayImage(); 
    }
}

function ToLast(index) {    //To send image to the last position
    var t = Arr[index];
    Arr.splice(index, 1); 
    Arr.push(t);
    displayImage(); 
}

function After(index) {     //interchange position with next image
    var t = Arr[index];
    var next = index + 1; 

    Arr[index] = Arr[next];
    Arr[next] = t;
    displayImage();
}

function ToTop(index) { //To send image to the top
    var t = Arr[index];
    Arr.splice(index, 1); 
    Arr.unshift(t); 
    displayImage(); 
}

function displayImage() {   //Display the image
    console.log(Arr);
    document.getElementById("galleryId").innerHTML = null;
    var i;
    for (i = 0; i < Arr.length; i++) {
        var thisImg = Arr[i];

        var image = `<div class="container">
        <img indexno="${i}" src="${thisImg}" alt="Image not found" class="image">
        <div class="overlay">
            <div class="image-button">
            <i class="top" onclick="ToTop(${i})"></i>
            <i class="before" onclick="Before(${i})"></i>
            <i class="resize" onclick="imgResize(${i},'medium')"></i>
            <i class="after" onclick="After(${i})"></i>
            <i class="bottom" onclick="ToLast(${i})"></i>
            </div>
        </div>
    </div>`;
        document.getElementById("galleryId").innerHTML += image;
    }
}