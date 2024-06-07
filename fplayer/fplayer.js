var bgm = document.getElementById("player_audio");
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