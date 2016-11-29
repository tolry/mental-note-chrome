var options = {};

function restore_options() {
    chrome.storage.sync.get({'baseUrl': '', 'newTab': false}, function (items) {
        options = items;
    });
};

restore_options();

function linker(info, tab) {

    var linkUrl = tab.url;

    if(info.linkUrl) {
        linkUrl = info.linkUrl;
    }

    var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(linkUrl);

    if (options.newTab === true) {
        chrome.tabs.create({url: url});
    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: url});
        });
    }
}

var id = chrome.contextMenus.create(
    {
        "title": "Add URL to Mental-Note",
        "contexts":["link"],
        "onclick": linker
    }
);

chrome.browserAction.onClicked.addListener(function (tab){
    var info = false;
    linker(info, tab);
});