// ==UserScript==
// @name           Facebook Deleter
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// @grant       none
// @version 3
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

const wait_time = 5000;

function isTimeline() {
    var suchstring = /(allactivity)/g;
    return suchstring.test($(location).attr('href'));
}

function clickThings() {
  console.log('clickThings');
  const links = $('a[href][data-ajaxify-href]')
    .filter(function() { return this.innerText != "Show on Timeline"; });
  let n_links = links.length;
  links.each(
      function() {
        console.log("Found a link: " + this.innerText);
        clicked.add(this.href);
        this.click();
        n_links--;
        if (n_links == 0) setTimeout(clickThings, wait_time);
      }
  );
}

function main() {
    if (isTimeline()) {
        clickThings();
    } else {
        console.log("Not on timeline.");
    }
}
setTimeout(main, wait_time);
