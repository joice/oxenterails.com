/*
Script: Browser.Extras.setQueryStringValues.js
License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/

$extend(Browser, {
	setQueryStringValues: function(values){
		var base = $pick(window.location.href, window.location.search, '').split('?')[0]; //get the base string
		var qs = this.getQueryStringValues(); // get the query string
		var merged = $merge(qs, values);
		var query = '?';		
		for (key in merged) {
			query += '&' + key + '=' +merged[key]
		}
		return base + query;
	}
});