YT.query = {
    newSearch: function (e) {
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        if (e.trim().substr(0, 2).toUpperCase() == "UC" && e.trim().length >= 24) {
            $.getJSON("https://counts.live/api/youtube-subscriber-count/" + encodeURIComponent(e) + "/data", function (e) {
                if (!e.success) {
                    alert("No results found!");
                    location.href = baseURL;
                    return;
                }
                YT.updateManager.updateChannelID(e.data.id);
                YT.updateManager.updateCover(e.data.backdrop);
                YT.updateManager.updateName(e.data.name);
                YT.updateManager.updateProfile(e.data.picture);
                YT.urls.pushState(e.data.id);
                YT.live.start();
            });
        } else {
            $.getJSON("https://counts.live/api/youtube-subscriber-count/" + encodeURIComponent(e) + "/search", function (e) {
                if (!e.success) {
                    alert("No results found!");
                    location.href = baseURL;
                    return;
                }
                YT.query.newSearch(e.data[0].id);
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
    }
};