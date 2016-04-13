var options = {};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        baseUrl: ''
    }, function(items) {
        options = items;
    });
};

function genericOnClick(info, tab) {
    var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(info.linkUrl);
    chrome.tabs.create({url: url});
}

restore_options();
var id = chrome.contextMenus.create({"title": "Add URL to Mental-Note", "contexts":["link"], "onclick": genericOnClick});
