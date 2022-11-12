YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://mixerno.space/api/youtube-video-counter/user/" + this.channelID, function (e) {
            if (e) {
                YT.updateManager.updateViews(e.counts[2].count);
                YT.updateManager.updateLikes(e.counts[3].count);
                YT.updateManager.updateDislikes(e.counts[4].count);
                YT.updateManager.updateComments(e.counts[5].count);
            } else {
                YT.query.newSearch(YT.uploadedBY);
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
