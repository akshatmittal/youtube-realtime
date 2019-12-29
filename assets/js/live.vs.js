YT.live = {
    vs1: "",
    vs2: "",
    update: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + encodeURIComponent(YT.live.vs1 + "," + YT.live.vs2) + "&key=" + YT.keyManager.getKey(), function (e) {
            if (e.items[0].id == YT.live.vs1) {
                YT.updateManager.updateSubscribers(e.items[0].statistics.subscriberCount, e.items[1].statistics.subscriberCount);
            } else {
                YT.updateManager.updateSubscribers(e.items[1].statistics.subscriberCount, e.items[0].statistics.subscriberCount);
            }
        });
    },
    timer: null,
    setVS: function (e, f) {
        this.vs1 = e;
        this.vs2 = f;
        this.start();
    },
    start: function () {
        this.stop();
        YT.query.begin();
        this.timer = setInterval(function (e) {
            YT.live.update();
        }, 10000);
        YT.live.update();
    },
    stop: function () {
        clearInterval(this.timer);
    }
};