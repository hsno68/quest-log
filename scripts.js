function Quest(name, difficulty, points, releaseDate, completed) {
  this.name = name;
  this.difficulty = difficulty;
  this.points = points;
  this.releaseDate = releaseDate;
  this.completed = completed;
}

function addQuestToQuestLog() {
  questLog.push(new Quest());
}

const quest1 = new Quest("Cook's Assistant", "Novice", 1, "01/04/2001", true);
const quest2 = new Quest("Vampyre Slayer", "Intermediate", 3, "01/28/2001", false);
const quest3 = new Quest("Dragon Slayer I", "Experienced", 2, "09/23/2001", false);

const questLog = [quest1, quest2, quest3];