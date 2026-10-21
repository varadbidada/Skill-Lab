const launchButton = document.querySelector("#launch-button");
const statusText = document.querySelector("#status");

// Debug mission: find why clicking the button does not update the page.
launchButton.addEventListener("click", function () {
  statusText.textContent = "Status: demo launched";
});
