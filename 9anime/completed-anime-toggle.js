// ==UserScript==
// @name        Completed Anime Toggle
// @namespace   https://github.com/CyberCollision/Userscripts
// @match       *://9anime.to/user/watch-list
// @match       *://9anime.pl/user/watch-list
// @match       *://9anime.gs/user/watch-list
// @match       *://9anime.id/user/watch-list
// @icon        https://www.google.com/s2/favicons?domain=https://9anime.me
// @version     1.0.0
// @author      CyberCollision
// @description Toggle completed anime in the watch list.
// @license     MIT
// ==/UserScript==

(function () {
  'use strict';

  var enabled = false; // Variable to track the enabled/disabled state

  // Function to hide items with a specific class and child element
  function hideItems() {
    var container = document.querySelector('div.watchlist.scaff.items'); // Select the container element

    if (container) {
      var items = container.querySelectorAll('div.item'); // Select all child elements with class "item"

      items.forEach(function (item) {
        var bullhorn = item.querySelector('i.fa-solid.fa-bullhorn'); // Check if it has the specified child element

        if (bullhorn) {
          item.style.display = 'none'; // Hide the item if the child element is found
        }
      });
    }
  }

  // Function to toggle the functionality on/off
  function toggleFunctionality(event) {
    event.preventDefault(); // Prevent the default behavior (page reload)

    enabled = !enabled; // Toggle the enabled state

    if (enabled) {
      hideItems(); // Call the hideItems function if enabled
      addButton.innerText = 'Show All'; // Update the button text
    } else {
      var container = document.querySelector('div.watchlist.scaff.items'); // Select the container element

      if (container) {
        var items = container.querySelectorAll('div.item'); // Select all child elements with class "item"

        items.forEach(function (item) {
          item.style.display = ''; // Reset the display property to show the items
        });
      }

      addButton.innerText = 'Show Completed Only'; // Update the button text
    }

    // Save the state in a cookie
    document.cookie = 'showCompleted=' + enabled + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  }

  // Create the toggle button
  var addButton = document.createElement('button');
  addButton.innerText = 'Show Completed Only';
  addButton.style.marginLeft = '4px';
  addButton.style.height = '27px';
  addButton.style.backgroundColor = '#1C1C1C';
  addButton.style.color = '#777777';
  addButton.style.borderRadius = '3px';
  addButton.style.border = 'none';
  addButton.style.transition = 'background-color 0.2s, color 0.2s';

  addButton.addEventListener('mouseover', function () {
    addButton.style.backgroundColor = '#2A2A2A';
    addButton.style.color = '#AAAAAA';
  });

  addButton.addEventListener('mouseout', function () {
    addButton.style.backgroundColor = '#1C1C1C';
    addButton.style.color = '#777777';
  });

  addButton.addEventListener('click', toggleFunctionality);

  // Find the target element to append the button
  var targetElement = document.querySelector('div.submit.filter.w-auto');

  // Insert the button after the target element
  if (targetElement && targetElement.parentNode) {
    targetElement.parentNode.insertBefore(addButton, targetElement.nextSibling);
  }

  // Check if the state is saved in a cookie
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)showCompleted\s*\=\s*([^;]*).*$)|^.*$/, '$1');

  if (cookieValue === 'true') {
    toggleFunctionality({ preventDefault: function () {} }); // Simulate a click event to enable the functionality
  }
})();
