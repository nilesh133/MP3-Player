let playbtn = document.getElementById("play-btn");
let prevbtn = document.getElementById("prev-btn");
let nextbtn = document.getElementById("next-btn");
const audio = document.querySelector("audio");
const img = document.querySelector("img");
let songName = document.getElementById("song-name");
let songArtist = document.getElementById("song-artist");
let volumeSlider = document.getElementById("volume-slider");
let volumeDigit = document.getElementById("volume-digit");
let volumeButton = document.getElementById("volume-btn");
let progressLineBox = document.getElementById("progress-line-box");
let progressLine = document.getElementById("progress-line");
let startTime = document.getElementById("start-time");
let endTime = document.getElementById("end-time");
let audiolistShowbtn = document.getElementById("audio-list-show-btn");
let audiolistHidebtn = document.getElementById("music-list-hide-btn");
let audiolist = document.getElementById("audio-list");
let progressBoxCircle = document.getElementById("progress-box-circle");

let songNumber = 0;

let isPlaying = false;
playbtn.addEventListener('click', function () {
    if (isPlaying) {
        stopAudio();
    }
    else {
        playAudio();
    }
});

function playAudio() {
    isPlaying = true;
    audio.play();
    playbtn.classList.replace("fa-play-circle", "fa-pause-circle");
    playbtn.style.boxShadow = "inset 6px 6px 7px #070707, inset -6px -6px 7px #070707";
    playingNow();
};

function stopAudio() {
    isPlaying = false;
    audio.pause();
    playbtn.classList.replace("fa-pause-circle", "fa-play-circle");
    playbtn.style.boxShadow = "6px 6px 7px #070707, -6px -6px 7px #070707";
    playingNow();
};

let songsList = [
    {
        song: "Downtown",
        songImage: "downtown",
        songName: "Downtown",
        songArtist: "Guru Randhawa"
    },

    {
        song: "Onmyway",
        songImage: "onmyway",
        songName: "On My Way",
        songArtist: "Alan Walker"
    },

    {
        song: "Maate Vinadhuga",
        songImage: "maate-vinadhuga",
        songName: "Vinadhuga",
        songArtist: "Sid Sriram"
    },

    {
        song: "Dega Jaan",
        songImage: "dega-jaan",
        songName: "Dega Jaan",
        songArtist: "The Family Man"
    },

    {
        song: "Scam 1992",
        songImage: "scam-1992",
        songName: "Scam 1992",
        songArtist: "Achint"
    },

    {
        song: "Guitar Sikhda",
        songImage: "guitar-sikhda",
        songName: "Guitar Sikhda",
        songArtist: "Jassie Gill"
    },

    {
        song: "Bad Liar",
        songImage: "bad-liar",
        songName: "Bad Liar",
        songArtist: "Imagine Dragons"
    },

    {
        song: "Priyathama",
        songImage: "priyathama",
        songName: "Priyathama",
        songArtist: "Chinmayi Sripada"
    }
];

function playSong(songsList) {
    audio.src = "music/" + songsList.song + ".mp3";
    img.src = "images/" + songsList.songImage + ".jpg";
    songName.textContent = songsList.songName;
    songArtist.textContent = songsList.songArtist;
};

nextbtn.addEventListener('click', nextSong);
prevbtn.addEventListener('click', prevSong);

function nextSong() {
    songNumber = (songNumber + 1) % songsList.length;
    playSong(songsList[songNumber]);
    playAudio();
    playingNow();
};

function prevSong() {
    songNumber = (songNumber - 1 + songsList.length) % songsList.length;
    playSong(songsList[songNumber]);
    playAudio();
    playingNow();
};

volumeSlider.addEventListener('change', function () {
    audio.volume = volumeSlider.value / 100;
});

volumeButton.addEventListener('click', function () {
    volumeSlider.classList.toggle("vol-show-hide");
});

audio.addEventListener('timeupdate', function (event) {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressTime = (currentTime / duration) * 100;
    progressLine.style.width = `${progressTime}%`;

    let minStarttime = Math.floor(currentTime / 60);
    let secStarttime = Math.floor(currentTime % 60);
    if (secStarttime < 10) {
        secStarttime = `0${secStarttime}`;
    }
    startTime.innerText = `${minStarttime}:${secStarttime}`;

    let minEndtime = Math.floor(duration / 60);
    let secEndtime = Math.floor(duration % 60);
    if (secEndtime < 10) {
        secEndtime = `0${secEndtime}`;
    }
    if (duration) {
        endTime.innerText = `${minEndtime}:${secEndtime}`;
    }
});

progressLineBox.addEventListener('click', function (event) {
    let progressWidth = progressLineBox.clientWidth;
    let clickedOffSetX = event.offsetX;
    let duration = audio.duration;
    audio.currentTime = (clickedOffSetX / progressWidth) * duration;
});

audio.addEventListener('ended', nextSong);

audiolistShowbtn.addEventListener("click", function () {
    audiolist.classList.toggle("show");
});


const ulTag = document.getElementById("ul");
for (let i = 0; i < songsList.length; i++) {
    let liTag = `<li idx = "${i}">
                   <h4>${songsList[i].songName}</h4>
                   <h5>${songsList[i].songArtist}</h5>
                   <audio src="music/${songsList[i].src}.mp3"></audio>
               </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
}

const allLiTag = ulTag.querySelectorAll("li");
console.log(allLiTag);
function playingNow() {
    for (let j = 0; j < allLiTag.length; j++) {
        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
        }
        if (allLiTag[j].getAttribute("idx") == songNumber) {
            allLiTag[j].classList.add("playing");
        }
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(e) {
    let getLiIdx = e.getAttribute("idx");
    songNumber = getLiIdx;
    playSong(songsList[songNumber]);
    playAudio();
    playingNow();
}