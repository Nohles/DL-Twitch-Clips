chrome.tabs.onUpdated.addListener(
  (tabId: number, changedInfo: any, tab: any) => {
    // console.log(tabId);
    // console.log(changedInfo);
    // console.log(tab);
    if (tab.url) {
      if (tab.url.includes("clips.twitch.tv")) {
        const queryParam: String = tab.url.split("/")[3];

        chrome.tabs.sendMessage(
          tabId,
          {
            type: "New",
            ClipID: queryParam,
          },
          (response) => {
            // console.log(response.farewell);
          }
        );
      } else if (tab.url.includes("m.twitch.tv/clip")) {
        const queryParam: String = tab.url.split("/")[4];

        chrome.tabs.sendMessage(
          tabId,
          {
            type: "Mobile",
            ClipID: queryParam,
          },
          (response) => {
            // console.log(response.farewell);
          }
        );
      } else if (tab.url.includes("www.twitch.tv/")) {
        const queryParam: String = tab.url.split("/")[4];
        // console.log(queryParam);

        chrome.tabs.sendMessage(
          tabId,
          {
            type: "NewChannel",
            ClipID: queryParam,
          },
          (response) => {
            // console.log(response.farewell);
          }
        );
      }
    }
  }
);

chrome.runtime.onMessage.addListener(
  (request: any, sender: any, sendResponse: any) => {
    if (request.type === "Download") {
      chrome.downloads.download({
        url: request.ClipURL,
        filename: request.ClipID + ".mp4",
      });
    } else if (request.type === "Mobile") {
      chrome.tabs.update({
        url: "https://clips.twitch.tv/" + request.ClipID,
      });
    }
  }
);
