YT.updateManager = {
    prepare: function (e) {
        var odEl = ["#yt_subs_vs1", "#yt_subs_vs2", "#yt_diff"];
        odEl.forEach(function (e) {
            new Odometer({
                el: document.querySelector(e),
                value: "0",
                format: '(,ddd)',
                theme: 'minimal'
            });
        });
    },
    updateName: function (e, f) {
        $(".vs1_name").text(e);
        $(".vs2_name").text(f);
    },
    updateProfile: function (e, f) {
        $("#yt_profile_vs1").attr("src", e);
        $("#yt_profile_vs2").attr("src", f);
    },
    updateCover: function (e, f) {
        $("#yt_cover_vs1").attr("src", e);
        $("#yt_cover_vs2").attr("src", f);
    },
    updateSubscribers: function (e, f) {
        $("#yt_subs_vs1").text(e);
        $("#yt_subs_vs2").text(f);
        $("#yt_diff").text(Math.abs(parseInt(e) - parseInt(f)));
        if (parseInt(e) - parseInt(f) > 0) {
            $(document.body).addClass("leading-left").removeClass("leading-right");
        } else {
            $(document.body).addClass("leading-right").removeClass("leading-left");
        }
    }
};