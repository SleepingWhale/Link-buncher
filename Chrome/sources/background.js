var bunchEnabled = false;

function counter(n, id) {
    chrome.browserAction.setBadgeText({
        text: n,
        tabId: id
    })
}
chrome.browserAction.onClicked.addListener(
    function(tab) {
        if (!(bunchEnabled)) {
            chrome.tabs.executeScript({
                file: "content_script.js"
            });
            counter("0", tab.id);
            bunchEnabled = true;
        } else {
            chrome.tabs.executeScript({
                code: "bunchEnabled = false;"
            });
            bunchEnabled = false;
            counter("", tab.id);
        }
    });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.links) {
            for (var i = 0, l = request.links.length; i < l; i++) {
                chrome.tabs.create({
                    url: request.links[i],
                    active: false
                });
            }
            counter("0", sender.tab.id);
        }
        if (request.hasOwnProperty("counter")) {
            counter(request.counter.toString(), sender.tab.id);
        }
    });