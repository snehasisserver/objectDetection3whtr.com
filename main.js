img="";
Status ="";
Objects = [];
var status=false;
function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true;
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error("error!");
    }
    console.log(results);
    Objects = results;
}

function draw(){
    
    image(img,0,0,500,400);
    if(Status != ""){
        for(i = 0;i<Objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("red");
            percent = floor(Objects[i].confidence*100);
            text(Objects[i].label + " " + percent + "%",Objects[i].x,Objects[i].y-5);
            noFill();
            stroke("red");
            rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);
        }
    }
    
}