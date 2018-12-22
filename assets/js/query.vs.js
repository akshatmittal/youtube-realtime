YT.query = {
    getCover: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=" + encodeURIComponent(YT.live.vs1) + "," + encodeURIComponent(YT.live.vs2) + "&key=" + YT.keyManager.getKey(), function (e) {
            if (e.items[0].id == YT.live.vs1) {
                YT.updateManager.updateCover(e.items[0].brandingSettings.image.bannerImageUrl, e.items[1].brandingSettings.image.bannerImageUrl);
            } else {
                YT.updateManager.updateCover(e.items[1].brandingSettings.image.bannerImageUrl, e.items[0].brandingSettings.image.bannerImageUrl);
            }
        });
    },
    begin: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + encodeURIComponent(YT.live.vs1) + "," + encodeURIComponent(YT.live.vs2) + "&key=" + YT.keyManager.getKey(), function (e) {
            if (e.items[0].id == YT.live.vs1) {
                YT.query.getCover(e.items[0].id, e.items[1].id);
                YT.updateManager.updateName(e.items[0].snippet.title, e.items[1].snippet.title);
                YT.updateManager.updateProfile(e.items[0].snippet.thumbnails.high.url ? e.items[0].snippet.thumbnails.high.url : e.items[0].snippet.thumbnails.default.url, e.items[1].snippet.thumbnails.high.url ? e.items[1].snippet.thumbnails.high.url : e.items[1].snippet.thumbnails.default.url);
            } else {
                YT.query.getCover(e.items[1].id, e.items[0].id);
                YT.updateManager.updateName(e.items[1].snippet.title, e.items[0].snippet.title);
                YT.updateManager.updateProfile(e.items[1].snippet.thumbnails.high.url ? e.items[1].snippet.thumbnails.high.url : e.items[1].snippet.thumbnails.default.url, e.items[0].snippet.thumbnails.high.url ? e.items[0].snippet.thumbnails.high.url : e.items[0].snippet.thumbnails.default.url);
            }
        });
    },
    bind: function () {

    }
};