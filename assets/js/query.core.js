YT.query = {
  newSearch: function (raw) {
    const term = raw.trim();
    if (term === YT.live.channelID || term === "") {
      return;
    }
    YT.live.stop();

    if (/^\d+$/.test(term)) {
      $.getJSON(
        "https://mixerno.space/api/roblox-group-counter/user/" 
          + encodeURIComponent(term),
        function (f) {
          if (!f || !f.user) {
            alert("No group found with ID “" + term + "”");
            location.href = baseURL;
            return;
          }
          YT.updateManager.updateChannelID(term);
          YT.updateManager.updateCover(f.user[2].count);
          YT.updateManager.updateName(f.user[0].count);
          YT.updateManager.updateProfile(f.user[1].count);
          YT.urls.pushState(term);
          YT.live.start();
        }
      );
    }
    else {
      $.getJSON(
        "https://mixerno.space/api/roblox-group-counter/search/" 
          + encodeURIComponent(term),
        function (res) {
          if (!res || !res.list || !res.list.length) {
            alert("No groups found matching “" + term + "”");
            location.href = baseURL;
            return;
          }
          const foundId = res.list[0][0].toString();
          YT.query.newSearch(foundId);
        }
      );
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

YT.query.bind();
