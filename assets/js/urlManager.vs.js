YT.urls = {
    onchange: function () {
        var q = location.hash.split("!/")[1];
        if (q) {
            var q = q.split("$$");
            if (q[0] > q[1]) {
                c = q[0];
                q[0] = q[1];
                q[1] = c;
            }
            YT.urls.pushState(q[0], q[1]);
        } else {
            YT.urls.pushState("UC-lHJZR3Gqxm24_Vd_AJ5Yw", "UCq-Fj5jknLsUf-MWSy4_brA");
        }
    },
    pushState: function (e, f) {
        if (e > f) {
            c = e;
            e = f;
            f = c;
        }
        history.pushState(null, null, "#!/" + e + "$$" + f);
        setTimeout(function () {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = YT.live.vs1 + "$$" + YT.live.vs2;
                    this.page.url = baseURL + "compare/#!/" + YT.live.vs1 + "$$" + YT.live.vs2;
                }
            });
        }, 500)
        YT.live.setVS(e, f)
    },
    getCurrent: function () {
        return baseURL + "compare/#!/" + YT.live.vs1 + "$$" + YT.live.vs2;
    }
};