const table = document.querySelector(".quest-table-body");
const form = document.querySelector(".quest-form");

//Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const questName = document.querySelector("#name").value;
  const questDifficulty = document.querySelector("#difficulty").value;
  const questPoints = document.querySelector("#points").value;
  const questStatus = document.querySelector('input[name="status"]:checked').value;
  //Formats the parsed date
  const questReleaseDate = ((date) => {
    if (!date) {
      return "";
    }
    const month = date.substring(5, 7);
    const day = date.substring(8);
    const year = date.substring(0, 4);
    return (`${month}/${day}/${year}`);
  })(document.querySelector("#release-date").value);

  const newQuest = new Quest(questName, questDifficulty, questPoints, questReleaseDate, questStatus);
  updateQuestLog(newQuest);
  form.reset();
});

function updateQuestLog(quest) {
  questLog.push(quest);
  updateQuestTable(quest);
}

//Update DOM
function updateQuestTable(quest) {
  const index = questLog.length - 1;
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("data-index", `${index}`)
  for (let prop in quest) {
    let tableCell;
    if (prop === "name") {
      tableCell = document.createElement("th");
      tableCell.setAttribute("scope", "row");
    }
    else {
      tableCell = document.createElement("td");
    }
    tableCell.textContent = quest[prop];
    tableRow.appendChild(tableCell);
  }
  const removeButton = createButton(tableRow);
  tableRow.appendChild(removeButton);
  table.appendChild(tableRow);
}

function createButton(questRow) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("material-symbols-outlined", "remove-button");
  button.textContent = "remove";
  button.addEventListener("click", () => {
    removeQuest(questRow);
  });
  return button;
}

function removeQuest(questRow) {
  const removedRow = table.removeChild(questRow);
  const removedIndex = removedRow.getAttribute("data-index");
  questLog.splice(removedIndex, 1);
  updateDOMTableIndex();
}

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

//Initial placeholder
const quest1 = new Quest("Cook's Assistant", "Novice", 1, "01/04/2001", "Completed");
const quest2 = new Quest("Vampyre Slayer", "Intermediate", 3, "01/28/2001", "Available");
const quest3 = new Quest("Dragon Slayer I", "Experienced", 2, "09/23/2001", "Available");

const questLog = [];
updateQuestLog(quest1);
updateQuestLog(quest2);
updateQuestLog(quest3);