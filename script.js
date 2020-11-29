// var start = document.getElementById('start');
var audio = document.getElementById('audio');
var instructions = document.getElementById('instructions');
var duration_sec = 5;

var device = navigator.mediaDevices.getUserMedia({
    audio: true
})
var items = [];
// start.disabled = true;
// start.innerHTML = "Recording...";

audio.controls = false;

instructions.innerHTML = "Speak to record a " + duration_sec + " seconds audio.";


device.then( stream => {
    var recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        items.push(e.data);
        if(recorder.state == 'inactive'){
        var blob = new Blob(items, {type: 'audio/webm'});
        audio.setAttribute('controls', 'controls');
        audio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm"/>';
        }
    }
    recorder.start(100);
    setTimeout(() => {
        recorder.stop();
        // start.disabled = false;
        // start.innerHTML = "Start";
    }, duration_sec*1000);

});


// start.addEventListener('click', handleStartRecord);

// function handleStartRecord(){
// }




