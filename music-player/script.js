const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById ('current-time');
const durationEL = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'Rooz-haye Sakht',
        displayName: 'Rooz-haye Sakht',
        artist: 'Morteza Pashaei',
    },
    {
        name: 'Bilmem Mi',
        displayName: 'Bilmem Mi',
        artist: 'Sefo',
    },
    {
        name: 'Alijenab',
        displayName: 'Alijenab',
        artist: 'Evan Band',
    },
    {
        name: 'Dewanagak',
        displayName: 'Dewanagak',
        artist: 'Jamal Mubarez'
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = 'music/' + song.name + '.mp3';
    image.src = 'img/' + song.name + '.jpg';
}

// Current Song
let songIndex = 0; // Change this to start from the first song

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; // Use backticks for the template string
        
        // calculate display for duration  
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration element to avoid NaN 
        if (durationSeconds) {
            durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current  
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        console.log( 'seconds', currentSeconds);
        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime = (clickX / width) * duration ; 
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);




document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('audioPlayer');
    var volumeControl = document.getElementById('volumeSlider');

    // Set initial volume to 100
    audio.volume = 1.0;

    // Set initial value of the volume slider to 100
    volumeControl.value = 100;

    // Update volume when the user changes the slider
    volumeControl.addEventListener('input', function () {
        audio.volume = volumeControl.value / 100;
    });
});





document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const audioPlayer = document.getElementById("audioPlayer");
    const replayButton = document.getElementById("replay");

    // Add click event listener to the replay button
    replayButton.addEventListener("click", function () {
        // Set the audio current time to 0 (replay)
        audioPlayer.currentTime = 0;
        
        // If the audio is paused, play it
        if (audioPlayer.paused) {
            audioPlayer.play();
        }
    });
});






