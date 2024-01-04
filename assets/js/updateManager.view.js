YT.updateManager = {
  prepare: function (e) {
    var odEl = ["#yt_views", "#yt_likes", "#yt_dislikes", "#yt_comments"];
    odEl.forEach(function (e) {
      new Odometer({
        el: document.querySelector(e),
        value: "0",
        format: "(,ddd)",
        theme: "minimal",
      });
    });
  },
  updateName: function (e) {
    $(".yt_name").html(e);
  },
  updateProfile: function (e) {
    $("#yt_profile").attr("src", e);
  },
  updateCover: function (e) {
    $("#yt_cover").attr("src", e);
  },
  updateViews: function (e) {
    $("#yt_views").text(e);
  },
  updateLikes: function (e) {
    $("#yt_likes").text(e);
  },
  updateDislikes: function (e) {
    $("#yt_dislikes").text(e);
  },
  updateComments: function (e) {
    $("#yt_comments").text(e);
  },
  updateChannelID: function (e) {
    YT.live.channelID = e;
    $("#yt_shareurl").val(YT.urls.getCurrent());
    $("#yt_embed_small").val(
      '<iframe style="height:80px;width:300px;border:none;" frameborder="0" src="https://counts.live/embeds/youtube-view-count/' +
        YT.live.channelID +
        '/small" />',
    );
    $("#yt_embed_large").val(
      '<iframe style="height:350px;width:320px;border:none;" frameborder="0" src="https://counts.live/embeds/youtube-view-count/' +
        YT.live.channelID +
        '/large" />',
    );
  },
};
