// ==UserScript==
// @name        9anime Watchlist Enhancer
// @namespace   https://github.com/CyberCollision/Userscripts
// @match       https://9anime.*/user/watch-list
// @grant       none
// @version     2.0
// @author      CyberCollision
// @description This userscript enhances the appearance of the watchlist on 9anime
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';

    // Get all the items with class 'item' inside the div with class 'watchlist scaff items'
    const items = document.querySelectorAll('.watchlist.scaff.items .item');

    // Loop through each item
    items.forEach(item => {

        // Find the poster image inside the item
        const poster = item.querySelector('.poster');

        // Change the width of the poster image to 100px
        poster.style.width = '100px';

        // Find the title link inside the item
        const titleLink = item.querySelector('.name a');

        // Change the font size of the title link to 1.3rem
        titleLink.style.fontSize = '1.3rem';

        // Disable the 'display: webkit box;' property
        titleLink.style.display = 'initial';

        // Find the detail section inside the item
        const detail = item.querySelector('.info .detail');

        // Change the font size of the detail section to 1rem
        detail.style.fontSize = '1rem';
    });
})();
