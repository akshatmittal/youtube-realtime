function injectJs(e, id) {
  var t = document.createElement("script");
  t.type = "text/javascript";
  t.async = !0;
  t.src = e;
  if (id) {
    t.id = id;
  }
  (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t);
}
$(window).bind("popstate", YT.urls ? YT.urls.onchange : false);
$(function () {
  YT.updateManager.prepare();
  YT.sharing.bind();
  YT.multisearch.bind();
  YT.query.bind();
  YT.pins && YT.pins.getPins();
  YT.urls && YT.urls.onchange();
  // Meta
  (adsbygoogle = window.adsbygoogle || []).push({});
  (adsbygoogle = window.adsbygoogle || []).push({});
  (adsbygoogle = window.adsbygoogle || []).push({});
  injectJs("https://platform.twitter.com/widgets.js");
});
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-50190232-6", "auto");
ga("send", "pageview", {
  page: location.pathname + location.search + location.hash,
  title: document.title,
});
var disqus_config = function () {
  this.page.url = "";
  this.page.identifier = "";
};
