let audio = document.querySelector("#myAudio")
let inputAudio = document.querySelector(".custom-file-input")
let currentSong = 0
let filePath = ""
let songName = ""
let shuffleFlag = false
let shuffledSongs = []
let fileName = ""
let staticPath = ""

//list of online sources for songs
let songsList = ["https://ia601004.us.archive.org/3/items/cd_night-visions_imagine-dragons/disc1/01.%20Imagine%20Dragons%20-%20Radioactive_sample.mp3",
"https://ia601004.us.archive.org/3/items/cd_night-visions_imagine-dragons/disc1/03.%20Imagine%20Dragons%20-%20It%27s%20Time_sample.mp3",
"https://ia601004.us.archive.org/3/items/cd_night-visions_imagine-dragons/disc1/04.%20Imagine%20Dragons%20-%20Demons_sample.mp3",
"https://ia801004.us.archive.org/3/items/cd_night-visions_imagine-dragons/disc1/11.%20Imagine%20Dragons%20-%20Nothing%20Left%20to%20Say%20-%20Rocks_sample.mp3",
"https://ia601004.us.archive.org/3/items/cd_night-visions_imagine-dragons/disc1/05.%20Imagine%20Dragons%20-%20On%20Top%20of%20the%20World_sample.mp3"
]

//list of songs' names
let songsNames = ["Radioactive","It's Time","Demons","Nothing Left to Say","On Top of The World"]

//playing the first song in list
audio.src = songsList[0]

//Adding anchor tags as items in the songs list
var ul = document.getElementById("audio-list")
for(let i =0; i < songsList.length; i++){
    createElements(songsList[i],songsNames[i])
}

//function to create html elements (li, a, button) 
function createElements(sSrc,sName){
    let li = document.createElement("li");
    ul.appendChild(li);
    let a = document.createElement("a");
    li.appendChild(a);
    a.href = sSrc;
    a.innerHTML += sName;
    let removeButton = document.createElement("button")
    li.appendChild(removeButton)
    removeButton.innerHTML += "x" 
}


//Remove song from play list
function removeSong(){
    let remove = document.querySelectorAll("#audio-list li button")
    let listItems = document.querySelectorAll("#audio-list li")
    
    for(let j=0; j < remove.length; j++){
    remove[j].addEventListener("click",()=>{
        // songsList.splice(j,1)
        delete songsList[j]
        listItems[j].remove()
    })
    }
}

removeSong()

//preventDefault of anchor tags, play the song instead of downloading it
function preventDef(){
    let anchors = document.querySelectorAll("a")
    for(let i=0; i < songsList.length; i++){
        anchors[i].addEventListener("click",(e)=>{
        e.preventDefault()    
        audio.src = songsList[i]
        playAudio()
        })
    }    
}

preventDef()

//play audio function
function playAudio() { 
    audio.play(); 
} 

//pause audio function
function pauseAudio() { 
    audio.pause(); 
} 

//add button event and pushing the new song to the songs list
inputAudio.addEventListener("change",()=>{
    fileName = inputAudio.files[0].name
    //split the file extension
    let name = fileName.split(".")
    staticPath = "../Songs/"+fileName
    
    //pushing the song source and name to lists
    songsList.push(staticPath)
    songsNames.push(name[0])

    //create new item list for the new song
    createElements(staticPath,name[0])
    preventDef()
    removeSong()
})

//shuffle audio function
var lastSong = null;
var selection = null;
function shuffleAudio() {
    audio.addEventListener("ended", function(e) {
        while(selection == lastSong){
            //getting random index for the audio list
            selection = Math.floor(Math.random() * songsList.length);
        }
        lastSong = selection;
        e.target.src = songsList[selection];
        e.target.play();
    });
}

//sequential playing of songs
function seqAudio(){
    audio.src = songsList[0]
    playAudio();
    audio.addEventListener("ended", function() {
        currentSong++;
        if (currentSong == songsList.length){
            currentSong = 0
        }
        audio.src = songsList[currentSong];
        playAudio();
    });
}
