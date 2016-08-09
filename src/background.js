var options = {};

function restore_options() {
    chrome.storage.sync.get({'baseUrl': '', 'newTab': false}, function (items) {
        options = items;
    });
};

restore_options();

chrome.browserAction.onClicked.addListener(function (tab) {
    var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(tab.url);

    if (options.newTab === true) {
        chrome.tabs.create({url: url});
    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: url});
        });
    }

});

