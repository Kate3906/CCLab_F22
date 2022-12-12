const detectionOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptions: false,
    minConfidence: 0.5,
};

let expression = "";
let faceapi;
let detections = [];
let modelReady = false;

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
    modelReady = true;
    faceapi.detect(gotResults);
}

function gotResults(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    detections = result;
    //faceapi.detect(gotResults);
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
    push();
    translate(-cam.width / 2, -cam.height / 2);
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
    pop();
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
