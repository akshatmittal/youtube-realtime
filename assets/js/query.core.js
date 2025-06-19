YT.query = {
  newSearch(raw) {
    const term = raw.trim();
    if (!term) return;
    YT.live.stop();

    if (/^\d+$/.test(term)) {
      $.getJSON(`/api/groups/${term}`, info => {
        if (!info || !info.name) {
          alert("No group found with ID " + term);
          return location.href = baseURL;
        }

        YT.updateManager.updateGroupID(term);
        YT.updateManager.updateName(info.name);
        YT.updateManager.updateMembers(info.memberCount);
        YT.updateManager.updateOwner(info.owner.username);

        YT.urls.pushState(term);
        YT.live.start();
      });
    }
    else {
      YT.groupSearch.getResults(term);
    }
  },

  search(e) {
    e.preventDefault();
    const val = $("#yt_searchvalue").val();
    this.newSearch(val);
    $("#yt_searchvalue").val("");
  },

  bind() {
    $("#yt_search").on("submit", e => this.search(e));
    $("#yt_searchbutton").on("click", e => this.search(e));
  }
};

YT.query.bind();
