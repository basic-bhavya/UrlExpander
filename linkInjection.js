chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text === "inject") {
    if (!message.selection) {
      let allEle = document.getElementsByTagName("a");
      // console.log(allEle);
      for (const a of allEle) {
        if (a.innerHTML === message.url) {
          // console.log(a, "is my link");
          a.innerHTML = message.expandedUrl;
        }
      }
    } else {
      let allEle = document.getElementsByTagName("*");
      // console.log(allEle);
      for (const a of allEle) {
        // console.log(a);
        if (a.innerHTML && a.innerHTML.includes(message.url)) {
          let txt = a.innerHTML;
          txt = txt.replace(message.url, message.expandedUrl);
          a.innerHTML = txt;
        }
      }
      console.log("done");
    }
    // document.querySelector("a").innerHTML = message.expandedUrl;

    // injectLink(document.children)
  }
});
