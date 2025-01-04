var songNum=0
var audio = new Audio(song[songNum].song)
$(".title").text(song[songNum].name)
$(".artist").text(song[songNum].artist)
$("img").attr('src',song[songNum].img)
$("input").val(0)

// console.log(song[songNum+1].img)

$(audio).on("loadedmetadata", function() {
    console.log(audio.duration);
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
    $("input").val(0);
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
    $("input").val(0);
    audio.currentTime = 0;
    // playPause()
    audio.play()
}

$("input").on('click',function(){
    audio.currentTime = ($("input").val()*(audio.duration/100))
})

$(audio).on("timeupdate",function(){
    if (!isNaN(audio.duration)) {
        var value = (audio.currentTime / audio.duration) * 100;
        $("input").val(value);
    }
})

$(".play").on("click",playPause)

$(".next").on("click",next)
$(".prev").on("click",prev)

