YT.query = {
  newSearch: function (e) {
    const term = e.trim();
    if (term === YT.live.channelID || term === "") {
      return;
    }
    YT.live.stop();

    if (term.substr(0, 2).toUpperCase() === "UC" && term.length >= 24) {
      console.log(term);
      $.getJSON(
        "https://mixerno.space/api/roblox-group-counter/user/" 
          + encodeURIComponent(term),
        function (f) {
          if (!f) {
            alert("No results found!");
            location.href = baseURL;
            return;
          }
          YT.updateManager.updateChannelID(encodeURIComponent(term));
          YT.updateManager.updateCover(f.user[2].count);
          YT.updateManager.updateName(f.user[0].count);
          YT.updateManager.updateProfile(f.user[1].count);
          YT.urls.pushState(encodeURIComponent(term));
          YT.live.start();
        }
      );
    }
    else {
      const proxiedUrl =
        "https://corsproxy.io/?" +
        encodeURIComponent(
          "https://groups.roblox.com/v1/groups/search"
            + "?keyword=" + encodeURIComponent(term)
            + "&limit=1"
        );

      $.getJSON(proxiedUrl, function (resp) {
        const list = resp && resp.data;
        if (!list || !list.length) {
          alert("No groups found matching “" + term + "”");
          location.href = baseURL;
          return;
        }
        YT.query.newSearch(list[0].id.toString());
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

YT.query.bind();
