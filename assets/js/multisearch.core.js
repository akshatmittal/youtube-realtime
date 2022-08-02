YT.multisearch = {
    getResults: function (e) {
        $.getJSON("https://api.subscribercounter.nl/api/youtube-subscriber-count/" + encodeURIComponent(e) + "/search", function (e) {
            $er = $("#results");
            $er.html("");
            e.data.forEach(function (f) {
                if (f.id == YT.live.channelID) return;
                $er.append(YT.multisearch.giveHtml(f.name, f.picture, f.id));
            })
        });
    },
    giveHtml: function (name, image, id) {
        $e = $("<div>", {
            class: "round align-self-center",
            style: "background: url('" + (image) + "');background-size:cover;"
        });
        $ee = $("<h3>", {
            class: "m-b-0 font-light"
        }).text(name);
        $f = $("<div>", {
            class: "m-l-10 align-self-center"
        }).append($ee);
        $g = $("<div>", {
            class: "d-flex flex-row"
        });
        $g.append($e).append($f);
        return $("<div>", {
            class: "card-block card m-b-15"
        }).append($g).on("click", function () {
            YT.multisearch.launchCompare(id);
        });
    },
    resetCompare: function () {
        $(".super-search,.dark-bg").fadeOut("400", function () {
            $("#results").html("");
            $("#yt_searchvalue_m").val("");
        });
    },
    newSearch: function (e) {
        e.preventDefault();
        YT.multisearch.getResults($("#yt_searchvalue_m").val());
    },
    launchCompare: function (e) {
        if (e == YT.live.channelID) return;
        window.open("/youtube-realtime/compare/#!/" + YT.live.channelID + "$$" + e);
        this.resetCompare();
    },
    bind: function () {
        $("#yt_comrest").on("click", this.resetCompare);
        $("#yt_search_m").on("submit", this.newSearch);
        $("#yt_searchbutton_m").on("click", this.newSearch);
    }
}
