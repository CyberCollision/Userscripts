// ==UserScript==
// @name        YouTube Shorts Hider
// @namespace   Violentmonkey Scripts
// @match       *://*.youtube.com/feed/subscriptions
// @grant       none
// @icon        https://www.google.com/s2/favicons?domain=https://www.youtube.com
// @version     1.0.1
// @author      CyberCollision
// @description This script hides YouTube Shorts from your subscriptions page in grid view, providing a cleaner and more focused browsing experience.
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.display_as_contents { display: contents !important; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    function removeShorts() {
        let count = 0;

        // Clear blank spaces when deleting shorts
        document.querySelectorAll('ytd-rich-grid-row:not(.display_as_contents)').forEach(row => {
            row.classList.add("display_as_contents");

            if (row.childElementCount) {
                row.firstElementChild.classList.add("display_as_contents");
            }
        });

        document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]').forEach(thumbnail => {
            count++;
            const item = thumbnail.closest('ytd-rich-item-renderer');

            if (item) {
                item.remove();
            }
        });

        if (count) {
            console.log('Removed ' + count + ' shorts');
        }
    }

    const observer = new MutationObserver(removeShorts);
    observer.observe(document.querySelector('#page-manager'), { childList: true, subtree: true });
})();
