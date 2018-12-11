var baseURL = "https://akshatmittal.com/youtube-realtime/";
if (typeof isEmbed == 'undefined') isEmbed = 0;
if (window.location.hostname.indexOf("local.akshatmittal.com") < 0) {
    if (window.location.protocol != "https:") window.location.replace("https:" + window.location.href.substring(window.location.protocol.length));
    if (location.hostname.indexOf("akshatmittal.com") == -1) window.location.replace(baseURL + location.hash);
    if ((window.top !== window.self) && isEmbed == 0) window.top.location.replace(window.self.location.href);
    if ((window.top == window.self) && isEmbed) window.top.location.replace(baseURL + location.hash);
}
Array.prototype.shuffle = function () {
    var i = this.length,
        j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}
var YT = {};
YT.keyManager = {
    keys: ["AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8", "AIzaSyBSyBp1KHjjXox6e9FBPoOCE1mbLvVUzUM", "AIzaSyDeLLOyrp1yCZCOmVXg3u8Jxtasre2NxFA", "AIzaSyDFXBcpYskzYNTOZEgq133xXP5GUH4Ct3k", "AIzaSyBRnIik08vLUsSyJs_M_A7eMRgxaBMRpdU", "AIzaSyD_HMEbLyCOVPB53JBFRS5--58sAwhY2Ic", "AIzaSyA50UgQA00oM7ztJp97nWC7XM9nggeGP8g", "AIzaSyAwOwvwAGbUF2xTmsJY7Loyrg8qE-0syQE", "AIzaSyDxkDsPPEgePGoyZct62M0MdYDBRzuudKY", "AIzaSyA1v68XzPdA9rfrsPUFhgZ500_uWdf2A8I", "AIzaSyCb9zxTIuGGEBIJHLfj8lOb4k4U0jWstGg", "AIzaSyBgiHBx5C-rkWzY0w2c7SWUC-RHyRpLv7E", "AIzaSyDi5W8BNEZRYCkiuV-rSLWzlfDOIwEitjw", "AIzaSyAfdtlCGsypBhW1Fzs3zMmYcUDgkNBTDV8", "AIzaSyBraMJy98X7r9-jPRznAaT1g9cdAAFQyFE", "AIzaSyCg_tlHelOnRsDjfdv-3Kntb3GXaYEXzk4", "AIzaSyAI0sPgCpm_KjEL7u5hI3m0pin0mBZbnLs", "AIzaSyDqipNMKLaN_ZVbZ-_f40YFp_vUTmhqMxU", "AIzaSyCzF4_POQGk2U_0TiaGF0ZqDMHIsqGA7es", "AIzaSyCgCBendo5K3kPNEL9tO_TI4G8WAdp_hnM", "AIzaSyAhXueAQP-HfZdLtoY9Tlxqt9zzc7yTrTg", "AIzaSyBUnyRp5Ny6HKeRUx8nGGAuL6r8BlUsqIU"],
    keyIndex: 0,
    getKey: function () {
        this.keyIndex = (this.keyIndex + 1) % (this.keys.length);
        return this.keys[this.keyIndex];
    },
    shuffleKeys: function () {
        this.keys.shuffle();
    }
}
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
        YT.query.begin();
    },
    updateName: function (e, f) {
        $("#yt_name_vs1").text(e);
        $("#yt_name_vs2").text(f);
        $("#yt_brand_vs1").text(e);
        $("#yt_brand_vs2").text(f);
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
        $("#yt_diff").text(Math.abs(parseInt(e) - parseInt(f)))
    }
};
YT.query = {
    getCover: function (e, f) {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=" + encodeURIComponent(e) + "," + encodeURIComponent(f) + "&key=" + YT.keyManager.getKey(), function (e) {
            if(e.items[0].id == vs1) {
                YT.updateManager.updateCover(e.items[0].brandingSettings.image.bannerImageUrl, e.items[1].brandingSettings.image.bannerImageUrl);    
            } else {
                YT.updateManager.updateCover(e.items[1].brandingSettings.image.bannerImageUrl, e.items[0].brandingSettings.image.bannerImageUrl);    
            }    
        
        });
    },
    begin: function() {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + encodeURIComponent(vs1) + "," + encodeURIComponent(vs2) + "&key=" + YT.keyManager.getKey(), function (e) {
            YT.live.start();
            if(e.items[0].id == vs1) {
                YT.query.getCover(e.items[0].id, e.items[1].id);
                YT.updateManager.updateName(e.items[0].snippet.title, e.items[1].snippet.title);
                YT.updateManager.updateProfile(e.items[0].snippet.thumbnails.high.url ? e.items[0].snippet.thumbnails.high.url : e.items[0].snippet.thumbnails.default.url, e.items[1].snippet.thumbnails.high.url ? e.items[1].snippet.thumbnails.high.url : e.items[1].snippet.thumbnails.default.url);
            } else {
                YT.query.getCover(e.items[1].id, e.items[0].id);
                YT.updateManager.updateName(e.items[1].snippet.title, e.items[0].snippet.title);
                YT.updateManager.updateProfile(e.items[1].snippet.thumbnails.high.url ? e.items[1].snippet.thumbnails.high.url : e.items[1].snippet.thumbnails.default.url, e.items[0].snippet.thumbnails.high.url ? e.items[0].snippet.thumbnails.high.url : e.items[0].snippet.thumbnails.default.url);
            }
        });
    }
};
YT.live = {
    channelID: "",
    update: function () {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + encodeURIComponent(vs1 + "," + vs2) + "&key=" + YT.keyManager.getKey(), function (e) {
            if(e.items[0].id == vs1) {
                YT.updateManager.updateSubscribers(e.items[0].statistics.subscriberCount, e.items[1].statistics.subscriberCount);    
            } else {
                YT.updateManager.updateSubscribers(e.items[1].statistics.subscriberCount, e.items[0].statistics.subscriberCount);    
            }
        });
    },
    timer: null,
    start: function () {
        this.timer = setInterval(function (e) {
            YT.live.update();
        }, 1000);
    },
    stop: function () {
        clearInterval(this.timer);
    }
};
YT.sharing = {
    youtube: function () {
        window.open("https://www.youtube.com/channel/" + YT.live.channelID);
    },
    facebook: function () {
        window.open("https://www.facebook.com/dialog/feed?app_id=1473140929606808&display=page&caption=" + YT.sharing.getText() + "&link=" + YT.sharing.getEncodedURL() + "&redirect_uri=" + encodeURIComponent(baseURL + "assets/close.html"));
    },
    vs1: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText("vs1") + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    vs2: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText("vs2") + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    getText: function (e) {
        return encodeURIComponent("I support " + $("#yt_brand_" + e).text() + " in this subscriber count battle of @PewDiePie vs @TSeries on @YouTube!");
    },
    getEncodedURL: function () {
        return encodeURIComponent(baseURL + "pewdiepie-vs-tseries/");
    },
    bind: function () {
        $("#yt_sharevs1").on("click", this.vs1);
        $("#yt_sharevs2").on("click", this.vs2);
    }
};
$(function () {
    YT.updateManager.prepare();
    YT.sharing.bind();
    // Meta
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-50190232-6', 'auto');
    ga('send', 'pageview', {
      'page': location.pathname + location.search + location.hash,
      'title': document.title
    });
});