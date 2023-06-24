// ==UserScript==
// @name        Enhanced Watchlist
// @namespace   https://github.com/CyberCollision/Userscripts
// @match       *://9anime.to/user/watch-list
// @match       *://9anime.pl/user/watch-list
// @match       *://9anime.gs/user/watch-list
// @match       *://9anime.id/user/watch-list
// @icon        https://www.google.com/s2/favicons?domain=https://9anime.me
// @version     2.1.0
// @author      CyberCollision
// @description This userscript enhances the appearance of the watchlist on 9anime
// @license     MIT
// ==/UserScript==

(function() {
  'use strict';

  // Settings
  const imageSize = '200px'; // Set the desired image size here

  const items = document.querySelectorAll('.watchlist.scaff.items .item');

  items.forEach(item => {
    const poster = item.querySelector('.poster');
    const imgElement = poster.querySelector('span img');
    let imgSrc = imgElement.getAttribute('src');
    imgSrc = imgSrc.replace(/-w100$/, '');
    imgElement.setAttribute('src', imgSrc);
    imgElement.style.width = imageSize;
    poster.style.width = imageSize;
    const titleLink = item.querySelector('.name a');
    titleLink.style.fontSize = '1.3rem';
    titleLink.style.display = 'initial';
    const detail = item.querySelector('.info .detail');
    detail.style.fontSize = '1rem';
  });
})();
