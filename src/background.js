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

restore_options();

chrome.browserAction.onClicked.addListener(function(tab) {
    var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(tab.url);
    chrome.tabs.create({url: url});
});