"use strict";
chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab) => {
    if (tab.url) {
        if (tab.url.includes("clips.twitch.tv")) {
            const queryParam = tab.url.split("/")[3];
            // console.log("New clip loaded: " + queryParam);
            chrome.tabs.sendMessage(tabId, {
                type: "New",
                ClipID: queryParam,
            });
        }
        else if (tab.url.includes("m.twitch.tv/clip")) {
            const queryParam = tab.url.split("/")[4];
            // console.log("New clip loaded: " + queryParam);
            chrome.tabs.sendMessage(tabId, {
                type: "Mobile",
                ClipID: queryParam,
            });
        }
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "Download") {
        // console.log(request.ClipID);
        // console.log(request.ClipURL);
        chrome.downloads.download({
            url: request.ClipURL,
            filename: request.ClipID + ".mp4",
        });
    }
    else if (request.type === "Mobile") {
        chrome.tabs.update({
            url: "https://clips.twitch.tv/" + request.ClipID,
        });
    }
});
