YT.pins = {
    url: "https://ytrt-store.akshatmittal.com/list.json",
    getPins: function () {
        $.getJSON(this.url, function (e) {
            $pn = $("#pinned_nav");
            $pn.html("");
            $pn.append($('<li class="nav-small-cap">FEATURED USERS</li>'));
            e.forEach(function (f) {
                if (new Date().getTime() > f.expires) return;
                $li = $("<li>");
                $a = $("<a>", {
                    class: "waves-effect waves-dark",
                    href: "#!/" + f.id
                });
                $i = $("<i>", {
                    class: "fa fa-user"
                });
                $a.append($i);
                $span = $("<span>", {
                    class: "hide-menu"
                }).text(f.name);
                $a.append($span);
                $li.append($a);
                $pn.append($li);
            })
            $pn.append($('<li><a class="waves-effect waves-dark" href="https://akshatmittal.bigcartel.com/product/youtube-realtime" target="_blank"><i class="fa fa-external-link-square"></i><span class="hide-menu">Your Channel Here</span></a></li>'))
        })
    }
}