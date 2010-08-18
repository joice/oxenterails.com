/*
Script: Browser.Extras.js
	Extends the Window native object to include methods useful in managing the window location and urls.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/

$extend(Browser, {
	getHost:function(url){
		url = $pick(url, window.location.href);
		var host = url;
		if(url.test('http://')){
			url = url.substring(url.indexOf('http://')+7,url.length);
			if(url.test(':')) url = url.substring(0, url.indexOf(":"));
			if(url.test('/')) return url.substring(0,url.indexOf('/'));
			return url;
		}
		return false;
	},
	getQueryStringValue: function(key, url) {
		try { 
			return Browser.getQueryStringValues(url)[key];
		}catch(e){return null;}
	},
	getQueryStringValues: function(url){
		var qs = $pick(url, window.location.search, '').split('?')[1]; //get the query string
		if (!$chk(qs)) return {};
		if (qs.test('#')) qs = qs.substring(0, qs.indexOf('#'));
		try {
      if (qs) return qs.parseQuery();
		} catch(e){
			return null;
		}
		return {}; //if there isn't one, return null
	},
	getPort: function(url) {
		url = $pick(url, window.location.href);
		var re = new RegExp(':([0-9]{4})');
		var m = re.exec(url);
	  if (m == null) return false;
	  else {
			var port = false;
			m.each(function(val){
				if($chk(parseInt(val))) port = val;
			});
	  }
		return port;
	},
  redraw: function(element){
    var n = document.createTextNode(' ');
    this.adopt(n);
    (function(){n.dispose()}).delay(1);
    return this;
	}
});
window.addEvent('domready', function(){
	var count = 0;
	//this is in case domready fires before string.extras loads
	function setQs(){
		function retry(){
			count++;
			if (count < 20) setQs.delay(50);
		}; 
		try {
			if (!Browser.getQueryStringValues()) retry();
			else Browser.qs = Browser.getQueryStringValues();
		} catch(e){
			retry();
		}
	}
	setQs();
});

/*
Script: Hash.Extras.js
	Extends the Hash native object to include getFromPath which allows a path notation to child elements.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/

Hash.implement({
	getFromPath: function(notation) {
		var source = this.getClean();
		notation.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g, function(match) {
			if (!source) return;
			var prop = arguments[2] || arguments[1] || arguments[0];
			source = (prop in source) ? source[prop] : null;
			return match;
		});
		return source;
	},
	cleanValues: function(method){
		method = method||$defined;
		this.each(function(v, k){
			if (!method(v)) this.erase(k);
		}, this);
		return this;
	},
	run: function(){
		var args = $arguments;
		this.each(function(v, k){
			if ($type(v) == "function") v.run(args);
		});
	}
});

/*
Script: String.Extras.js
	Extends the String native object to include methods useful in managing various kinds of strings (query strings, urls, html, etc).

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/
String.implement({
	stripTags: function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	},
	parseQuery: function(encodeKeys, encodeValues) {
		encodeKeys = $pick(encodeKeys, true);
		encodeValues = $pick(encodeValues, true);
		var vars = this.split(/[&;]/);
		var rs = {};
		if (vars.length) vars.each(function(val) {
			var keys = val.split('=');
			if (keys.length && keys.length == 2) {
				rs[(encodeKeys)?encodeURIComponent(keys[0]):keys[0]] = (encodeValues)?encodeURIComponent(keys[1]):keys[1];
			}
		});
		return rs;
	},
	tidy: function() {
		var txt = this.toString();
		$each({
			"[\xa0\u2002\u2003\u2009]": " ",
			"\xb7": "*",
			"[\u2018\u2019]": "'",
			"[\u201c\u201d]": '"',
			"\u2026": "...",
			"\u2013": "-",
			"\u2014": "--",
			"\uFFFD": "&raquo;"
		}, function(value, key){
			txt = txt.replace(new RegExp(key, 'g'), value);
		});
		return txt;
	},
	cleanQueryString: function(method){
		return this.split("&").filter(method||function(set){
			return $chk(set.split("=")[1]);
		}).join("&");
	},
	findAllEmails: function(){
			return this.match(new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "gi")) || [];
	}
});
