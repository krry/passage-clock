let BackTube = require('back-tube');

function wireBackTube() {
  return new BackTube(document.querySelector('body'), {
    videoId: 'KT5MaD-ViOY',
    playerSettings: {
      volume:         0, // 0 - 100
      autohide:       0, // autohide controls
      autoplay:       1, // autoplay on load
      color:          'white', // red, white
      controls:       0, // show control UI
      disablekb:      1, // enable/disable keyboard control
      enablejsapi:    1,
      fs:             0, // display fullscreen button
      hl:             null, // interface language
      iv_load_policy: 3,
      loop:           1, // loop video flag (doesn't work properly)
      modestbranding: 1, // show/hide youtube logo
      playsinline:    0,
      rel:            0, // shows relative videos
      showinfo:       0,
      start:          0, // set beginning of the video
      end:            0, // set end of the video
      quality:        'hd1080'
    }
  });
}

function wireVideoBkgd () {
  let vid = document.getElementById('bkgd_vid');
  let videoPauser = document.querySelector('#video_pauser');

  if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    videoPauser.innerHTML = "Video paused";
  }

  function vidFade() {
    vid.classList.add("stopfade");
  }

  vid.addEventListener('ended', function()
  {
    // only functional if "loop" is removed 
    vid.pause();
    // to capture IE10
    vidFade();
  }); 


  videoPauser.addEventListener("click", function() {
    vid.classList.toggle("stopfade");
    if (vid.paused) {
      vid.play();
      videoPauser.innerHTML = "Pause video";
    } else {
      vid.pause();
      videoPauser.innerHTML = "Video paused";
    }
  })
}

export default {
  init: wireVideoBkgd,
  backTube: wireBackTube
};
