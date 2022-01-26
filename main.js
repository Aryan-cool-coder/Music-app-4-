songC = '';
songI = '';
LY = '0';
LX = '0';
RY = '0';
RX = '0';
scoreL = '0';
songStatusC = '';
songStatusI = '';

function preload() {
    songC = loadSound('music.mp3');
    songI = loadSound('music1.mp3');
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
image(video, 0, 0, 600, 500);
fill('magenta');
stroke('red');
songStatusC = songC.isPlaying() ;
songStatusI = songI.isPlaying();
if (scoreL > 0.2) {
    circle(LX, LY, 20);
    songI.stop();
    if(songStatusC == 'false') {
        songC.play();
        document.getElementById("song").innerHTML = songC;
    }
}
}

function modelLoaded() {
    console.log('Pose net is initialized') ;
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreL = results[0].pose.keypoints[9].score;
        LX = results[0].pose.leftWrist.x;
        LY = results[0].pose.leftWrist.y;
        RX = results[0].pose.rightWrist.x;
        RY = results[0].pose.rightWrist.y;
        console.log("score left wrist =  " + scoreL);
        
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}