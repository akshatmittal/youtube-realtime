var coolGuys = ['PewDiePie','Smosh','MarquesBrownlee','YouTube','TaylorSwiftVEVO','EminemVEVO','BuzzFeedVideo','MileyCyrusVEVO']; // Sorry for the last one.
var username = coolGuys[Math.floor(Math.random()*coolGuys.length)];

var getText = function (url, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if(request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	};
	request.open('GET', url);
	request.send();
}
var update = {};
update.isNameSet = 0;
update.name = function() {
	if(this.isNameSet)
		return;
	var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20where%20url%3D%22https%3A%2F%2Fwww.youtube.com%2Fuser%2F"+username+"%2Fabout%22%20%0AAND%20xpath%3D'%2F%2F*%5B%40class%3D%22qualified-channel-title-text%22%5D%2F%2Fa'&format=json"
	getText(url, function(e){
		e = JSON.parse(e);
		var name = e.query.results.a.content;
		var u = document.querySelector("#username");
		document.title = name + "'s YouTube Subscriber Count";
		u.innerText = name;
		u.setAttribute("title", username);
		update.isNameSet = 1;
	});
}
update.isLive = 0;
update.live = function() {
	// Please don't use this API key in your projects.
	var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername="+username+"&fields=items/statistics/subscriberCount&key=AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8";
	getText(url, function(e) {
		e = JSON.parse(e);
		var sub_count = e.items[0].statistics.subscriberCount;
		if(!update.isLive) {
			new Odometer({
				el: document.querySelector(".count_live"),
				value: sub_count,
				format: '(,ddd)',
				theme: 'minimal'
			});
			update.isLive = 1;
		} else {
			document.querySelector(".count_live").innerText = sub_count;
		}	
	})

}
update.isYt = 0;
update.yt = function() {
	var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20where%20url%3D%22https%3A%2F%2Fwww.youtube.com%2Fuser%2F"+username+"%2Fabout%22%20%0AAND%20xpath%3D'%2F%2F*%5B%40class%3D%22about-stats%22%5D%2F%2Fb'&format=json";
	getText(url, function(e) {
		e = JSON.parse(e);
		var count_subs = e.query.results.b[0];
		var count_view = e.query.results.b[1];
		if(count_subs.indexOf("%C2%A0") > -1) {
			count_subs.split(decodeURIComponent("%C2%A0")).join("");
			count_view.split(decodeURIComponent("%C2%A0")).join("");
		} else if(count_subs.indexOf(".") > -1) {
			count_subs.split(decodeURIComponent(".")).join("");
			count_view.split(decodeURIComponent(".")).join("");
		} else if(count_subs.indexOf(",") > -1) {
			count_subs.split(decodeURIComponent(",")).join("");
			count_view.split(decodeURIComponent(",")).join("");
		}
		if(!update.isYt) {
			new Odometer({
				el: document.querySelector(".count_yt"),
				value: count_subs,
				format: '(,ddd)',
				theme: 'minimal'
			});
			new Odometer({
				el: document.querySelector(".count_view"),
				value: count_view,
				format: '(,ddd)',
				theme: 'minimal'
			});
			update.isYt = 1;
		} else {
			document.querySelector(".count_yt").innerText = count_subs;
			document.querySelector(".count_view").innerText = count_view;
		}
	});
}
update.all = function() {
	update.name();
	update.live();
	update.yt();
}
update.reset = function(a) {
	username = a.trim();
	if(!a) return;
	update.isNameSet = 0;
	update.all();
}
function newUsername() {
	var te = prompt("New username?", username);
	if(te.trim() == username || te.trim() == "")
		return;
	if(te)
		update.reset(te.trim());
	this.innerText = "wait a sec..";
	history.pushState(null, null, "#!/" + username);
}
window.onpopstate = function() {
	var te = location.hash.split("!/")[1];
	if(te)
		username = te.trim();
	document.querySelector('#username').innerText = "wait a sec..";
	update.reset(username);
}
window.onload = function() {
	var te = location.hash.split("!/")[1];
	if(te)
		username = te.trim();
	else {
		location.replace("#!/" + username);
		document.querySelector(".notice").style.visibility = "visible";
		setTimeout(function(){
			document.querySelector(".notice").className += " notice-hidden";
		}, 3000);
	}
	update.all();
	if(location.hostname != "localhost") {
		setInterval(update.live, 1*1000);
		setInterval(update.yt, 60*1000);
	}
	document.querySelector("#username").onclick = newUsername;
	
	// Social!
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1473140929606808";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-50190232-6', 'auto');
	ga('send', 'pageview');
}