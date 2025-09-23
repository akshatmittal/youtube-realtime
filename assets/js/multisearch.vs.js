YT.multisearch = {
YT.multisearch = {
  getResults: function (e) {
    // Use Roblox API to search for groups
    YT.robloxApi.searchGroups(e)
      .then(function (data) {
        $er = $("#results");
        $er.html("");
        if (data.data && data.data.length > 0) {
          data.data.forEach(function (group) {
            if (group.id == YT.live.vs1 || group.id == YT.live.vs2) return;
            // Get group details to have icon
            YT.robloxApi.getGroupData(group.id)
              .then(function (groupData) {
                $er.append(YT.multisearch.giveHtml(groupData.name, groupData.icon, group.id));
              })
              .catch(function (error) {
                console.error("Error fetching group details:", error);
                // Use basic data if detailed fetch fails
                $er.append(YT.multisearch.giveHtml(group.displayName || group.name, "assets/images/icon.png", group.id));
              });
          });
        }
      })
      .catch(function (error) {
        console.error("Error searching groups:", error);
        $("#results").html("");
      });
  },
  giveHtml: function (name, image, id) {
    $e = $("<div>", {
      class: "round align-self-center",
      style: "background: url('" + image + "');background-size:cover;",
    });
    $ee = $("<h3>", {
      class: "m-b-0 font-light",
    }).text(name);
    $f = $("<div>", {
      class: "m-l-10 align-self-center",
    }).append($ee);
    $g = $("<div>", {
      class: "d-flex flex-row",
    });
    $g.append($e).append($f);
    return $("<div>", {
      class: "card-block card m-b-15",
    })
      .append($g)
      .on("click", function () {
        YT.multisearch.changeChannel(id);
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
  changeChannel: function (e) {
    if (YT.sharing.changing == null) return;
    if (YT.sharing.changing == "vs1") {
      YT.urls.pushState(e, YT.live.vs2);
    } else {
      YT.urls.pushState(YT.live.vs1, e);
    }
    this.resetCompare();
  },
  bind: function () {
    $("#yt_comrest").on("click", this.resetCompare);
    $("#yt_search_m").on("submit", this.newSearch);
    $("#yt_searchbutton_m").on("click", this.newSearch);
  },
};
