YT.live = {
    vs1: "",
    vs2: "",
    update: function () {
        $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + YT.live.vs1 + "/live", function (f) {
            $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + YT.live.vs2 + "/live", function (g) {
                YT.updateManager.updateSubscribers(f.data.subscribers, g.data.subscribers);
            });
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
