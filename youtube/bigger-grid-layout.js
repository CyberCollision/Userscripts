// ==UserScript==
// @name         Youtube Bigger Grid Layout
// @namespace    https://github.com/CyberCollision/Userscripts
// @match        *://*youtube.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=https://www.youtube.com
// @version      1.0.1
// @author       CyberCollision
// @description  Increases the size of the grid layout
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    var styles = `
        ytd-rich-grid-video-renderer[mini-mode] #video-title.ytd-rich-grid-video-renderer {
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 1.6rem;
        }

        #avatar-link.ytd-rich-grid-video-renderer {
            display: none !important;
        }

        ytd-video-renderer[use-prominent-thumbs] ytd-thumbnail.ytd-video-renderer {
            min-width: 120px !important;
            max-width: 240px !important;
        }
    `;

    class YoutubeThumbnailsFixer {
        constructor() {
            this.replaceMathMin();
            this.installStyle(styles);
        }

        replaceMathMin() {
            var originalMathMin = Math.min;
            Math.min = function() {
                if (/calcElementsPerRow/img.test(Error().stack || '')) {
                    return originalMathMin.apply(Math, arguments) + 1;
                }
                return originalMathMin.apply(Math, arguments);
            };
        }

        installStyle(contents) {
            var style = document.createElement('style');
            style.innerHTML = contents;
            document.head.appendChild(style);
        }
    }

    new YoutubeThumbnailsFixer();
})();
