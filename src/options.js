var options = {};

function save_options() {
    var baseUrl = document.getElementById('base-url').value;
    var newTab = document.getElementById('newtab').checked;

    chrome.storage.sync.set(
        {'baseUrl': baseUrl, 'newTab': newTab}, function () {
            var status = document.getElementById('status');
            status.textContent = 'Options saved!';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        }
    );
};

function restore_options() {
    chrome.storage.sync.get(
        {'baseUrl': '', 'newTab': false}, function (items) {
            document.getElementById('base-url').value = items.baseUrl;
            document.getElementById('newtab').checked = items.newTab;
        }
    );
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
