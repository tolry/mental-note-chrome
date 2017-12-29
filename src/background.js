let options = {};
restoreOptions();

function restoreOptions() {
    chrome.storage.sync.get(
        {'baseUrl': '', 'newTab': false},
        function (items) {
            options = items;
        }
    );
};

function addLink(url, title, preview) {
    if (! url) {
        alert('no url given');

        return;
    }

    if (! options.baseUrl) {
        alert('please configure mental note base url first');

        return;
    }

    let mentalNoteUrl = options.baseUrl;
    mentalNoteUrl += "quick-add";
    mentalNoteUrl += "?url=" + encodeURIComponent(url);

    if (title) {
        mentalNoteUrl += "&title=" + encodeURIComponent(title);
    }

    if (preview) {
        mentalNoteUrl += "&preview=" + encodeURIComponent(preview);
    }

    if (options.newTab) {
        chrome.tabs.create({url: mentalNoteUrl});

        return;
    }

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: mentalNoteUrl});
    });
}

chrome.contextMenus.create({
    "title": "Add URL to Mental-Note",
    "contexts":["link"],
    "onclick": function (info) {
        addLink(info.linkUrl);
    }
});

chrome.browserAction.onClicked.addListener(function (tab){
    addLink(tab.url, tab.title);
});
