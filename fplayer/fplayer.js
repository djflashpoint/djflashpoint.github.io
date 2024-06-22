/* var bgm = document.getElementById("player_audio");
function bgmPlay() {
  bgm.play();
  $(".play").addClass("active");
  $(".cog-img").addClass("rotating");
  $(".stop").removeClass("active");
}
function bgmStop() {
  bgm.pause();
  bgm.currentTime = 0;
  $(".play").removeClass("active");
  $(".stop").addClass("active");
  $(".cog-img").removeClass("rotating");
} */


  var bgm = document.getElementById("player_audio");
    function srcget() {
      var audiosrc = $('#myInput').val();
      $(bgm).attr('src', audiosrc);
    }
    function loadsrc() {
      var station = $('#stations').val();
      $(bgm).attr('src', station);
    }
    function bgmPlay() {
      bgm.play();
      $(".play").addClass("active");
      $(".cog-img").addClass("rotating");
      $(".stop").removeClass("active");
    }
    function bgmStop() {
      bgm.pause();
      bgm.currentTime = 0;
      $(".play").removeClass("active");
      $(".stop").addClass("active");
      $(".cog-img").removeClass("rotating");
    }
    

    
    
const mutag = window.mutag;
mutag.fetch(station).then((tags) => {console.log(tags);});