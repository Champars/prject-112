prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="result_image" src="' + data_uri + '"/>';
    });
}
console.log("ml5", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TA6JvSrXQ/model.json', modelloaded);

function modelloaded() {
    console.log("Model Is Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    data = "The  prediction is" + prediction;
    var utterthis = new SpeechSynthesisUtterance(data);
    synth.speak(utterthis);
}

function sort() {
    img = document.getElementById("result_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("gesture_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "good") {
            document.getElementById("Gesture").innerHTML = "&#128077;";
        }
        if (results[0].label == "not good") {
            document.getElementById("Gesture").innerHTML = "&#128078;";
        }
        if (results[0].label == "open hands") {
            document.getElementById("Gesture").innerHTML = "&#128080;";
        }
        if (results[0].label == "all okay") {
            document.getElementById("Gesture").innerHTML = "&#9995;";
        }
        if (results[0].label == "victory") {
            document.getElementById("Gesture").innerHTML = "&#9996;";
        }
    }
}