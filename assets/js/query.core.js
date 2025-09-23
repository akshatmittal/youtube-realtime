YT.query = {
  newSearch: function (raw) {
    const term = raw.trim();
    if (term === YT.live.channelID || term === "") {
      return;
    }
    YT.live.stop();

    if (/^\d+$/.test(term)) {
      YT.robloxApi.getGroupData(term)
        .then(function (groupData) {
          if (!groupData || !groupData.user) {
            alert("No group found with ID "" + term + """);
            location.href = baseURL;
            return;
          }
          YT.updateManager.updateChannelID(term);
          YT.updateManager.updateCover(groupData.user[2].count);
          YT.updateManager.updateName(groupData.user[0].count);
          YT.updateManager.updateProfile(groupData.user[1].count);
          YT.updateManager.updateSubscribers(groupData.memberCount);
          YT.urls.pushState(term);
          YT.live.start();
        })
        .catch(function (error) {
          console.error("Error fetching group data:", error);
          alert("No group found with ID "" + term + """);
          location.href = baseURL;
        });
    }
    else {
      YT.robloxApi.searchGroups(term)
        .then(function (res) {
          if (!res || !res.data || !res.data.length) {
            alert("No groups found matching "" + term + """);
            location.href = baseURL;
            return;
          }
          const foundId = res.data[0].id.toString();
          YT.query.newSearch(foundId);
        })
        .catch(function (error) {
          console.error("Error searching groups:", error);
          alert("No groups found matching "" + term + """);
          location.href = baseURL;
        });
    }
  },

  search: function (e) {
    e.preventDefault();
    YT.query.newSearch($("#yt_searchvalue").val());
    $("#yt_searchvalue").val("");
  },

  bind: function () {
    $("#yt_search").on("submit", this.search);
    $("#yt_searchbutton").on("click", this.search);
  },
};

YT.query.bind();