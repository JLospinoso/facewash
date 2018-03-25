// ==UserScript==
// @name           Facebook Deleter
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// @grant       none
// @version 3
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

const opened = new Set();
const clicked = new Set();
const n_elements = 25;
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
        const dont_click = clicked.has(this.href);
        if (!dont_click){
            console.log("Found a link: " + this.innerText);
            clicked.add(this.href);
            this.click();
        }
        n_links--;
        if (n_links == 0) setTimeout(clickThings, wait_time);
      }
  );
}

let iterations = 2;
function expandTimeline() {
  console.log('expandTimeline');
  const divs = $('div.collapse.nowrap');
  let n_divs = divs.length;
  divs.each(
      function() {
        console.log("Clicked " + this.innerText);
        let invalid_target = this.innerText.includes("2005") ||
            this.innerText.includes("2006") ||
            this.innerText.includes("2007") ||
            this.innerText.includes("2008");
        if (!opened.has(this.innerText) && !invalid_target){
            opened.add(this.innerText);
            this.click();
        }
        n_divs--;
        if(n_divs == 0) {
            iterations--;
            if (iterations > 0) setTimeout(expandTimeline, wait_time);
        }
      }
  );
}

function getMore() {
  console.log('getMore');
  const divs = $('nt5.async_elem.sectionContent._56d8');
  divs.slice(0, 25).each(
      function() {
        //console.log("Clicked " + this.innerText);
        //let valid_target = this.innerText.includes("Load more from");
        //if (!opened.has(this.innerText) && valid_target){
        //    opened.add(this.innerText);
            this.click();
        //}
      }
  );
  setTimeout(getMore, wait_time);
}

function main() {
    if (isTimeline()) {
        //scrollTo(0, 1000000000);
        //expandTimeline();
        clickThings();
        getMore();
    } else {
        console.log("Not on timeline.");
    }
}
setTimeout(main, wait_time);
