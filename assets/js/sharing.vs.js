YT.sharing = {
    changing: null,
    vs1: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText("vs1") + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    vs1yt: function () {
        window.open("https://www.youtube.com/channel/" + YT.live.vs1);
    },
    vs2: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText("vs2") + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    vs2yt: function () {
        window.open("https://www.youtube.com/channel/" + YT.live.vs2);
    },
    getText: function (e) {
        return encodeURIComponent("I support " + $("#yt_brand_" + e).text() + " in this subscriber count battle of " + $("#yt_brand_vs1").text() + " vs " + $("#yt_brand_vs2").text() + " on @YouTube!");
    },
    getEncodedURL: function () {
        return encodeURIComponent(baseURL + "compare/#!/" + YT.live.vs1 + "$$" + YT.live.vs2);
    },
    compare: function () {
        $(".super-search,.dark-bg").fadeIn();
        $("#yt_searchvalue_m").focus();
    },
    vs1change: function () {
        if (isCustomPage) {
            location.replace(baseURL + "compare/#!/" + YT.live.vs1 + "$$" + YT.live.vs2);
            return;
        }
        YT.sharing.changing = "vs1";
        YT.sharing.compare();
    },
    vs2change: function () {
        if (isCustomPage) {
            location.replace(baseURL + "compare/#!/" + YT.live.vs1 + "$$" + YT.live.vs2);
            return;
        }
        YT.sharing.changing = "vs2";
        YT.sharing.compare();
    },
    bind: function () {
        $("#yt_sharevs1").on("click", this.vs1);
        $("#yt_shareyt_vs1").on("click", this.vs1yt);
        $("#yt_compare_vs1").on("click", this.vs1change);

        $("#yt_sharevs2").on("click", this.vs2);
        $("#yt_shareyt_vs2").on("click", this.vs2yt);
        $("#yt_compare_vs2").on("click", this.vs2change);
    }
};