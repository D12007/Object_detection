img = "";
Status = "";
object = [];

function preload() {
    img = loadImage("cars.jpg");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("btn-1").innerHTML = "STATUS: DETECTING OBJECTS";
}

function draw() {
    image(img, 0, 0, 600, 500);
    if (Status != "") {
        for (i = 0; i < object.length; i++) {
            fill("red");
            document.getElementById("btn-1").innerHTML = "STATUS:OBJECTS DETECTED";
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%", object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function modelLoaded() {
    console.log("modelloaded successfully");
    Status = true;
    objectdetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}