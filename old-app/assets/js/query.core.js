YT.query = {
  newSearch: function (e) {
    if (e.trim() == YT.live.channelID || e.trim() == "") {
      return;
    }
    YT.live.stop();
    if (e.trim().substr(0, 2).toUpperCase() == "UC" && e.trim().length >= 24) {
      console.log(e);
      $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + encodeURIComponent(e), function (f) {
        if (!e) {
          alert("No results found!");
          location.href = baseURL;
          return;
        }
        YT.updateManager.updateChannelID(encodeURIComponent(e));
        YT.updateManager.updateCover(f.user[2].count);
        YT.updateManager.updateName(f.user[0].count);
        YT.updateManager.updateProfile(f.user[1].count);
        YT.urls.pushState(encodeURIComponent(e));
        YT.live.start();
      });
    } else {
      $.getJSON("https://mixerno.space/api/youtube-channel-counter/search/" + encodeURIComponent(e), function (e) {
        if (!e) {
          alert("No results found!");
          location.href = baseURL;
          return;
        }
        YT.query.newSearch(e.list[0][2]);
      });
    }
  },
  search: function (e) {
    e.preventDefault();
    YT.query.newSearch($("#yt_searchvalue").val());
    $("#yt_searchvalue").val("");
  },
  bind: function () {
    $("#yt_search").on("submit", this.search);
    $("#yt_searchbutton").on("click", this.search);
  },
};
