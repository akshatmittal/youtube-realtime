YT.live = {
  channelID: "",
  update: function () {
    YT.robloxApi.getGroupData(this.channelID)
      .then(function (groupData) {
        if (groupData) {
          YT.updateManager.updateSubscribers(groupData.memberCount);
          YT.updateManager.updateViews(0); // Groups don't have views
          YT.updateManager.updateVideos(0); // Groups don't have videos
        } else {
          YT.query.newSearch(YT.live.channelID);
        }
      })
      .catch(function (error) {
        console.error("Error updating group data:", error);
        YT.query.newSearch(YT.live.channelID);
      });
  },
  timer: null,
  start: function () {
    this.stop();
    this.timer = setInterval(function (e) {
      YT.live.update();
    }, 2000);
    YT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
