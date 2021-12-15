class CoursePlotter{
  constructor(){
    this.horizontal = 0;
    this.vertical = 0;
  }
  move(movement=""){
    switch (movement.direction) {
      case 'forward':
        this.horizontal = this.horizontal + movement.value;
        break;
      case 'down':
        this.vertical = this.vertical + movement.value;
        break;
      case 'up':
        this.vertical = this.vertical - movement.value;
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