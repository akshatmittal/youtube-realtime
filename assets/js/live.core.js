YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + this.channelID + "/live", function (e) {
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
        }, 2000);
        YT.live.update();
    },
    stop: function () {
        clearInterval(this.timer);
    }
};
