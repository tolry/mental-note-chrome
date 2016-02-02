// source from https://developer.chrome.com/extensions/optionsV2

var options = {};

// Saves options to chrome.storage.sync.
function save_options() {
  var baseUrl = document.getElementById('base-url').value;
  chrome.storage.sync.set({
    baseUrl: baseUrl
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    baseUrl: ''
  }, function(items) {
    document.getElementById('base-url').value = items.baseUrl;
  });
};


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
