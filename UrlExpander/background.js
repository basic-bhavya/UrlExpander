chrome.contextMenus.create({
  title: "Expand URL",
  id: "url",
  contexts: ["link", "selection"],
});

const getExpandedUrl = async (url) => {
  let expandedUrl = await fetch(`http://expandurl.com/api/v1/?url=${url}`).then(
    (res) => res.text()
  );
  return expandedUrl;
};

chrome.contextMenus.onClicked.addListener(async (clickData, tab) => {
  let url, selection;
  console.log("clickData", clickData, "tab", tab);
  if (clickData.menuItemId == "url" && clickData.linkUrl) {
    url = clickData.linkUrl;
    selection = false;
    if (clickData.linkUrl.length > 100) {
      url = decodeURIComponent(url.substring(url.search("&q=") + 3));
    }
  } else if (clickData.selectionText) {
    // console.log("selected text", clickData.selectionText);
    url = clickData.selectionText;
    selection = true;
  }

  let expandedUrl = await getExpandedUrl(url);
  chrome.tabs.sendMessage(
    tab.id,
    {
      url: url,
      expandedUrl: expandedUrl,
      text: "inject",
      selection: selection,
    },
    (element) => {
      console.log(element);
    }
  );
  console.log(expandedUrl);
});

// let link = "https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbFNwSlFCSXJBVnBBWE91UWFDZGlTaC1wOTR6d3xBQ3Jtc0ttZG1SVGR4Nm5MWkV2NXlhd1AwQkZXSU5vSS1Tano2ZV92WGx6d1pnWUJ3bXN0cUt6ZnFXdEZ0TmhOaUJkVHVxaHdkM3JUVHdCZXFWNU03SlVwUFpXV0RDSmJSTTZJV0hCTW1vbkFBT3NkMUhzdGd1cw&q=https%3A%2F%2Flinktr.ee%2Farshgoyal";

// let str = link.substring(link.search("&q=") + 3);
// console.log(decodeURIComponent(str));

// console.log("https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbFNwSlFCSXJBVnBBWE91UWFDZGlTaC1wOTR6d3xBQ3Jtc0ttZG1SVGR4Nm5MWkV2NXlhd1AwQkZXSU5vSS1Tano2ZV92WGx6d1pnWUJ3bXN0cUt6ZnFXdEZ0TmhOaUJkVHVxaHdkM3JUVHdCZXFWNU03SlVwUFpXV0RDSmJSTTZJV0hCTW1vbkFBT3NkMUhzdGd1cw&q=https%3A%2F%2Flinktr.ee%2Farshgoyal".length);
