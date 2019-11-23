let songs = ["Sade - Jezebel.mp3", 
"Frank Ocean - Novacane.mp3", 
"Ora6eis - Oro.mp3", 
"Elz ByFar - Legal Tree.mp3", 
"Mark Ronson - Valerie (feat. Amy Winehouse).mp3",
"Regina Spektor - Love Affair.m4a", 
"Nina Simone - Feeling Good.mp3", 
"Ora6eis - Calendario.mp3"];

let songTitle = document.getElementById('songTitle');
let songSlider = document.getElementById('songSlider');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let volumeSlider = document.getElementById('volumeSlider');
let nextSongTitle = document.getElementById('nextSongTitle');

let song = new Audio();
let currentSong = 0;

window.onload = loadSong(); 

function loadSong() {
    song.src = "playerSongs/" + songs[currentSong];
    song.play();
    songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
    nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[(currentSong + 1) % songs.length];
    song.playbackRate = 1;
    song.volume = volumeSlider.value;
    setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider () {
    let c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if(song.ended){
        next();
    }
}

function convertTime (secs) {
    let min = Math.floor(secs/60);
    let sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}

function showDuration () {
    let d = Math.floor(song.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertTime(d);
}

function playOrPauseSong (img) {
    song.playbackRate = 1;
    if(song.paused){
        song.play();
        img.src = "images/darkPause.png";
    }else{
        song.pause();
        img.src = "images/darkPlay.png";
    }
}

function next(){
    currentSong = currentSong + 1 % songs.length;
    currentSong = (currentSong > songs.length -1) ? 0 : currentSong;
    loadSong();
}

function previous() {
    currentSong = currentSong - 1;
    currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
    loadSong();
}

function seekSong () {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume () {
    song.volume = volumeSlider.value;
}

function increasePlaybackRate () {
    song.playbackRate += 0.1;
}

function decreasePlaybackRate () {
    song.playbackRate -= 0.1;
}
