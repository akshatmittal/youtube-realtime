YT.query = {
    newSearch: function (e) {
        console.log(e);
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        $.getJSON("https://counts.live/api/youtube-view-count/" + encodeURIComponent(e) + "/search", function (e) {
            if (!e.success || !e.data || e.data.length === 0) {
                alert("No results found!");
                return;
            }
            YT.updateManager.updateChannelID(e.data[0].id);
            YT.updateManager.updateCover(e.data[0].backdrop);
            YT.updateManager.updateName(e.data[0].name);
            YT.updateManager.updateProfile(e.data[0].picture);
            YT.urls.pushState(e.data[0].id);
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