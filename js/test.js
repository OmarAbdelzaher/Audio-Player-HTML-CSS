let audio = document.querySelector("#myAudio")
let songsList = document.querySelectorAll(".audio-list li a")
let currentSong = 0
let filePath = ""
let songName = ""
let shuffleFlag = false
let shuffledSongs = []
let fileName = ""
let staticPath = ""
let x = document.querySelector(".add-button")

for(let i=0; i < songsList.length; i++)
{
    songsList[i].addEventListener("click",(e)=>{
        e.preventDefault()    
        audio.src = songsList[i]
        playAudio()
    })
}

function playAudio() { 
    audio.play(); 
} 

function pauseAudio() { 
    audio.pause(); 
} 

x.addEventListener("change",()=>{
    fileName = x.files[0].name
    console.log(fileName)
    staticPath = "../Songs/"+fileName
    console.log(staticPath)
    audio.src = staticPath
    playAudio()
})



/*function addSongs(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            songName = files[0].name
            filePath = input.value
            console.log(filePath)
            // audio.src = filePath
            // audio.play()
    };
    input.click();
}*/

/*function shuffleAudio(){
    const index = [];
    shuffleFlag = true
    for (let i= Math.floor(Math.random()* songsList.length); index.length<songsList.length;
            i=Math.floor(Math.random()*songsList.length)) {
        if (!index.includes(i)){
        index.push(i);
        } 
        else {
            i=Math.floor(Math.random()*songsList.length)
        }
        }

        const shuffler = (arr,shuf) => {
        for (let j = 0; j<songsList.length; j++)
        shuffledSongs[j]=arr[shuf[j]]
        
        playList(shuffledSongs)
        console.log(shuffledSongs)
        }

        shuffler(songsList,index);
        return shuffledSongs;
}*/

var lastSong = null;
var selection = null;

function shuffleAudio() {
    audio.addEventListener("ended", function(e) {
        while(selection == lastSong){
            selection = Math.floor(Math.random() * songsList.length);
        }
        lastSong = selection;
        e.target.src = songsList[selection];
        e.target.play();
    });
} 

/*audio.addEventListener("ended", function() {
    currentSong++;
    if (currentSong == songsList.length){
        currentSong = 0
    }

    if(shuffleFlag == true)
    {
        // songsList[currentSong].classList.remove("current-song")    
        // songsList[currentSong].classList.add("current-song")
        audio.src = shuffledSongs[currentSong];
        playAudio();
    }else{
        // songsList[currentSong].classList.remove("current-song")
        // songsList[currentSong].classList.add("current-song")
        audio.src = songsList[currentSong];
        playAudio();
    }
    
});*/

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