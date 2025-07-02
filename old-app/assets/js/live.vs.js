YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + YT.live.vs1, function (f) {
      $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + YT.live.vs2, function (g) {
        YT.updateManager.updateSubscribers(f.counts[2].count, g.counts[2].count);
      });
    });
  },
  timer: null,
  setVS: function (e, f) {
    this.vs1 = e;
    this.vs2 = f;
    this.start();
  },
  start: function () {
    this.stop();
    YT.query.begin();
    this.timer = setInterval(function (e) {
      YT.live.update();
    }, 10000);
    YT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
