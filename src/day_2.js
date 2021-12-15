class CoursePlotter{
  constructor(){
    this.horizontal = 0;
    this.vertical = 0;
  }
  move(command, movement=""){
    switch (movement.direction) {
      case 'forward':
        this.horizontal = this.horizontal + movement.value;
        break;
      case 'down':
        this.vertical = this.vertical + movement.value;
      }
    switch (command) {
      case 'up 1':
        this.vertical = this.vertical - 1;
        break;
      default:
        break;
    }
  }
}

class Command{
  constructor(direction, value) {
    this.direction = direction;
    this.value = value;
  }
}

module.exports = {
  CoursePlotter: CoursePlotter,
  Command: Command
}