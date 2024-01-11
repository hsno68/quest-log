const table = document.querySelector(".quest-table-body");

function Quest(name, difficulty, points, releaseDate, status) {
  this.name = name;
  this.difficulty = difficulty;
  this.points = points;
  this.releaseDate = releaseDate;
  this.status = status;
}

function addQuestToQuestLog() {
  questLog.push(new Quest());
}

function updateQuestLogDisplay() {
  for (let quest of questLog) {
    const tableRow = document.createElement("tr");
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
    table.appendChild(tableRow);
  }
}

const quest1 = new Quest("Cook's Assistant", "Novice", 1, "01/04/2001", true);
const quest2 = new Quest("Vampyre Slayer", "Intermediate", 3, "01/28/2001", false);
const quest3 = new Quest("Dragon Slayer I", "Experienced", 2, "09/23/2001", false);

const questLog = [quest1, quest2, quest3];
updateQuestLogDisplay();