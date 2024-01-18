const table = document.querySelector(".quest-table-body");
const form = document.querySelector(".quest-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const questName = document.querySelector("#name").value;
  const questDifficulty = document.querySelector("#difficulty").value;
  const questPoints = document.querySelector("#points").value;
  const questReleaseDate = document.querySelector("#release-date").value;
  const questStatus = document.querySelector('input[name="status"]:checked').value;

  addQuestToQuestLog(questName, questDifficulty, questPoints, questReleaseDate, questStatus);
});

function addQuestToQuestLog(name, difficulty, points, releaseDate, status) {
  questLog.push(new Quest(name, difficulty, points, releaseDate, status));
}

function Quest(name, difficulty, points, releaseDate, status) {
  this.name = name;
  this.difficulty = difficulty;
  this.points = points;
  this.releaseDate = releaseDate;
  this.status = status;
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