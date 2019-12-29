YT.urls = {
    onchange: function () {
        var q = location.hash.split("!/")[1];
        if (q) {
            YT.query.newSearch(location.hash.split("!/")[1]);
        } else {
            var coolGuys = ['UCBJycsmduvYEL83R_U4JriQ', 'UCtinbF-Q-fVthA0qrFQTgXQ', 'UCp0hYYBW6IMayGgR-WeoCvQ', 'UCBJycsmduvYEL83R_U4JriQ'];
            YT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
        }
    },
    pushState: function (e) {
        history.pushState(null, null, "#!/" + e);
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = e;
                this.page.url = baseURL + "#!/" + e;
            }
        });
        YT.query.newSearch(e);
    },
    getCurrent: function () {
        return baseURL + "#!/" + YT.live.channelID;
    }
};