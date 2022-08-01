YT.query = {
    begin: function () {
        $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + encodeURIComponent(YT.live.vs1) + "/data", function (f) {
            $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + encodeURIComponent(YT.live.vs2) + "/data", function (g) {
                YT.updateManager.updateCover(f.data.backdrop, g.data.backdrop);
                YT.updateManager.updateName(f.data.name, g.data.name);
                YT.updateManager.updateProfile(f.data.picture, g.data.picture);
            });
        });
    },
    bind: function () {

    }
};
