/*
	picasaViewer v1.0 - mooTools script to embed a picasa gallery in your website
	Lennart Pilon (http://pilon.nl)	
*/

window.addEvent('domready', function() {

	var username	= 'pfagiani';

	/*
	The following values are valid for the thumbsize and imgmax query parameters and are embeddable on a webpage. 
	These images are available as both cropped(c) and uncropped(u) sizes by appending c or u to the size. As an 
	example, to retrieve a 72 pixel image that is cropped, you would specify 72c, while to retrieve the uncropped 
	image, you would specify 72u for the thumbsize or imgmax query parameter values.

	32, 48, 64, 72, 144, 160
	*/
	var thumbsize	= '160c';
	
	/*
	The following values are valid for the thumbsize and imgmax query parameters and are embeddable on a webpage. 
	These images are available as only uncropped(u) sizes by appending u to the size or just passing the size 
	value without appending anything.

	200, 288, 320, 400, 512, 576, 640, 720, 800

	*/
	var imgmax = '640';

	var url = 'http://picasaweb.google.com/data/feed/base/user/' + username + '/albumid/5504592817558710193?category=photo&alt=json&callback=viewPhotoList&access=public&thumbsize=' + thumbsize+'&imgmax='+imgmax;
	new Element('script', {'src': url}).inject($('photos'));	

});

function viewAlbumList(list) {
	
	href  = list.feed.author[0].uri.$t;
	user = list.feed.author[0].name.$t;
	
	$('navigate').adopt(new Element('a', {'href': href, 'html': 'To Picasa', 'title': 'View '+user+'\'s gallery at Picasa', 'class': 'picasalink'}));

	list.feed.entry.each(function(item) {
		var title	= item.title.$t;
		var thumb	= item.media$group.media$thumbnail[0].url;
	
		id_begin	= item.id.$t.indexOf('albumid/')+8;
		id_end		= item.id.$t.indexOf('?');
		var id		= item.id.$t.slice(id_begin, id_end);
		var href	= Browser.setQueryStringValues({'albumid': id});
		d			= item.published.$t;
		var date	= d.substr(8,2) + '-' + d.substr(5,2) + '-' + d.substr(0,4);

		$('photos').adopt(new Element('div', {'class': 'image-container'}).adopt(new Element('a', {'href': href, 'title': title}).adopt(new Element('img', {'src': thumb, 'alt': title}), new Element('p', {'html': title})), new Element('p', {'html': date, 'class': 'date'})));
	}); 
}

function viewPhotoList(list) {
	
	var album = list.feed.title.$t;
	var href  = "http://picasaweb.google.com/pfagiani/OxenteRails2010#";
	
	$('navigate').adopt(new Element('a', {'href': href, 'html': 'To Fagiani\'s Picasa', 'class': 'picasalink'}));
	
	list.feed.entry.each(function(item, size) {

		var title	= item.title.$t;
		var link	= item.media$group.media$content[0].url;
		size		= item.media$group.media$content[0].width;
		var thumb	= item.media$group.media$thumbnail[0].url;
		
		id_begin	= item.id.$t.indexOf('albumid/')+8;
		id_end		= item.id.$t.indexOf('?');
		var id		= item.id.$t.slice(id_begin, id_end);
		
		$('photos').adopt(new Element('a', {'href': link, 'title': title, 'class': 'lightbox', 'rel': 'lightbox-album'}).adopt(new Element('img', {'src': thumb, 'alt': title})));
	});

	$$("a").filter(function(el) {
		return el.href && el.firstChild && el.firstChild.src;
	}).slimbox({}, function(el) {	
		return [el.href, (el.title || el.firstChild.alt) + '<br /><a href="' + el.href + '">Album: '+ album +' </a>'];
	});
}