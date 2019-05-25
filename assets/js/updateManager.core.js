YT.updateManager = {
    prepare: function (e) {
        var odEl = ["#yt_subs", "#yt_views", "#yt_videos"];
        odEl.forEach(function (e) {
            new Odometer({
                el: document.querySelector(e),
                value: "0",
                format: '(,ddd)',
                theme: 'minimal'
            });
        })
    },
    updateName: function (e) {
        $(".yt_name").text(e);
    },
    updateProfile: function (e) {
        $("#yt_profile").attr("src", e);
    },
    updateCover: function (e) {
        $("#yt_cover").attr("src", e);
    },
    updateSubscribers: function (e) {
        $("#yt_subs").text(e);
    },
    updateViews: function (e) {
        $("#yt_views").text(e);
    },
    updateVideos: function (e) {
        $("#yt_videos").text(e);
    },
    updateChannelID: function (e) {
        YT.live.channelID = e;
        $("#yt_shareurl").val(YT.urls.getCurrent());
    }
};