YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://counts.live/api/youtube-view-count/" + this.channelID + "/live", function (e) {
            if (e.success) {
                YT.updateManager.updateViews(e.data.views);
                YT.updateManager.updateLikes(e.data.likes);
                YT.updateManager.updateDislikes(e.data.dislikes);
                YT.updateManager.updateComments(e.data.comments);
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