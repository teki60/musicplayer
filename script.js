var songNum=0
var audio = new Audio(song[songNum].song)
$(".title").text(song[songNum].name)
$(".artist").text(song[songNum].artist)
$("img").attr('src',song[songNum].img)
$(".durationControl").val(0)

// console.log(song[songNum+1].img)

$(audio).on("loadedmetadata", function() {
    console.log(audio.duration);
    $(".totalDuration").text(`0${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)}`)
});

function playPause(){
    if($(".play").hasClass("fa-play")){
        $(".play").removeClass("fa-play").addClass("fa-pause")
        audio.play()
    }
    else{
        $(".play").removeClass("fa-pause").addClass("fa-play")
        audio.pause()
    }
}

function prev(){
    if($(".play").hasClass("fa-play")){
        $(".play").removeClass("fa-play").addClass("fa-pause")
    }
    if(songNum===0){
        songNum=song.length-1
    }
    else{
        songNum-=1
    }
    $(".title").text(song[songNum].name)
    $("img").attr('src',song[songNum].img)
    $(".artist").text(song[songNum].artist)
    audio.src = song[songNum].song
    $(".durationControl").val(0);
    audio.currentTime = 0;
    // playPause()
    audio.play()
}


function next(){
    if($(".play").hasClass("fa-play")){
        $(".play").removeClass("fa-play").addClass("fa-pause")
    }
    if(songNum!==song.length-1){
        songNum+=1
    }
    else{
        songNum=0
    }
    $(".title").text(song[songNum].name)
    $("img").attr('src',song[songNum].img)
    $(".artist").text(song[songNum].artist)
    audio.src = song[songNum].song
    $(".durationControl").val(0);
    audio.currentTime = 0;
    // playPause()
    audio.play()
}

$(".durationControl").on('input',function(){
    audio.currentTime = ($(".durationControl").val()*(audio.duration/100))
})

$(audio).on("timeupdate",function(){
    if (!isNaN(audio.duration)) {
        var value = (audio.currentTime / audio.duration) * 100;
        $(".durationControl").val(value);
        if(Math.floor(audio.currentTime/60)<10 && Math.floor(audio.currentTime%60)<10){
        $(".currentTime").text(`0${Math.floor(audio.currentTime/60)}:0${Math.floor(audio.currentTime%60)}`)
        }
        else if(Math.floor(audio.currentTime/60)<10 && Math.floor(audio.currentTime%60)>=10 ){
        $(".currentTime").text(`0${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)}`)
        }
        else if(Math.floor(audio.currentTime/60)>=10 && Math.floor(audio.currentTime%60)<10 ){
            $(".currentTime").text(`${Math.floor(audio.currentTime/60)}:0${Math.floor(audio.currentTime%60)}`)
        }
        else{
            $(".currentTime").text(`${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)}`)
        }
    }
})

$(".volumeControl").on("input",function(){
    audio.volume = $(".volumeControl").val()/100
})

$(".play").on("click",playPause)
$(".next").on("click",next)
$(".prev").on("click",prev)

