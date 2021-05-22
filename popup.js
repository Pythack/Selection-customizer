function saveSuccess(item) {
  browser.notifications.create("selesty-save-status", {type: 'basic', title: 'Selection styler: Saving success', message: "Preferences saved successfully. ", "iconUrl": browser.runtime.getURL("./icon.png")})
  setTimeout(function(){browser.notifications.clear("selesty-save-status");}, 5000);
}

function saveError(item) {
  browser.notifications.create("selesty-save-status", {type: 'basic', title: 'Selection styler: Saving error', message: "Error saving preferences", "iconUrl": browser.runtime.getURL("./icon.png")})
  setTimeout(function(){browser.notifications.clear("selesty-save-status");}, 5000);
}

function saveOptions(e) {
  e.preventDefault();
  let preferencesSave = browser.storage.local.set({
    background_color: document.querySelector("#background_color").value || "#007ef3",
    color: document.querySelector("#color").value || "white",
    //fontSize: document.querySelector("#font-size").value || "auto",
  });
  preferencesSave.then(saveSuccess, saveError)
  browser.runtime.sendMessage({
          request:"inject-css"
  });
}

function updatePreview() {
  document.querySelector("#preview").style.background = document.querySelector("#background_color").value;
  document.querySelector("#preview").style.color = document.querySelector("#color").value;
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#background_color").value = result.background_color || "#007ef3";
    document.querySelector("#color-picker-backgroundColor").value = result.background_color || "#007ef3";
    document.querySelector("#color").value = result.color || "white";
    document.querySelector("#color-picker-textColor").value = result.color || "#ffffff";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function updatePreview() {
    document.querySelector("#preview").style.background = document.querySelector("#background_color").value;
    document.querySelector("#preview").style.color = document.querySelector("#color").value;
  }

  let getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
  updatePreview();
}


function updateColorInput() {
  var color = document.querySelector("input#color-picker-textColor").value;
  document.querySelector("input#color").value = color;
}

function updateBackgroundColorInput() {
  var color = document.querySelector("input#color-picker-backgroundColor").value;
  document.querySelector("input#background_color").value = color;
}

function updateColorInputColor() {
  var color = document.querySelector("input#color").value;
  document.querySelector("input#color-picker-textColor").value = color;
}

function updateBackgroundColorInputColor() {
  var color = document.querySelector("input#background_color").value;
  document.querySelector("input#color-picker-backgroundColor").value = color;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.addEventListener("DOMContentLoaded", updatePreview);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("key./
", updatePreview);
document.querySelector("form").addEventListener("input", updatePreview);
document.querySelector("input#color-picker-textColor").addEventListener("input", updateColorInput);
document.querySelector("input#color-picker-backgroundColor").addEventListener("input", updateBackgroundColorInput);
document.querySelector("input#color").addEventListener("input", updateColorInputColor);
document.querySelector("input#background_color").addEventListener("input", updateBackgroundColorInputColor);

/*browser.tabs.create({
    url:browser.extension.getURL('./popup.html')
});*/