YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + this.channelID + "&key=" + YT.keyManager.getKey(), function (e) {
            if(e.pageInfo.totalResults > 0) {
                YT.updateManager.updateSubscribers(e.items[0].statistics.subscriberCount);
            } else {
                YT.query.newSearch(YT.live.channelID);
            }
        });
    },
    timer: null,
    start: function () {
        this.timer = setInterval(function (e) {
            YT.live.update();
        }, 1000);
    },
    stop: function () {
        clearInterval(this.timer);
    }
};