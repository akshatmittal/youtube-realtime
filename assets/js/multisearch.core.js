YT.groupSearch = {
YT.groupSearch = {
  getResults(query) {
    YT.robloxApi.searchGroups(query)
      .then(data => {
        $("#results").empty();
        (data.data || []).forEach(g => this.fetchDetails(g.id));
      })
      .catch(error => {
        console.error("Error searching groups:", error);
        $("#results").empty();
      });
  },

  fetchDetails(groupId) {
    YT.robloxApi.getGroupData(groupId)
      .then(groupData => {
        $("#results").append(
          YT.groupSearch.makeHtml(groupData.name, groupData.icon, groupId)
        );
      })
      .catch(error => {
        console.error("Error fetching group details:", error);
      });
  },

  makeHtml(name, imageUrl, id) {
    const $icon = $("<div>", {
      class: "round align-self-center",
      style: `background:url('${imageUrl}') center/cover`
    });
    const $label = $("<h3>", { class: "m-b-0 font-light" }).text(name);
    const $info = $("<div>", { class: "m-l-10 align-self-center" })
      .append($label);
    return $("<div>", { class: "card-block card m-b-15" })
      .append($("<div>", { class: "d-flex flex-row" })
        .append($icon).append($info)
      )
      .on("click", () => {
        window.open(`/group/${id}`);
        this.reset();
      });
  },

  reset() {
    $(".super-search,.dark-bg").fadeOut(400, () => {
      $("#results").empty();
      $("#yt_searchvalue_m").val("");
    });
  },

  init() {
    $("#yt_comrest").on("click", this.reset);
    $("#yt_search_m, #yt_searchbutton_m")
      .on("submit click", e => {
        e.preventDefault();
        this.getResults($("#yt_searchvalue_m").val());
      });
  }
};

YT.groupSearch.init();
