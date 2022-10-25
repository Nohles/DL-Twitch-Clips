(() => {
  let twitchControll;
  chrome.runtime.onMessage.addListener(
    (request: any, sender: any, sendResponse: any) => {
      if (request.type === "New") {
        // This is the same as the line in the background script
        const queryParam = request.ClipID;

        newVideoLoaded();
      } else if (request.type === "Mobile") {
        const queryParam = request.ClipID;

        newMobileVideoLoaded(queryParam);
      }
    }
  );
  const newMobileVideoLoaded = (queryParam: string) => {
    // console.log("New Mobile Video Loaded");
    const downloadButton = document.createElement("img");
    downloadButton.src = chrome.runtime.getURL("assets/twitch.png");
    downloadButton.style.height = "30px";

    downloadButton.className = "downloadButton";
    downloadButton.title = "Download";
    twitchControll = document.getElementsByClassName(
      "Layout-sc-nxg1ff-0 jGNRNz"
    )[0];
    if (twitchControll.children[0].className === "Layout-sc-nxg1ff-0 gkQnmJ") {
      twitchControll.prepend(downloadButton);
      downloadButton.addEventListener("click", function () {
        toDesktopView(queryParam);
      });
    }
  };
  const newVideoLoaded = () => {
    const downloadButton = document.createElement("img");
    downloadButton.src = chrome.runtime.getURL("assets/twitch.png");
    downloadButton.style.height = "30px";

    downloadButton.className = "downloadButton";
    downloadButton.title = "Download";
    twitchControll = document.getElementsByClassName(
      "Layout-sc-nxg1ff-0 IYiuJ"
    )[0];
    // console.log(twitchControll.children[0]);
    if (twitchControll.children[0].className === "Layout-sc-nxg1ff-0 pqFci") {
      twitchControll.prepend(downloadButton);
      downloadButton.addEventListener("click", DownloadClips);
    }
  };

  const DownloadClips = () => {
    const video = document.getElementsByTagName("video")[0];
    const videoSrc = video.src;
    const videoName = document
      .getElementsByClassName("CoreText-sc-cpl358-0 iDQzRR")
      .item(0)?.textContent;
    console.log(videoSrc);
    console.log(videoName);
    chrome.runtime.sendMessage({
      type: "Download",
      ClipID: videoName,
      ClipURL: videoSrc,
    });
  };
  const toDesktopView = (queryParam: string) => {
    console.log("queryParam");
    chrome.runtime.sendMessage({
      type: "Mobile",
      ClipID: queryParam,
    });
  };
})();
