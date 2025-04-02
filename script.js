document.addEventListener('DOMContentLoaded', () => {
    let music = new Audio();
    let play = document.getElementById("play");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let titleElements = document.querySelectorAll(".info #title");
    let artistElements = document.querySelectorAll(".info #artist");
    let babyIcons = document.querySelectorAll(".info #baby");
    let currentTimeDisplay = document.getElementById("current-time");
    let durationDisplay = document.getElementById("duration");
    // let anime=document.querySelectorAll("#anime");
    let seekbar = document.getElementById("seekbar");
    let progress = document.getElementById("progress");
    let circle = document.getElementById("circle");
    let currentSongDisplay = document.getElementById("current-song");

    let One = document.querySelector(".card.one");
    let Two = document.querySelector(".card.two");
    let Three = document.querySelector(".card.three");
    let Four = document.querySelector(".card.four");
    let isPlaying = false;let val;
    let currentPlayingIndex = -1;

    let song1 = [
        { name: "dekha", title: "Dekha ek Khwab", artist: "Kishore Kumar" },
        { name: "jishka", title: "Jishka mujhe", artist: "Kishore Kumar" },
        { name: "omere", title: "Dil ke chain", artist: "Kishore Kumar" },
        { name: "tuhia", title: "Tuhia", artist: "Kishore Kumar" },
        { name: "yeraat", title: "Ye raatein", artist: "Kishore Kumar" }
    ];

    let song2 = [
        { name: "Apna Bana Le", title: "Apna Bana Le", artist: "Arijit" },
        { name: "Dekhha", title: "Dekha Tenu", artist: "M Faiz" },
        { name: "Jeena Jeena", title: "Jeena Jeena", artist: "Atif Aslam" },
        { name: "Rabba Mein", title: "Rabba Mein", artist: "chinnamyi" },
        { name: "Tere Bina", title: "Tere Bina", artist: "Arijit" }
    ];

    let song3 = [
        { name: "Attention", title: "Attention", artist: "Charlie" },
        { name: "Heat Waves", title: "Heat Waves", artist: "Glass Animals" },
        { name: "Night Changes", title: "Night Changes", artist: "One Direction" },
        { name: "Sorry", title: "Sorry", artist: "Justin Beiber" },
        { name: "Stitches", title: "Stitches", artist: "Shawn Mendes" }
    ];

    let song4 = [
        { name: "Dard Dilo ke", title: "Dard Dilo ke", artist: "Himesh" },
        { name: "Hasi", title: "Hasi", artist: "Arijit" },
        { name: "Itni Si Baat", title: "Itni Si Baat", artist: "Arijit" },
        { name: "Saibo", title: "Saibo", artist: "Shreya" },
        { name: "Tujhse Naraz", title: "Tujhse Naraz", artist: "Sanam" }
    ];

    let songs = song1; // Default to song1 initially
    let songIndex = 0;

    function updateSongList(newSongs) {
        songs = newSongs;
        songs.forEach((song, index) => {
            titleElements[index].textContent = song.title;
            artistElements[index].textContent = song.artist;
            titleElements[index].style.textAlign = "center";
            artistElements[index].style.textAlign = "center";
            titleElements[index].parentElement.style.display = "flex";
            titleElements[index].parentElement.style.flexDirection = "column";
            titleElements[index].parentElement.style.alignItems = "center";
            // Clear previous event listeners if any
            titleElements[index].onclick = null;
            // Attach new event listener to play the song
            titleElements[index].onclick = () => {
                songIndex = index;
                loadSong(songIndex);
                playMusic();
            };
        });
    }

    One.addEventListener("click", () => {
        songs = song1;
        val=1;
        updateSongList(songs);
        loadSong(songIndex); // Reload current song if already playing
    });

    Two.addEventListener("click", () => {
        songs = song2;
        val=2;
        updateSongList(songs);
        loadSong(songIndex); // Reload current song if already playing
    });

    Three.addEventListener("click", () => {
        songs = song3;
        val=3;
        updateSongList(songs);
        loadSong(songIndex); // Reload current song if already playing
    });

    Four.addEventListener("click", () => {
        songs = song4;
        val=4;
        updateSongList(songs);
        loadSong(songIndex); // Reload current song if already playing
    });

    const playMusic = () => {
        isPlaying = true;
        music.play()
            .then(() => {
                console.log("Playing music");
                play.src = "pausing.gif"; // Assuming this is the correct path for your play/pause button image
                document.getElementById(`anime${val}`).classList.add("animation");
                updateBabyIcons();
            })
            .catch(error => {
                console.error("Failed to play:", error);
            });
    };

    const pauseMusic = () => {
        isPlaying = false;
        music.pause();
        play.src = "playing.gif"; // Assuming this is the correct path for your play/pause button image
        document.getElementById(`anime${val}`).classList.remove("animation");
        updateBabyIcons();
    };

    const loadSong = (index) => {
        songIndex = index;
        let song = songs[songIndex];
        console.log("Loading song:", song);
        music.src = `${songs === song1 ? 'song1/' : songs === song2 ? 'song2/' : songs === song3 ? 'song3/' : 'song4/'}${song.name}.mp3`; // Adjust this path based on your actual file structure
        music.load();
        currentSongDisplay.textContent = `${song.title} - ${song.artist}`; // Display current song title and artist
        updateBabyIcons();
    };

    const prevSong = () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
        playMusic(); // Ensure the song plays after loading
    };

    const nextSong = () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex);
        playMusic(); // Ensure the song plays after loading
    };

    // Update baby icons based on current playing song
    const updateBabyIcons = () => {
        babyIcons.forEach((icon, index) => {
            icon.src = index === songIndex && isPlaying ? "pause.svg" : "play.svg"; // Assuming "pause.svg" is the correct path for your pause icon
        });
    };

    // Convert seconds to minutes:seconds format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Event listener for timeupdate
    music.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = formatTime(music.currentTime);
        const progressPercent = (music.currentTime / music.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        circle.style.left = `${progressPercent}%`;
    });

    // Event listener for loadedmetadata
    music.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(music.duration);
    });

    // Seek bar interaction
    seekbar.addEventListener('click', (e) => {
        const seekbarWidth = seekbar.clientWidth;
        const clickX = e.offsetX;
        const duration = music.duration;

        music.currentTime = (clickX / seekbarWidth) * duration;
    });

    // Initial setup: load first song
    loadSong(songIndex);

    // Event listeners
    play.addEventListener("click", () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    prev.addEventListener("click", prevSong);
    next.addEventListener("click", nextSong);

    console.log("Event listeners attached");
});








































































// let currentsong=new Audio();
// let songs;
// let currFolder;
// function secondsToMinutesSeconds(seconds)
// {
//     if(isNaN(seconds)|| seconds<0)
//         {
//             return "00:00";
//         }
//         const minutes=Math.floor(seconds/60);
//         const remainingseconds=Maht.floor(seconds%60);
//         const formattedminutes=String(minutes).padStart(2,'0');
//         const formattedseconds=String(remainingseconds).padStart(2,'0');
//         return `${formattedminutes}:${formattedseconds}`;
// }
// async function getSongs(folder) {
//     currFolder = folder;
//     let a = await fetch(`http://127.0.0.1:3000/${songs}/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split(`/${folder}/`)[1])
//         }
//     }
//     return songs;
// }
// const playmusic=(track,pause=False)=>{
//    //let audio=new Audio("/songs/"+track)
//    currentsong.src=`/${currFolder}/`+track
//    if(!pause){
//     currentsong.play();
//     play.src="pause.svg"
//    }
   
//    document.querySelector(".songinfo").innerHTML=decodeURI(track);
//    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
// }
// async function main(){
//     //get the list of all the songs
//     songs=await getSongs("songs/ncs");
//     playmusic(songs[0],true)
//     console.log(songs)
//     //show all the songs in the playlist
//     let songul=document.querySelector(".songList").getElementsByTagName("ul")[0];
//     for(const song of songs){
//         songul.innerHTML=songul.innerHTML+`<li><img class="invert" width:"34" src="music.svg" alt="">
//         <div class="info">
//             <div>${song.replace("%20"," ")}</div>
//             <div>Harry</div>
//         </div>
//         <div class="playnow">
//             <span>Play Now</span>
//             <img class="invert" src="play.svg" alt="">
//         </div>
//     </li>`;

//     }
//     //Attach an event listener to each song
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
//         e.addEventListener("click",element=>{
//             console.log(e.target.getElementsByTagName("div")[0])
//             playmusic(e.querySelector(".info").firstElementChild.innerHTML)
            
//         })
//     })
//     //attach  an event listener to play,next and previous song
//     play.addEventListener("click",()=>{
//         if(currentsong.paused){
//             currentsong.play()
//         }
//         else
//         {
//             currentsong.pause()
//             play.src="play.svg"
//         }
//     })
//     //Listen for timeupdate event
//     currentsong.addEventListener("timeupdate",()=>{
//         console.log(currentsong.currentTime,currentsong.duration);
//         document.querySelector("songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
//         document.querySelector(".circle").computedStyleMap.left=(currentsong.currentTime/currentsong.duration)*100+"%";
//     })
//     //Add and event listener to seek baar
//     document.querySelector(".seekbar").addEventListener("click",e=>{
//         let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
//         document.querySelector(".circle").style.left=percent +"%";
//         currentsong.currentTime=((currentsong.duration)*percent)/100;
//     })
//     //Add an event listener to ham 
//     document.querySelector(".hammu").addEventListener("click",()=>
//     {
//         document.querySelector(".left").style.left="0";
//     })
//     //Add an event listener to cross
//     document.querySelector(".close").addEventListener("click",()=>
//         {
//             document.querySelector(".left").style.left="-120%";
//         })

//     //Add an event listener to previous
//     prev.addEventListener("click",()=>{
//         console.log("Previous Clicked")
//         console.log(currentsong)
//         let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
//         if((index-1)>=0){
//             playmusic(songs[index-1])
//         }
//     })

//     //Add an event listener ot next
//     next.addEventListener("click",()=>{
//         console.log("Next clicked")
//         let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
//         if((index+1)<songs.length)
//             {
//                 playmusic(songs[index+1])
//             }
//     })
//     //Add an event to volume
//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("chage",(e)=>{
//         console.log("Setting volume to",e.target.value,"/100")
//         currentsong.volume=parseInt(e.target.value)/100
//     })

// }
// main();
