console.log("Welcome to Musicfy");
//initialise
let songIndex=0;
let audioElement=new Audio('song.unknown');
let masterPlay=document.getElementById('masterplay');
let masterSongName=document.getElementById('masterSongName');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let songs=[{
    songName: "Kaun Tujhe",filePath:"song/1.mp3", coverPath:"song logo.jpg"
},
{
    songName:"Darasal",filePath:"song/2.mp3", coverPath:"darasal.jpeg"
},
{
    songName:"Luka Chupi",filePath:"song/3.mp3", coverPath:"luka.jpeg"
},
{
    songName:"Ankhon Se Batana",filePath:"song/4.mp3", coverPath:"ankhon.jpeg"
},
]
songItem.forEach((element,i)=> {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;  
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;    
});
// audioElement.play();
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
            element.classList.remove('fa-pause-circle');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex=parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
    })
    
});
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;

    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex-=1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;

    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
})