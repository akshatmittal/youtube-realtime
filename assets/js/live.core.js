YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + this.channelID, function (e) {
            if (e) {
                YT.updateManager.updateSubscribers(e.counts[2].count);
                YT.updateManager.updateViews(e.counts[4].count);
                YT.updateManager.updateVideos(e.counts[5].count);
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
