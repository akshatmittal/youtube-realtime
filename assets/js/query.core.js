YT.query = {
    newSearch: function (e) {
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        if (e.trim().substr(0, 2).toUpperCase() == "UC" && e.trim().length >= 24) {
            $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + encodeURIComponent(e) + "&key=" + YT.keyManager.getKey(), function (e) {
                if (e.pageInfo.totalResults < 1) {
                    alert("No results found!");
                    location.href = baseURL;
                    return;
                }
                var gsnippet = e.items[0];
                YT.updateManager.updateChannelID(gsnippet.id);
                YT.query.getCover(gsnippet.id);
                YT.updateManager.updateName(gsnippet.snippet.title);
                YT.updateManager.updateProfile(gsnippet.snippet.thumbnails.high.url ? gsnippet.snippet.thumbnails.high.url : gsnippet.snippet.thumbnails.default.url);
                YT.urls.pushState(gsnippet.id);
                YT.live.start();
            });
        } else {
            $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(e) + "&type=channel&maxResults=1&key=" + YT.keyManager.getKey(), function (e) {
                if (e.pageInfo.totalResults < 1) {
                    alert("No results found!");
                    location.href = baseURL;
                    return;
                }
                var snippet = e.items[0].snippet;
                YT.updateManager.updateChannelID(snippet.channelId);
                YT.query.getCover(snippet.channelId);
                YT.updateManager.updateName(snippet.channelTitle);
                YT.updateManager.updateProfile(snippet.thumbnails.high.url ? snippet.thumbnails.high.url : snippet.thumbnails.default.url);
                YT.urls.pushState(snippet.channelId);
                YT.live.start();
            });
        }
    },
    getCover: function (e) {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=" + encodeURIComponent(e) + "&key=" + YT.keyManager.getKey(), function (e) {
            YT.updateManager.updateCover(e.items[0].brandingSettings.image.bannerImageUrl);
        });
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