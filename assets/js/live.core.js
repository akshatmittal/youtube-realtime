YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + this.channelID + "&key=" + YT.keyManager.getKey(), function (e) {
            if (e.pageInfo.totalResults > 0) {
                YT.updateManager.updateSubscribers(e.items[0].statistics.subscriberCount);
                YT.updateManager.updateViews(e.items[0].statistics.viewCount);
                YT.updateManager.updateVideos(e.items[0].statistics.videoCount);
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