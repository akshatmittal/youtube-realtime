YT.urls = {
  onchange: function () {
    var q = location.hash.split("!/")[1];
    if (q) {
      YT.query.newSearch(location.hash.split("!/")[1]);
    } else {
      var coolGuys = ["9bZkp7q19f0", "YQHsXMglC9A", "60ItHLz5WEA", "pk7ESz6vtyA", "gwMa6gpoE9I"];
      YT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
    }
  },
  pushState: function (e) {
    history.pushState(null, null, "#!/" + e);
    DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = e;
        this.page.url = baseURL + "live-view-count/#!/" + e;
      },
    });
    YT.query.newSearch(e);
  },
  getCurrent: function () {
    return baseURL + "live-view-count/#!/" + YT.live.channelID;
  },
};
