const detectionOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptions: false,
    minConfidence: 0.5,
};

let expression = "";
let faceapi;
let detections = [];

function setupFaceAPI(video) {
    faceapi = ml5.faceApi(video, detectionOptions, modelLoaded);
}

function updateFaceAPI() {
    getExpressions(detections);
}

function displayLandmarks() {
    if (detections) {
        if (detections.length > 0) {
            drawLandmarks(detections);
        }
    }
}

function modelLoaded() {
    console.log("Model (FaceAPI) Loaded");
    faceapi.detect(gotResults);
}

function gotResults(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    detections = result;
    faceapi.detect(gotResults);
}

function getExpressions(detections) {
    if (detections.length > 0) {
        let {
            neutral,
            happy,
            angry,
            sad,
            disgusted,
            surprised,
            fearful,
        } = detections[0].expressions;
        expression = detections[0].expressions.asSortedArray()[0].expression;
    }
}

function drawLandmarks(detections) {
    for (let i = 0; i < detections.length; i++) {
        const mouth = detections[i].parts.mouth;
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);
    }
}

function drawPart(feature, closed) {
    beginShape();
    for (let i = 0; i < feature.length; i++) {
        const x = feature[i]._x;
        const y = feature[i]._y;
        vertex(x, y);
    }

    if (closed === true) {
        endShape(CLOSE);
    } else {
        endShape();
    }
}

const btn = document.getElementById('startbutton');

btn.addEventListener('click', function handleClick() {
    const initialText = 'Start!';

    if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
        btn.textContent = 'Again';
    } else {
        btn.textContent = initialText;
    }
});


function selectLove() {
    localStorage.setItem("choice", "love");
    window.open("page-love.html", "_self");
}

function selectStudy() {
    localStorage.setItem("choice", "study");
    window.open("page-study.html", "_self");
}
