"use strict";
chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab) => {
    if (tab.url && tab.url.includes("clips.twitch.tv")) {
        const queryParam = tab.url.split("/")[3];
        // console.log("New clip loaded: " + queryParam);
        chrome.tabs.sendMessage(tabId, {
            type: "New",
            ClipID: queryParam,
        });
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
});
