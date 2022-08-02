YT.pins = {
    url: "https://promote.counts.live/api/get",
    getPins: function () {
        // $.getJSON(this.url, function (e) {
        //     $pn = $("#pinned_nav");
        //     $pn.html("");
        //     $pn.append($('<li class="nav-small-cap">FEATURED VIDEOS</li>'));
        //     var users = e.users.filter(e => e.service === "youtube-view-count");

        //     $.when.apply(null, users.map(e => $.getJSON("https://api.subscribercounter.nl/api/" + e.service + "/" + e.id + "/data"))).done(function () {
        //         for (var x in arguments) {
        //             var f = arguments[x];
        //             if (users.length > 1) {
        //                 f = f[0];
        //             }
        //             if (!f.success) continue;
        //             $li = $("<li>");
        //             $a = $("<a>", {
        //                 class: "waves-effect waves-dark",
        //                 href: "#!/" + f.data.lv_identifier
        //             });
        //             $i = $("<i>", {
        //                 class: "fa fa-user"
        //             });
        //             $a.append($i);
        //             $span = $("<span>", {
        //                 class: "hide-menu"
        //             }).text(f.data.name);
        //             $a.append($span);
        //             $li.append($a);
        //             $pn.append($li);
        //         }
        //         $pn.append($('<li><a class="waves-effect waves-dark" href="https://promote.counts.live" target="_blank"><i class="fa fa-link"></i><span class="hide-menu">Your Video Here</span></a></li>'))
        //     });
        // })
    }
}
