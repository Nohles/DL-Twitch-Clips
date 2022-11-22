(() => {
  let twitchControll;
  chrome.runtime.onMessage.addListener(
    (request: any, sender: any, sendResponse: any) => {
      if (request.type === "New") {
        // This is the same as the line in the background script
        const queryParam = request.ClipID;

        newVideoLoaded();
        sendResponse({ farewell: "goodbye" });
        return true;
      } else if (request.type === "Mobile") {
        const queryParam = request.ClipID;

        newMobileVideoLoaded(queryParam);
        sendResponse({ farewell: "goodbye" });
      } else if (request.type === "NewChannel") {
        const queryParam = request.ClipID;

        newChannelVideoLoaded(queryParam);
        sendResponse({ farewell: "goodbye" });
      }
    }
  );

  const newChannelVideoLoaded = (queryParam: string) => {
    // console.log("newChannelVideoLoaded");
    const downloadButton = document.createElement("button");
    const content = document.createTextNode("Download Clip");
    console.log("testing");
    downloadButton.style.height = "30px";
    downloadButton.style.width = "120px";
    downloadButton.style.backgroundColor = "hsl(0deg 0% 100% / 15%)";
    downloadButton.style.color = "white";
    downloadButton.style.borderRadius = "4px";
    downloadButton.style.textAlign = "center";
    downloadButton.style.alignItems = "center";
    downloadButton.style.justifyContent = "center";
    downloadButton.style.verticalAlign = "middle";
    downloadButton.style.position = "relative";
    downloadButton.style.overflow = "hidden";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.marginBottom = "10px";

    downloadButton.className = "downloadButton";
    downloadButton.title = "Download";
    downloadButton.appendChild(content);
    twitchControll = document.getElementsByClassName(
      "Layout-sc-1xcs6mc-0 dnWYEl"
    )[0];
    if (
      twitchControll.children[0].className ===
        "ScCoreButton-sc-ocjdkq-0 ScCoreButtonSecondary-sc-ocjdkq-2 ibtYyW hUInuk" ||
      twitchControll.children[0].className === "Layout-sc-1xcs6mc-0 jQeTFX"
    ) {
      twitchControll.prepend(downloadButton);

      downloadButton.addEventListener("click", DownloadClips);
    }
  };
  const newMobileVideoLoaded = (queryParam: string) => {
    const downloadButton = document.createElement("div");
    const content = document.createTextNode("Go to Desktop Version");
    downloadButton.appendChild(content);
    downloadButton.style.backgroundColor = "rgb(145, 71, 255)";
    downloadButton.style.height = "30px";
    downloadButton.style.width = "140px";

    downloadButton.style.color = "white";
    downloadButton.style.borderRadius = "4px";
    downloadButton.style.display = "flex";
    downloadButton.style.alignItems = "center";
    downloadButton.style.justifyContent = "center";
    downloadButton.style.verticalAlign = "middle";
    downloadButton.style.position = "relative";
    downloadButton.style.overflow = "hidden";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.marginRight = "10px";
    downloadButton.className = "downloadButton";
    downloadButton.title = "Download";

    twitchControll = document.getElementsByClassName(
      "Layout-sc-nxg1ff-0 jGNRNz"
    )[0];
    if (twitchControll.children[0].className === "Layout-sc-nxg1ff-0 iFMMAq") {
      twitchControll.prepend(downloadButton);
      downloadButton.addEventListener("click", function () {
        toDesktopView(queryParam);
      });
    }
  };
  const newVideoLoaded = () => {
    const downloadButton = document.createElement("button");
    const content = document.createTextNode("Download Clip");

    downloadButton.style.height = "30px";
    downloadButton.style.width = "120px";
    downloadButton.style.backgroundColor = "hsl(0deg 0% 100% / 15%)";
    downloadButton.style.color = "white";
    downloadButton.style.borderRadius = "4px";
    downloadButton.style.textAlign = "center";
    downloadButton.style.alignItems = "center";
    downloadButton.style.justifyContent = "center";
    downloadButton.style.verticalAlign = "middle";
    downloadButton.style.position = "relative";
    downloadButton.style.overflow = "hidden";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.marginBottom = "10px";
    downloadButton.style.marginLeft = "10px";
    downloadButton.style.marginTop = "10px";
    downloadButton.className = "downloadButton";
    downloadButton.title = "Download";
    downloadButton.appendChild(content);
    twitchControll = document.getElementsByClassName(
      "Layout-sc-1xcs6mc-0 jJplWu"
    )[0];
    if (twitchControll.lastElementChild?.className !== "downloadButton") {
      twitchControll.append(downloadButton);

      downloadButton.addEventListener("click", DownloadClips);
    }
  };

  const DownloadClips = () => {
    const video = document.getElementsByTagName("video")[0];
    const videoSrc = video.src;
    let videoName = document
      .getElementsByClassName("CoreText-sc-1txzju1-0 glTIMN")
      .item(0)?.textContent;
    if (videoName === undefined || videoName === null) {
      videoName = document
        .getElementsByClassName("CoreText-sc-cpl358-0 hqa-DkR")
        .item(0)?.textContent;
    }

    const regex = /[^\w\s]/gi;
    videoName = videoName?.substring(0, 255).replace(regex, "");

    // console.log(videoSrc);
    // console.log(videoName);
    chrome.runtime.sendMessage(
      {
        type: "Download",
        ClipID: videoName,
        ClipURL: videoSrc,
      },
      (response) => {
        // console.log(response.farewell);
      }
    );
  };
  const toDesktopView = (queryParam: string) => {
    console.log("queryParam");
    chrome.runtime.sendMessage(
      {
        type: "Mobile",
        ClipID: queryParam,
      },
      (response) => {
        // console.log(response);
      }
    );
  };
})();
