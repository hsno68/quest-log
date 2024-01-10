const questLog = [];

function Quest(name, difficulty, points, releaseDate, completed) {
  this.name = name;
  this.difficulty = difficulty;
  this.points = points;
  this.releaseDate = releaseDate;
  this.completed = completed;
}