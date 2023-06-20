// ==UserScript==
// @name         YouTube Custom Element Remover
// @namespace    https://github.com/CyberCollision/Userscripts
// @match        *://*.youtube.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=https://www.youtube.com
// @version      1.0.1
// @author       CyberCollision
// @description  This script removes specified buttons and elements on the YouTube homepage, providing a cleaner and more customized browsing experience.
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function removeElements() {
        // const homeButton = document.querySelector('a[title="Home"]');
        // if (homeButton?.parentNode) {
        //     homeButton.parentNode.removeChild(homeButton);
        // }

        const targetButtons = document.querySelectorAll(
            'a[title="Shorts"],' +
            'a[title="Library"],' +
            'a[title="Your videos"],' +
            'a[title="Watch later"]'
        );

        targetButtons.forEach(button => {
            if (button?.parentNode) {
                button.parentNode.removeChild(button);
            }
        });
    }

    removeElements();

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            const addedNodes = mutation.addedNodes;
            for (let i = 0; i < addedNodes.length; i++) {
                const node = addedNodes[i];
                if (node instanceof HTMLElement) {
                    // const homeButton = node.querySelector('a[title="Home"]');
                    // if (homeButton?.parentNode) {
                    //     homeButton.parentNode.removeChild(homeButton);
                    // }

                    const targetButtons = node.querySelectorAll(
                        'a[title="Shorts"],' +
                        'a[title="Library"],' +
                        'a[title="Your videos"],' +
                        'a[title="Watch later"]'
                    );

                    targetButtons.forEach(button => {
                        if (button?.parentNode) {
                            button.parentNode.removeChild(button);
                        }
                    });
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
