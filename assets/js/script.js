var baseURL = window.location.href; //gets base URL automatically from window
if (typeof isEmbed == 'undefined') isEmbed = 0;
if (window.location.hostname != "localhost" && 1) {
  //if (window.location.protocol != "http:") window.location.replace("http:" + window.location.href.substring(window.location.protocol.length)); //comment for https //uncomment for http
  if (window.location.protocol != "https:") window.location.replace("https:" + window.location.href.substring(window.location.protocol.length)); //comment for http //uncomment for https
  if (location.hostname.indexOf(window.location.hostname) == -1) window.location.replace(baseURL + location.hash); // get hostname from window
  if ((window.top !== window.self) && isEmbed == 0) window.top.location.replace(window.self.location.href);
  if ((window.top == window.self) && isEmbed) window.top.location.replace(baseURL + location.hash);
}

var coolGuys = ['PewDiePie', 'iisuperwomanii', 'MarquesBrownlee', 'YouTube', 'TheFineBros', 'SkyDoesMinecraft', 'markipliergame', 'theellenshow'];
// var APIkeys = ["AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8"];
var APIkeys = ["AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8", "AIzaSyBSyBp1KHjjXox6e9FBPoOCE1mbLvVUzUM", "AIzaSyDeLLOyrp1yCZCOmVXg3u8Jxtasre2NxFA", "AIzaSyDFXBcpYskzYNTOZEgq133xXP5GUH4Ct3k", "AIzaSyBRnIik08vLUsSyJs_M_A7eMRgxaBMRpdU", "AIzaSyD_HMEbLyCOVPB53JBFRS5--58sAwhY2Ic", "AIzaSyA50UgQA00oM7ztJp97nWC7XM9nggeGP8g", "AIzaSyAwOwvwAGbUF2xTmsJY7Loyrg8qE-0syQE", "AIzaSyDxkDsPPEgePGoyZct62M0MdYDBRzuudKY", "AIzaSyA1v68XzPdA9rfrsPUFhgZ500_uWdf2A8I", "AIzaSyCb9zxTIuGGEBIJHLfj8lOb4k4U0jWstGg", "AIzaSyBgiHBx5C-rkWzY0w2c7SWUC-RHyRpLv7E", "AIzaSyDi5W8BNEZRYCkiuV-rSLWzlfDOIwEitjw", "AIzaSyAfdtlCGsypBhW1Fzs3zMmYcUDgkNBTDV8", "AIzaSyBraMJy98X7r9-jPRznAaT1g9cdAAFQyFE", "AIzaSyCg_tlHelOnRsDjfdv-3Kntb3GXaYEXzk4", "AIzaSyAI0sPgCpm_KjEL7u5hI3m0pin0mBZbnLs", "AIzaSyDqipNMKLaN_ZVbZ-_f40YFp_vUTmhqMxU", "AIzaSyCzF4_POQGk2U_0TiaGF0ZqDMHIsqGA7es", "AIzaSyCgCBendo5K3kPNEL9tO_TI4G8WAdp_hnM", "AIzaSyAhXueAQP-HfZdLtoY9Tlxqt9zzc7yTrTg", "AIzaSyBUnyRp5Ny6HKeRUx8nGGAuL6r8BlUsqIU", "AIzaSyBQI0zBPcDO3cZ8eC87SlxKaW7hNRa4C4M", "AIzaSyDTMVk7NSV8Q99zMhoIDboFcxdnaWPPOJw", "AIzaSyD6Uemb2sRhUROLLVDVs7e3NaOt-OQL9qg", "AIzaSyBVRPMx0qg7LfN_Npyw2dnB0xp_-94_0RQ", "AIzaSyC2iAZe084ALcwvBRN6hEZoxPJL0qBZA74", "AIzaSyDX5oy6l5rHCyphGqHFvgn9jAFg3xtXHE0", "AIzaSyAmkhGStJ5IZU-iy6ZitzFhjnv4nTQUH5E", "AIzaSyC5s4T8io7GZyHEngZBLQZeUeLjxNLGsV0", "AIzaSyBNCnqvTheMz1VHFP_r1MdAny-5P3LUPcs", "AIzaSyBIWb6M2iUewOO08FQftyvq48N8MluKKOo", "AIzaSyCnDPYzmv3gMqx4WYh4J6e5t5NzVoGH2gk"];
var username = coolGuys[Math.floor(Math.random() * coolGuys.length)];
var rawInput = username;
var saveName;
var has_focus = true;
var keyIndex = 0;
var darkTheme;
var audio;
var title;

var subscribers = 0;
var noFocus = 0; //subsciber count while page not focused
var videos =0;

Array.prototype.shuffle = function() {
  var i = this.length,
    j, temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}
APIkeys.shuffle();

var getText = function(url, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) callback(request.responseText);
      else {
        callback("nex");
      }
    }
  };
  request.open('GET', url);
  request.send();
}
var changeText = function(elem, changeVal) {
  if ('textContent' in elem) {
    elem.textContent = changeVal;
  } else {
    elem.innerText = changeVal;
  }
}
var hasClass = function(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
var addClass = function(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
var removeClass = function(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
var readStorage = function() {
	if(localStorage.getItem("darkTheme") == 'true') toggleDark();
	if(localStorage.getItem("audio") == 'true') audio.checked=true;
	if(localStorage.getItem("title") == 'true') title.checked=true;
	if(localStorage.getItem("milestone") == 'true') toggleMilestones();
	if(localStorage.getItem("immersive") == 'true') toggleImmersive();
}
var toggleDark = function() {
	var html = document.body.parentElement;
	if(hasClass(html, 'dark')) {
		removeClass(html, 'dark');
		darkTheme.checked = false;
	} else {
		addClass(html, 'dark');
		darkTheme.checked = true;
	}
	localStorage.setItem("darkTheme", darkTheme.checked);
}

var toggleAudio = function(){
	localStorage.setItem("audio", audio.checked);
}

var toggleTitle = function(){
	localStorage.setItem("title", title.checked);
}
	

var update = {};
update.name = function(name) {
  document.title = name + "'s Realtime Subscriber Count on YouTube";
  changeText(document.querySelector("#name"), name);
}
update.queryName = function() {
  getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(rawInput) + "&type=channel&maxResults=1&key=" + update.getKey(), function(e) {
    if (e == "nex") {
      update.queryName();
      return;
    }
    e = JSON.parse(e);
    if (e.pageInfo.totalResults < 1) {
      newUsername("#Music", "Could not find any channel with that name. ");
      return;
    }
    var n = e.items[0].snippet.title;
    if (isEmbed) {
      document.getElementById("embedImage").src = e.items[0].snippet.thumbnails.default.url;
    }
    update.name(n);
	saveName = n;
  })
}
update.isLive = 0;
update.live = function() {
  var reqType = (username.length >= 24 && username.substr(0, 2).toUpperCase() == "UC") ? "id" : "forUsername";
  var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + reqType + "=" + username + "&key=" + update.getKey();
  getText(url, function(e) {
    if (e == "nex") {
      return; // pass it on
    }
    e = JSON.parse(e);
    var subscriberCount = e.items[0].statistics.subscriberCount;
    var videoCount = e.items[0].statistics.videoCount;
    var viewCount = e.items[0].statistics.viewCount;
	
	if (subscribers === 0){//if just loaded set count to current sub value
		subscribers  = subscriberCount;
	}
	if (videos === 0){//if just loaded set count to current video value
		videos = videoCount;
	}
	if (subscribers < subscriberCount){//play sound if new subscriber
		var sound = new Audio('assets/audio/bell.mp3');
		if (audio.checked === true){//is audio switched on?
			sound.play();	
		}
		if (has_focus === false){
			noFocus = noFocus + (subscriberCount - subscribers);
		}
	}
	if (subscribers > subscriberCount){//play sound if lost subscriber
		var sound = new Audio('assets/audio/wrong.wav');
		if (audio.checked === true){//is audio switched on?
			sound.play();	
		}	
		if (has_focus === false){
			noFocus = noFocus - (subscribers - subscriberCount);
		}
	}
	
	if (videos < videoCount){ //play sound if a new video added
		var sound = new Audio('assets/audio/newvid.wav');
		if (audio.checked === true){//is audio switched on?
			sound.play();	
		}
	}
		
	subscribers  = subscriberCount; //set old counter to new value
	videos =videoCount;//set old counter to new value
	
	if (title.checked === true){ //if in title notification mode
		if (has_focus === false){
			if(noFocus>0){
				document.title = "(+" + noFocus + ") " + saveName + "'s Realtime Subscriber Count on YouTube";
			}else if(noFocus<0){
				document.title = "(" + noFocus + ") " + saveName + "'s Realtime Subscriber Count on YouTube";
			}else{
				document.title = saveName + "'s Realtime Subscriber Count on YouTube";
			}
		}else{
			document.title = saveName + "'s Realtime Subscriber Count on YouTube";
			noFocus = 0;
		}
	}
	
    if (!update.isLive) {
      new Odometer({
        el: document.querySelector(".count_live"),
        value: subscriberCount,
        format: '(,ddd)',
        theme: 'minimal'
      });
      new Odometer({
        el: document.querySelector(".count_yt"),
        value: videoCount,
        format: '(,ddd)',
        theme: 'minimal'
      });
      new Odometer({
        el: document.querySelector(".count_view"),
        value: viewCount,
        format: '(,ddd)',
        theme: 'minimal'
      });
      update.isLive = 1;
    } else {
      changeText(document.querySelector(".count_live"), subscriberCount);
      changeText(document.querySelector(".count_yt"), videoCount);
      changeText(document.querySelector(".count_view"), viewCount);
    }
  });
}
update.parseInput = function(a) {
  rawInput = a;
  getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(a) + "&type=channel&maxResults=1&key=" + update.getKey(), function(e) {
    if (e == "nex") {
      update.parseInput(a);
      return;
    }
    e = JSON.parse(e);
    if (e.pageInfo.totalResults < 1) {
      newUsername("#Music", "Could not find any channel with that name. ");
      return;
    }
    var u = e.items[0].snippet.channelId;
    var n = e.items[0].snippet.title;
    update.reset(u);
    update.name(n);
  })
}
update.share = function(a) {
  var sharableLink = encodeURIComponent(document.getElementById('shareURL').value);
  var facebook = "https://www.facebook.com/dialog/feed?app_id=1473140929606808&display=page&caption=Realtime%20Subscriber%20Count&link=" + sharableLink + "&redirect_uri=" + encodeURIComponent(baseURL + "assets/close.html");
  var twitter = "https://twitter.com/intent/tweet?original_referer=" + sharableLink + "&ref_src=twsrc%5Etfw&text=" + encodeURIComponent(document.title.slice(0, -7) + "@YouTube") + "&tw_p=tweetbutton&via=iakshatmittal&url=" + sharableLink;
  var youtube = "https://www.youtube.com/" + ((username.length >= 24 && username.substr(0, 2).toUpperCase() == "UC") ? "channel" : "user") + "/" + username;
  switch (a) {
    case 'twtr':
      window.open(twitter);
      break;
    case 'fb':
      window.open(facebook);
      break;
    case 'yt':
      window.open(youtube);
      break;
    default:
      console.log("That's not how it works.");
  }
}
update.getKey = function() {
  keyIndex = (keyIndex + 1) % (APIkeys.length);
  return APIkeys[keyIndex];
}
update.all = function() {
  document.getElementById('shareURL').value = baseURL + "#!/" + username;
  document.getElementById('embedCode').value = '<iframe height="80px" width="300px" frameborder="0" src="' + baseURL + "embed/#!/" + username + '" style="border: 0; width:300px; height:80px; background-color: #FFF;"></iframe>';
  update.queryName();
  update.live();
}
update.reset = function(a) {
  if (!a) return;
  if (a.trim() == username)
    return;
  username = a.trim();
  history.pushState(null, null, "#!/" + username);
  changeText(document.getElementById('name'), "..wait..");
  update.all();
  ga('send', 'pageview', {
    'page': location.pathname + location.search + location.hash,
    'title': document.title
  });
}

function newUsername(a, b) {
  subscribers = 0; //reset counts for new user (prevents sound due to changing user)
  videos =0;//reset counts for new user (prevents sound due to changing user)
  var te = prompt(((typeof(b) == "string") ? b : "") + "Enter new user:", (typeof(a) == "string") ? a : username);
  if (te == null) return;
  if (te.trim() == username || te.trim() == "")
    return;
  if (te)
    update.parseInput(te.trim());
  changeText(document.getElementById('username'), "..wait..");
  history.pushState(null, null, "#!/" + username);
}
window.onpopstate = function() {
  var te = location.hash.split("!/")[1];
  if (te) {
    username = te.trim();
    rawInput = username;
    changeText(document.querySelector('#name'), "..wait..");
    update.queryName();
  }
}
window.onload = function() {
  var te = location.hash.split("!/")[1];
  if (te) {
    username = te.trim();
    rawInput = username;
  } else {
    history.pushState(null, null, "#!/" + username);
  }
  update.all();
  setInterval(update.live, 1 * 1000);

  if (!isEmbed) document.querySelector("#name").onclick = newUsername;

  darkTheme = document.getElementById('darkTheme');
  audio = document.getElementById('audio');
  title = document.getElementById('title');
  
	readStorage();
  // Social!
  (adsbygoogle = window.adsbygoogle || []).push({});
  (adsbygoogle = window.adsbygoogle || []).push({});
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-50190232-6', 'auto');
  ga('send', 'pageview', {
    'page': location.pathname + location.search + location.hash,
    'title': document.title
  });
}

window.onblur = function(){ 
	if (title.checked === true){ 
		has_focus=false;
	}		
}  
window.onfocus = function(){  
	if (title.checked === true){ 
		has_focus=true;  
	}
}


