const table = document.querySelector(".quest-table-body");
const form = document.querySelector(".quest-form");

//Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const questName = document.querySelector("#name").value;
  const questDifficulty = document.querySelector("#difficulty").value;
  const questPoints = document.querySelector("#points").value;
  const questReleaseDate = dateFormatter(document.querySelector("#release-date").value);
  const questStatus = document.querySelector('input[name="status"]:checked').value;

  const newQuest = new Quest(questName, questDifficulty, questPoints, questReleaseDate, questStatus);
  updateQuestLog(newQuest);
  form.reset();
});

//Format the parsed date
function dateFormatter(date) {
  if (!date) {
    return "";
  }
  const month = date.substring(5, 7);
  const day = date.substring(8);
  const year = date.substring(0, 4);
  return (`${month}/${day}/${year}`);
}

function updateQuestLog(quest) {
  questLog.push(quest);
  updateQuestTable(quest);
}

//Generate DOM
function updateQuestTable(quest) {
  const index = questLog.length - 1;
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("data-index", `${index}`)
  tableRow.addEventListener("click", () => { //Toggle quest status
    quest.toggleStatus(tableRow)
  });
  for (let prop in quest) {
    if (!quest.hasOwnProperty(prop)) {
      continue;
    }
    let tableCell;
    if (prop === "name") {
      tableCell = document.createElement("th");
      tableCell.setAttribute("scope", "row");
    }
    else {
      tableCell = document.createElement("td");
    }
    if (prop === "status") { //Add marker to status cell
      tableCell.setAttribute("data-status", "");
    }
    tableCell.textContent = quest[prop];
    tableRow.appendChild(tableCell);
  }
  const removeButton = createButton(tableRow); //Button creation
  tableRow.appendChild(removeButton);
  table.appendChild(tableRow);
}

//Button creation
function createButton(questRow) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("material-symbols-outlined", "remove-button");
  button.textContent = "remove";
  button.addEventListener("click", () => {
    removeQuest(questRow); //Remove functionality
  });
  return button;
}

//Remove quest
function removeQuest(questRow) {
  const removedRow = table.removeChild(questRow);
  const removedIndex = removedRow.getAttribute("data-index");
  questLog.splice(removedIndex, 1);
  updateDOMTableIndex(); //Update DOM index
}

//Update DOM with new index positions from new array
function updateDOMTableIndex() {
  const tableRows = document.querySelectorAll("tbody > tr");
  if (questLog.length > 0 && tableRows.length > 0) {
    for (let i = 0; i < questLog.length; i++) {
      tableRows[i].setAttribute("data-index", `${i}`);
    }
  }
}

//Constructor
function Quest(name, difficulty, points, releaseDate, status) {
  this.name = name;
  this.difficulty = difficulty;
  this.points = points;
  this.releaseDate = releaseDate;
  this.status = status;
}

//Quest status toggle
Quest.prototype.toggleStatus = function(row) {
  const statusCell = row.querySelector("td[data-status]");
  if (this.status === "Available") {
    this.status = "Completed";
    statusCell.textContent = "Completed";
  }
  else {
    this.status = "Available";
    statusCell.textContent = "Available";
  }
}

//Initial placeholder
const quest1 = new Quest("Cook's Assistant", "Novice", 1, "01/04/2001", "Completed");
const quest2 = new Quest("Vampyre Slayer", "Intermediate", 3, "01/28/2001", "Available");
const quest3 = new Quest("Dragon Slayer I", "Experienced", 2, "09/23/2001", "Available");

const questLog = [];
updateQuestLog(quest1);
updateQuestLog(quest2);
updateQuestLog(quest3);