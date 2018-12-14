//T485.js

// Fix dropdown menu bug on iOS
$('.dropdown a').click(function() {
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    }
    else {
        $('.dropdown').removeClass('open');
        $(this).parent().addClass('open');
    }
});

//https://stackoverflow.com/a/901144/5511561
function getQuery(name, url) {
	url = url || window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getQueryString(url) {
	url = url || window.location.href;
	if (url.indexOf("?") < 0) return "";
	return url.substring(url.indexOf("?"), (url.indexOf("#") > -1 ? url.indexOf("#") : undefined))
}

//https://stackoverflow.com/a/10997390/5511561
function setQuery(name, value, search) {
    if (value !== null && value !== undefined ) value = "" + value;//we want falsey values to be used literally, as a string (e.g. 0 -> "0", false -> "false).
	search = search || window.location.search;
    let regex = new RegExp("([?;&])" + name + "[^&;]*[;&]?");
    let query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (value ? name + "=" + value : '');
}

//edits the query from a given url
function setQueryUrl(name, value, url) {
	var base = url.substring(0,(url.indexOf("?") > -1 ? url.indexOf("?") : undefined));
	var query = setQuery(name, value, getQueryString(url));
	var hash = (url.indexOf("#") > -1 ? url.substring(url.indexOf("#")) : "");
	return base + query + hash;
}

//https://stackoverflow.com/a/19279428/5511561
function setURLQuery(fullQueryString) {

	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + fullQueryString + window.location.hash;
	if (history.pushState) {
		window.history.pushState({path:newurl},'',newurl);
	} else {
		//window.location.href = newurl;
	}
	//checkDefaultOptions();
}

function removeHash () {
	history.pushState("", document.title, window.location.pathname
		+ window.location.search);
}



//http://stackoverflow.com/a/17606289/5511561s
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

//http://stackoverflow.com/a/17606289/5511561s (footnote),

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function initScrollToTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(".to-top-btn").fadeIn();
		} else {
			$(".to-top-btn").fadeOut();
		}
	});
	$(document.body).on("click", ".scroll-to-top", function() {

		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;

	});

}
initScrollToTop();
//preserve continue state
//this must not throw an exception if it fails because preserving the state is not strictly necessary for website use.

//preserve link state keeps the continue URL.
function preserveLinkStates() {
	if (getQuery("continue") !== "" && getQuery("continue") != null) {

		$(".attach-continue-url, .preserve-state, .keep-state").each(function() {
			var href = $(this).attr("href");
			var base = href.substring(0,(href.indexOf("?") > -1 ? href.indexOf("?") : undefined));
			var query = setQuery("continue", encodeURIComponent(getQuery("continue")), encodeURIComponent(getQueryString(href)));
			var hash = (href.indexOf("#") > -1 ? href.substring(href.indexOf("#")) : "");

			$(this).attr("href", base + query + hash);
		});
	}
}

//preserve current page changes the continue url to the current url.
function preserveCurrentPage() {

	$(".preserve-page, .keep-page").each(function() {
		var href = $(this).attr("href");
		var base = href.substring(0,(href.indexOf("?") > -1 ? href.indexOf("?") : undefined));
		var query = setQuery("continue", encodeURIComponent(window.location.href), getQueryString(href));
		var hash = (href.indexOf("#") > -1 ? href.substring(href.indexOf("#")) : "");
		$(this).attr("href", base + query + hash);
	});

}
//wait until other code is run
$(document).ready(function() {
	if (window.preserveContinueState !== false) {
		preserveCurrentPage();
	}
	if (window.preserveCurrentPage !== false) {
		preserveLinkStates();
	}

});
$(document.body).on("submit", ".prevent-submit", function() {
	return false;
})



//login status changes
firebase.auth().onAuthStateChanged( function (user) {
	if (user) {
		var email = user.email;
		var displayname = user.displayname || email;
		$(".user-email").text(email);
		$(".user-displayname").text(displayname);

		$(".lo-show").addClass("hidden");
		$(".li-show").removeClass("hidden");
	} else {
		$(".li-show").addClass("hidden");
		$(".lo-show").removeClass("hidden");
	}
});
//T485.js

// Fix dropdown menu bug on iOS
$('.dropdown a').click(function() {
	if ($(this).parent().hasClass('open')) {
		$(this).parent().removeClass('open');
	}
	else {
		$('.dropdown').removeClass('open');
		$(this).parent().addClass('open');
	}
});

//https://stackoverflow.com/a/901144/5511561
function getQuery(name, url) {
	url = url || window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getQueryString(url) {
	url = url || window.location.href;
	if (url.indexOf("?") < 0) return "";
	return url.substring(url.indexOf("?"), (url.indexOf("#") > -1 ? url.indexOf("#") : undefined))
}

//https://stackoverflow.com/a/10997390/5511561
function setQuery(name, value, search) {
	if (value !== null && value !== undefined ) value = "" + value;//we want falsey values to be used literally, as a string (e.g. 0 -> "0", false -> "false).
	search = search || window.location.search;
	let regex = new RegExp("([?;&])" + name + "[^&;]*[;&]?");
	let query = search.replace(regex, "$1").replace(/&$/, '');

	return (query.length > 2 ? query + "&" : "?") + (value ? name + "=" + value : '');
}

//edits the query from a given url
function setQueryUrl(name, value, url) {
	var base = url.substring(0,(url.indexOf("?") > -1 ? url.indexOf("?") : undefined));
	var query = setQuery(name, value, getQueryString(url));
	var hash = (url.indexOf("#") > -1 ? url.substring(url.indexOf("#")) : "");
	return base + query + hash;
}

//https://stackoverflow.com/a/19279428/5511561
function setURLQuery(fullQueryString) {

	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + fullQueryString + window.location.hash;
	if (history.pushState) {
		window.history.pushState({path:newurl},'',newurl);
	} else {
		//window.location.href = newurl;
	}
	//checkDefaultOptions();
}

function removeHash () {
	history.pushState("", document.title, window.location.pathname
		+ window.location.search);
}



//http://stackoverflow.com/a/17606289/5511561s
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

//http://stackoverflow.com/a/17606289/5511561s (footnote),

function escapeRegExp(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}


function initScrollToTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(".to-top-btn").fadeIn();
		} else {
			$(".to-top-btn").fadeOut();
		}
	});
	$(document.body).on("click", ".scroll-to-top", function() {

		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;

	});

}
initScrollToTop();
//preserve continue state
//this must not throw an exception if it fails because preserving the state is not strictly necessary for website use.

//preserve link state keeps the continue URL.
function preserveLinkStates() {
	if (getQuery("continue") !== "" && getQuery("continue") != null) {

		$(".attach-continue-url, .preserve-state, .keep-state").each(function() {
			var href = $(this).attr("href");
			var base = href.substring(0,(href.indexOf("?") > -1 ? href.indexOf("?") : undefined));
			var query = setQuery("continue", encodeURIComponent(getQuery("continue")), getQueryString(href));
			var hash = (href.indexOf("#") > -1 ? href.substring(href.indexOf("#")) : "");

			$(this).attr("href", base + query + hash);
		});
	}
}

//preserve current page changes the continue url to the current url.
function preserveCurrentPage() {

	$(".preserve-page, .keep-page").each(function() {
		var href = $(this).attr("href");
		var base = href.substring(0,(href.indexOf("?") > -1 ? href.indexOf("?") : undefined));
		var query = setQuery("continue", encodeURIComponent(window.location.href), getQueryString(href));
		var hash = (href.indexOf("#") > -1 ? href.substring(href.indexOf("#")) : "");
		$(this).attr("href", base + query + hash);
	});

}
//wait until other code is run
$(document).ready(function() {
	if (window.preserveContinueState !== false) {
		preserveCurrentPage();
	}
	if (window.preserveCurrentPage !== false) {
		preserveLinkStates();
	}

});
$(document.body).on("submit", ".prevent-submit", function() {
	return false;
})



//login status changes
firebase.auth().onAuthStateChanged( function (user) {
	if (user) {
		var email = user.email;
		var displayname = user.displayname || email;
		$(".user-email").text(email);
		$(".user-displayname").text(displayname);

		$(".lo-show").addClass("hidden");
		$(".li-show").removeClass("hidden");
	} else {
		$(".li-show").addClass("hidden");
		$(".lo-show").removeClass("hidden");
	}
});


//google anylatics
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
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-102375833-1', 'auto');
ga('send', 'pageview');
//google anylatics
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
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-102375833-1', 'auto');
ga('send', 'pageview');