YT.query = {
    newSearch: function (e) {
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        $.getJSON("https://mixerno.space/api/youtube-video-counter/search/" + encodeURIComponent(e), function (e) {
            if (!e.list || e.data.length === 0) {
                alert("No results found!");
                return;
            }
            YT.updateManager.updateChannelID(e.list[0][2]);
            YT.updateManager.updateCover(e.list[0][1]);
            YT.updateManager.updateName(e.list[0][0]);
            YT.updateManager.updateProfile(e.list[0][1]);
            YT.urls.pushState(e.list[0][2]);
            YT.live.start();
        });
    },
    search: function (e) {
        e.preventDefault();
        YT.query.newSearch($("#yt_searchvalue").val());
        $("#yt_searchvalue").val("")
    },
    bind: function () {
        $("#yt_search").on("submit", this.search);
        $("#yt_searchbutton").on("click", this.search);
    }
};
