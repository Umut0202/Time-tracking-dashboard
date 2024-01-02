const tabs = {
  daily: document.getElementById("daily"),
  weekly: document.getElementById("weekly"),
  monthly: document.getElementById("monthly"),
};

window.addEventListener("load", () => updateData("daily"));

Object.entries(tabs).forEach(([key, tab]) => {
  tab.addEventListener("click", () => {
    updateTabColors(key);
    updateData(key);
  });
});

function updateTabColors(activeTab) {
  Object.values(tabs).forEach((tab) => (tab.style.color = "#5858b4"));
  tabs[activeTab].style.color = "#FAFAFA";
}

function updateData(timeFrame) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((value, index) => {
        const titleElement = document.getElementById(`title-${index}`);
        const currentHoursElement = document.getElementById(`current-${index}`);

        titleElement.innerText = value.title;
        currentHoursElement.innerHTML = `${
          value.timeframes[timeFrame].current
        } hrs <span>${getPreviousText(
          timeFrame,
          value.timeframes[timeFrame].previous
        )}</span>`;
      });
    });
}

function getPreviousText(timeFrame, previous) {
  switch (timeFrame) {
    case "daily":
      return `Yesterday - ${previous}hrs`;
    case "weekly":
      return `Last Week - ${previous}hrs`;
    default:
      return `Last Month - ${previous}hrs`;
  }
}
