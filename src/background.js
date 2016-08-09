var options = {};

function restore_options() {
    chrome.storage.sync.get({'baseUrl': '', 'newTab': ''}, function (items) {
        options = items;
        document.getElementById('base-url').value = items.baseUrl;
        document.getElementById('newtab').checked = items.newTab;
    });
};

restore_options();

chrome.browserAction.onClicked.addListener(function (tab) {
    var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(tab.url);
    chrome.tabs.create({url: url});
});