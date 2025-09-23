YT.query = {
  begin: function () {
    // Use Roblox API to get group data for both groups
    Promise.all([
      YT.robloxApi.getGroupData(YT.live.vs1),
      YT.robloxApi.getGroupData(YT.live.vs2)
    ]).then(([group1Data, group2Data]) => {
      // Update cover images, names, and profile images
      YT.updateManager.updateCover(
        group1Data.user[2].count, 
        group2Data.user[2].count
      );
      YT.updateManager.updateName(
        group1Data.user[0].count, 
        group2Data.user[0].count
      );
      YT.updateManager.updateProfile(
        group1Data.user[1].count, 
        group2Data.user[1].count
      );
    }).catch(error => {
      console.error("Error fetching group comparison data:", error);
    });
  },
  bind: function () {},
};
