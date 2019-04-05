YT.sharing = {
    youtube: function () {
        window.open("https://www.youtube.com/channel/" + YT.live.channelID);
    },
    facebook: function () {
        window.open("https://www.facebook.com/dialog/feed?app_id=1473140929606808&display=page&caption=" + YT.sharing.getText() + "&link=" + YT.sharing.getEncodedURL() + "&redirect_uri=" + encodeURIComponent(baseURL + "assets/close.html"));
    },
    twitter: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText() + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    compare: function () {
        $(".super-search,.dark-bg").fadeIn();
        $("#yt_searchvalue_m").focus();
    },
    getText: function () {
        return encodeURIComponent("Check out " + $("#yt_name").text() + "'s real time subscriber count on @YouTube!");
    },
    getEncodedURL: function () {
        return encodeURIComponent(YT.urls.getCurrent());
    },
    bind: function () {
        $("#yt_shareyt").on("click", this.youtube);
        $("#yt_sharetw").on("click", this.twitter);
        $("#yt_sharefb").on("click", this.facebook);
        $("#yt_compare").on("click", this.compare);
    }
};