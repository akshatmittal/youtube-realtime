YT.sharing = {
    youtube: function () {
        window.open("https://www.youtube.com/watch?v=" + YT.live.channelID);
    },
    archive: function () {
        // window.open("https://promote.counts.live/youtube-view-count/" + YT.live.channelID);
    },
    cl: function () {
        // window.open("https://counts.live/youtube-view-count/" + YT.live.channelID);
    },
    twitter: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText() + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    compare: function () {
        $(".super-search,.dark-bg").fadeIn();
        $("#yt_searchvalue_m").focus();
    },
    getText: function () {
        return encodeURIComponent("Check out " + $("#yt_name").text() + "'s real time live view count on @YouTube!");
    },
    getEncodedURL: function () {
        return encodeURIComponent(YT.urls.getCurrent());
    },
    bind: function () {
        $("#yt_shareyt").on("click", this.youtube);
        $("#yt_sharetw").on("click", this.twitter);
        $("#yt_sharear").on("click", this.archive);
        $("#yt_sharear2").on("click", this.cl);
        $("#yt_compare").on("click", this.compare);
    }
};