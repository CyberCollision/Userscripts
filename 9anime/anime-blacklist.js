// ==UserScript==
// @name        Anime Blacklist
// @namespace   https://github.com/CyberCollision/Userscripts
// @match       https://9anime.pl/filter
// @icon        https://www.google.com/s2/favicons?domain=https://9anime.me
// @version     2.0.0
// @author      CyberCollision
// @description Adds a blacklist to 9anime
// @grant       GM_getValue
// @grant       GM_setValue
// @license     MIT
// ==/UserScript==

(function() {
  var blacklist = GM_getValue("blacklist", []);

  function saveBlacklist() {
    GM_setValue("blacklist", blacklist);
  }

  function removeShowFromBlacklist(showId) {
    var index = blacklist.indexOf(showId);
    if (index !== -1) {
      blacklist.splice(index, 1);
      saveBlacklist();
    }
  }

  function createUI() {
    var container = document.createElement("div");
    container.setAttribute("id", "blacklist-container");
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "178px";
    container.style.padding = "10px";
    container.style.background = "#1C1C1C";
    container.style.borderRadius = "5px";
    container.style.zIndex = "9999";
    container.style.display = "none";

    var input = document.createElement("input");
    input.style.background = "#141414";
    input.style.border = 'none';
    input.style.color = '#666';
    input.style.padding = "5px 10px";
    input.style.borderRadius = "5px";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Drag & Drop Show Here");
    input.style.marginBottom = "10px";

    var addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.style.background = "#141414";
    addButton.style.border = 'none';
    addButton.style.borderRadius = "5px";
    addButton.style.color = '#666';
    addButton.style.padding = "3px 10px";
    addButton.style.marginRight = "7px";
    addButton.addEventListener("click", function() {
      var showId = input.value.trim();
      var urlPrefix = "https://9anime.pl/watch/";
      if (showId.startsWith(urlPrefix)) {
        showId = showId.substring(urlPrefix.length);
      }
      if (showId !== "" && !blacklist.includes(showId)) {
        blacklist.push(showId);
        saveBlacklist();
        createBlacklistItems();
        input.value = "";
      }
    });

    var reloadButton = document.createElement("button");
    reloadButton.style.background = "#141414";
    reloadButton.style.border = 'none';
    reloadButton.style.padding = "3px 10px";
    reloadButton.style.color = '#666';
    reloadButton.textContent = "Reload";
    reloadButton.style.borderRadius = "5px";
    reloadButton.style.marginRight = "7px";
    reloadButton.addEventListener("click", function() {
      location.reload();
    });

    var buttonsContainer = document.createElement("div");
    buttonsContainer.style.marginBottom = "5px";
    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(reloadButton);

    var blacklistItemsContainer = document.createElement("div");
    blacklistItemsContainer.style.marginTop = "10px";
    blacklistItemsContainer.style.maxHeight = "300px";
    blacklistItemsContainer.style.maxWidth = "300px";
    blacklistItemsContainer.style.overflowY = "auto";

    function createBlacklistItems() {
      blacklistItemsContainer.innerHTML = "";
      for (var i = 0; i < blacklist.length; i++) {
        var showId = blacklist[i];
        var itemContainer = document.createElement("div");
        itemContainer.style.display = "flex";
        itemContainer.style.alignItems = "center";
        itemContainer.style.marginBottom = "5px";
        var showIdLink = document.createElement("a");
        showIdLink.textContent = showId;
        showIdLink.style.flex = "1";
        showIdLink.style.cursor = "pointer";

        // Use an IIFE to create a new function scope and capture the correct value of showId
        (function(showId) {
          showIdLink.addEventListener("click", function() {
            var url = "https://9anime.pl/watch/" + showId;
            window.location.href = url;
          });
        })(showId);

        var removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.style.background = "#141414";
        removeButton.style.border = 'none';
        removeButton.style.borderRadius = "5px";
        removeButton.style.padding = "5px 10px";
        removeButton.style.color = '#666';
        removeButton.style.marginLeft = "5px";
        removeButton.addEventListener("click", (function(showId) {
          return function() {
            removeShowFromBlacklist(showId);
            createBlacklistItems();
          };
        })(showId));
        itemContainer.appendChild(showIdLink);
        itemContainer.appendChild(removeButton);
        blacklistItemsContainer.appendChild(itemContainer);
      }
    }

    function createImportExportButtons() {
      var importButton = document.createElement("button");
      importButton.textContent = "Import";
      importButton.style.background = "#141414";
      importButton.style.border = 'none';
      importButton.style.borderRadius = "5px";
      importButton.style.color = '#666';
      importButton.style.padding = "3px 10px";
      importButton.style.marginRight = "7px";
      importButton.addEventListener("click", function() {
        var importedBlacklist = prompt("Enter the blacklist (comma-separated show IDs):");
        if (importedBlacklist) {
          var newShows = importedBlacklist.split(",").map(function(show) {
            return show.trim();
          });
          blacklist = blacklist.concat(newShows.filter(function(show) {
            return !blacklist.includes(show);
          }));
          saveBlacklist();
          createBlacklistItems();
        }
      });

      var exportButton = document.createElement("button");
      exportButton.textContent = "Export";
      exportButton.style.background = "#141414";
      exportButton.style.border = 'none';
      exportButton.style.borderRadius = "5px";
      exportButton.style.padding = "3px 10px";
      exportButton.style.color = '#666';
      exportButton.style.width = "70px";
      exportButton.addEventListener("click", function() {
        var exportedBlacklist = blacklist.join(", ");
        prompt("Copy the exported blacklist:", exportedBlacklist);
      });

      container.appendChild(importButton);
      container.appendChild(exportButton);
    }

    container.appendChild(input);
    container.appendChild(buttonsContainer);
    container.appendChild(blacklistItemsContainer);
    createBlacklistItems();
    createImportExportButtons();
    document.body.appendChild(container);
  }

  createUI();

  var searchContainer = document.querySelector("#search");

  var toggleButton = document.createElement("button");
  toggleButton.textContent = "- Blacklist";
  toggleButton.style.background = "#141414";
  toggleButton.style.color = '#666';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = "6.7px";
  toggleButton.style.marginLeft = "5px";
  toggleButton.style.verticalAlign = "middle";
  toggleButton.style.display= "inline-block";
  toggleButton.style.padding = "8px 15px";
  toggleButton.style.width = "100px";
  toggleButton.style.fontSize = "14.5px";
  toggleButton.addEventListener("click", function() {
    var container = document.querySelector("#blacklist-container");
    var isMinimized = container.style.display === "none";
    container.style.display = isMinimized ? "block" : "none";
    toggleButton.textContent = isMinimized ? "+ Blacklist" : "- Blacklist";
  });

  var toggleButtonWrapper = document.createElement("div");
  toggleButtonWrapper.style.display = "inline-block";
  toggleButtonWrapper.style.verticalAlign = "middle";
  toggleButtonWrapper.style.marginLeft = "5px";

  toggleButtonWrapper.appendChild(toggleButton);

  searchContainer.parentNode.insertBefore(toggleButtonWrapper, searchContainer.nextSibling);

  var items = document.querySelectorAll("#list-items .item");

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var link = item.querySelector("a");
    var href = link.getAttribute("href");
    var showId = href.match(/\/watch\/([^/]+)/)[1];
    if (blacklist.includes(showId)) {
      item.remove();
    }
  }
})();
