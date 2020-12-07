let record = document.getElementById('record');
let stop = document.getElementById('stop');
let audio = document.getElementById('audio');
let content = document.getElementById('content');

let items = [];

record.addEventListener('click', handleRecord);

function handleRecord(){

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        const constraints = { audio: true };

        let onSuccess = function(stream){
            console.log("OK");
            const mediaRecorder = new MediaRecorder(stream);
            items = [];
            content.removeChild(content.lastChild);
            record.disabled = true;
            stop.disabled = false;

            mediaRecorder.start();

            stop.onclick = function(){
                mediaRecorder.stop();
                record.disabled = false;
                stop.disabled = true;

            }

            mediaRecorder.ondataavailable = e => {
                let audio = document.createElement("audio");
                audio.id = "audio";
                items.push(e.data);
                if(mediaRecorder.state == 'inactive'){
                    let blob = new Blob(items, {type: 'audio/webm'});
                    audio.setAttribute('controls', 'controls');
                    audio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm"/>';
                    content.appendChild(audio);
                }
            }
        }


        let onError = function(err){
            window.alert("Error: the browser cannot access the microphone. Change the" +
                " browser permission settings and reload the page.");
        }


        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }
}





