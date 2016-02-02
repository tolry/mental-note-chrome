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

function add_url() {
    chrome.tabs.getSelected(null, function(tab) {
        var url = options.baseUrl + "quick-add?url=" + encodeURIComponent(tab.url);
        chrome.tabs.update(tab.id, {url: url});
    });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add').addEventListener('click', add_url);

