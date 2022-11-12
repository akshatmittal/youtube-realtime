YT.query = {
    begin: function () {
        $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + encodeURIComponent(YT.live.vs1), function (f) {
            $.getJSON("https://mixerno.space/api/youtube-channel-counter/user/" + encodeURIComponent(YT.live.vs2), function (g) {
                YT.updateManager.updateCover(f.user[2].count, g.user[2].count);
                YT.updateManager.updateName(f.user[0].count, g.user[0].count);
                YT.updateManager.updateProfile(f.user[1].count, g.user[1].count);
            });
        });
    },
    bind: function () {

    }
};
