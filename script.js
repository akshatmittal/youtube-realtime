var baseURL = "https://akshatmittal.com/youtube-realtime/";
if(window.top !== window.self) window.top.location.replace(window.self.location.href);
if(location.hostname.indexOf("akshatmittal.com") == -1 && location.hostname != "localhost") location.replace(baseURL + location.hash);
if(location.protocol != "https:" && location.hostname != "localhost") location.protocol = "https:";

var coolGuys = ['PewDiePie','Smosh','MarquesBrownlee','YouTube','TaylorSwiftVEVO','EminemVEVO','BuzzFeedVideo','Smosh', 'Machinima', 'SkyDoesMinecraft'];
var username = coolGuys[Math.floor(Math.random()*coolGuys.length)];
var rawInput = username;
var keyIndex = 0;

var getText = function(url, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if(request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	};
	request.open('GET', url);
	request.send();
}
var toggleDark = function() {
	var html = document.body.parentElement;
	if(html.className == "dark") {
		html.className = "";
	} else {
		html.className = "dark";
	}
}
var toggleMilestones = function() {
	var el = document.getElementById('milestoneBox');
	if(el.style.maxHeight == "5em") {
		el.style.maxHeight = "0";
	} else {
		el.style.maxHeight = "5em";
	}
}
var changeText = function(elem, changeVal) {
    if ('textContent' in elem) {
        elem.textContent = changeVal;
    } else {
        elem.innerText = changeVal;
    }
}
var orientationCheck = function() {
	if(window.innerWidth < window.innerHeight) { // Device is in Potrait mode
		document.getElementById('deviceOrientation').style.visibility = "visible";
	} else {
		document.getElementById('deviceOrientation').style.visibility = "hidden";
	}
}

var update = {};
update.name = function(name) {
	document.title = name + "'s Realtime Subscriber Count on YouTube";
	changeText(document.querySelector("#username"), name);
}
update.queryName = function() {
	getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+encodeURIComponent(rawInput)+"&type=channel&maxResults=1&key=" + update.getKey(), function(e){
		e = JSON.parse(e);
		if(e.pageInfo.totalResults < 1) {
			newUsername("#Music", "Could not find any channel with that name. ");
			return;
		}
		var n = e.items[0].snippet.title;
		update.name(n);
	})
}
update.currentMilestone = function(subs) {
	var targets = [10, 25, 50, 1E2, 5E2, 1E3, 2.5E3, 5E3, 1E4, 2.5E4, 5E4, 1E5, 2.5E5, 5E5, 1E6, 2E6, 3E6, 5E6, 10E6, 15E6, 20E6, 25E6, 30E6, 40E6, 50E6, 70E6, 1E8, 1.5E8, 2E8, 3E8];
	var target = 0;
	for(var i = 0;i<targets.length;i++) {
		if(subs <= targets[i]) {
			target = targets[i];
			break;
		}
	}
	return Array(target, target - subs);
}
update.isLive = 0;
update.live = function() {
	var reqType = (username.length>=24 && username.substr(0, 2).toUpperCase() == "UC")?"id":"forUsername";
	var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&"+reqType+"="+username+"&fields=items/statistics/subscriberCount&key=" + update.getKey();
	getText(url, function(e) {
		e = JSON.parse(e);
		var sub_count = e.items[0].statistics.subscriberCount;
		var m = update.currentMilestone(sub_count);
		if(!update.isLive) {
			new Odometer({
				el: document.querySelector(".count_live"),
				value: sub_count,
				format: '(,ddd)',
				theme: 'minimal'
			});
			//changeText(document.querySelector(".milestone_target"), m[0].toLocaleString("en-US"));
			new Odometer({
				el: document.querySelector(".milestone_target"),
				value: m[0],
				format: '(,ddd)',
				theme: 'minimal'
			});
			new Odometer({
				el: document.querySelector(".milestone_away"),
				value: m[1],
				format: '(,ddd)',
				theme: 'minimal'
			});
			update.isLive = 1;
		} else {
			changeText(document.querySelector(".count_live"), sub_count);
			changeText(document.querySelector(".milestone_target"), m[0].toLocaleString("en-US"));
			changeText(document.querySelector(".milestone_away"), m[1]);
		}
	});
}
update.isYt = 0;
update.yt = function() {
	var channelType = (username.length>=24 && username.substr(0, 2).toUpperCase() == "UC")?"channel":"user";
	var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20where%20url%3D%22https%3A%2F%2Fwww.youtube.com%2F"+channelType+"%2F"+username+"%2Fabout%22%20%0AAND%20xpath%3D'%2F%2F*%5B%40class%3D%22about-stats%22%5D%2F%2Fb'&format=json";
	getText(url, function(e) {
		e = JSON.parse(e);
		var bT = e.query.results.b;
		if(typeof(bT) == "object") {
			var count_subs = bT[0];
			var count_view = bT[1];
		} else {
			var count_subs = bT;
			var count_view = "0";
		}
		if(count_subs.indexOf(decodeURIComponent("%C2%A0")) > -1) {
			count_subs = count_subs.split(decodeURIComponent("%C2%A0")).join("");
			count_view = count_view.split(decodeURIComponent("%C2%A0")).join("");
		} else if(count_subs.indexOf(decodeURIComponent(".")) > -1) {
			count_subs = count_subs.split(decodeURIComponent(".")).join("");
			count_view = count_view.split(decodeURIComponent(".")).join("");
		} else if(count_subs.indexOf(decodeURIComponent(",")) > -1) {
			count_subs = count_subs.split(decodeURIComponent(",")).join("");
			count_view = count_view.split(decodeURIComponent(",")).join("");
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
			changeText(document.querySelector(".count_yt"), count_subs);
			changeText(document.querySelector(".count_view"), count_view);
		}
	});
}
update.parseInput = function(a) {
	rawInput = a;
	getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+encodeURIComponent(a)+"&type=channel&maxResults=1&key=" + update.getKey(), function(e){
		e = JSON.parse(e);
		if(e.pageInfo.totalResults < 1) {
			newUsername("#Music", "Could not find any channel with that name. ");
			return;
		}
		var u = (e.items[0].snippet.channelTitle != undefined && e.items[0].snippet.channelTitle.trim() != "")?e.items[0].snippet.channelTitle:e.items[0].snippet.channelId;
		var n = e.items[0].snippet.title;
		update.reset(u);
		update.name(n);
	})
}
update.share = function(a) {
	var sharableLink = encodeURIComponent(document.getElementById('shareURL').value);
	var facebook = "https://www.facebook.com/dialog/feed?app_id=1473140929606808&display=page&caption=Realtime%20Subscriber%20Count&link=" + sharableLink + "&redirect_uri=" + encodeURIComponent(baseURL + "close.html");
	var twitter = "https://twitter.com/intent/tweet?original_referer=" + sharableLink + "&ref_src=twsrc%5Etfw&text="+encodeURIComponent(document.title)+"&tw_p=tweetbutton&via=itsreallyakshat&url=" + sharableLink;
	switch (a) {
		case 'twtr':
			window.open(twitter);
			break;
		case 'fb':
			window.open(facebook);
			break;
		default:console.log("That's not how it works.");
	}
}
update.getKey = function() {
	var APIkeys = ["AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8", "AIzaSyBSyBp1KHjjXox6e9FBPoOCE1mbLvVUzUM"];
	keyIndex = (keyIndex + 1)%(APIkeys.length);
	return APIkeys[keyIndex];
}
update.all = function() {
	document.getElementById('shareURL').value = baseURL + "#!/" + username;
	update.queryName();
	update.live();
	update.yt();
}
update.reset = function(a) {
	if(!a) return;
	if(a.trim() == username)
		return;
	username = a.trim();
	history.pushState(null, null, "#!/" + username);
	changeText(document.getElementById('username'), "..wait..");
	update.all();
	ga('send', 'pageview', {
  	'page': location.pathname + location.search + location.hash,
		'title': document.title
	});
}
function newUsername(a, b) {
	var te = prompt(((typeof(b) == "string")?b:"") + "Enter new user:", (typeof(a) == "string")?a:username);
	if(te.trim() == username || te.trim() == "")
		return;
	if(te)
		update.parseInput(te.trim());
	changeText(document.getElementById('username'), "..wait..");
	history.pushState(null, null, "#!/" + username);
}
window.onpopstate = function() {
	var te = location.hash.split("!/")[1];
	if(te) {
		username = te.trim();
		rawInput = username;
		changeText(document.querySelector('#username'), "..wait..");
		update.queryName();
	}
}
window.onload = function() {
	var te = location.hash.split("!/")[1];
	if(te){
		username = te.trim();
		rawInput = username;
	}	else {
		history.pushState(null, null, "#!/" + username);
	}
	update.all();
	setInterval(update.live, 1*1000);
	setInterval(update.yt, 60*1000);
	document.querySelector("#username").onclick = newUsername;
	window.onresize = orientationCheck;
	orientationCheck();

	// Social!
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1473140929606808";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://apis.google.com/js/platform.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","google-gjs");
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-50190232-6', 'auto');
	ga('send', 'pageview', {
  	'page': location.pathname + location.search + location.hash,
		'title': document.title
	});
}
