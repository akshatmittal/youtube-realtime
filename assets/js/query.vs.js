YT.query = {
    begin: function () {
        $.getJSON("https://counts.live/api/youtube/" + encodeURIComponent(YT.live.vs1) + "/data", function (f) {
            $.getJSON("https://counts.live/api/youtube/" + encodeURIComponent(YT.live.vs2) + "/data", function (g) {
                YT.updateManager.updateCover(f.data.backdrop, g.data.backdrop);
                YT.updateManager.updateName(f.data.name, g.data.name);
                YT.updateManager.updateProfile(f.data.picture, g.data.picture);
            });
        });
    },
    bind: function () {

    }
};