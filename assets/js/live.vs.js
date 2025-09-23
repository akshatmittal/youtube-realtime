YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    // Use Roblox API to get group data for both groups
    Promise.all([
      YT.robloxApi.getGroupData(YT.live.vs1),
      YT.robloxApi.getGroupData(YT.live.vs2)
    ]).then(([group1Data, group2Data]) => {
      // Update subscriber counts for both groups (member counts)
      YT.updateManager.updateMembers(
        group1Data.memberCount, 
        group2Data.memberCount
      );
    }).catch(error => {
      console.error("Error updating group comparison data:", error);
    });
  },
  timer: null,
  setVS: function (e, f) {
    this.vs1 = e;
    this.vs2 = f;
    this.start();
  },
  start: function () {
    this.stop();
    YT.query.begin();
    this.timer = setInterval(function (e) {
      YT.live.update();
    }, 10000);
    YT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
