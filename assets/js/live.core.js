YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://counts.live/api/youtube/" + this.channelID + "/live", function (e) {
            if (e.success) {
                YT.updateManager.updateSubscribers(e.data.subscribers);
                YT.updateManager.updateViews(e.data.views);
                YT.updateManager.updateVideos(e.data.videos);
            } else {
                YT.query.newSearch(YT.live.channelID);
            }
        });
    },
    timer: null,
    start: function () {
        this.stop();
        this.timer = setInterval(function (e) {
            YT.live.update();
        }, 10000);
        YT.live.update();
    },
    stop: function () {
        clearInterval(this.timer);
    }
};