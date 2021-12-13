class CoursePlotter{
  constructor(){
    this.horizontal = 0;
    this.vertical = 0;
  }
  move(command){
    switch (command) {
      case 'forward 1':
        this.horizontal = 1;
        break;
      case 'down 1': 
        this.vertical = this.vertical + 1;
        break;
      case 'up 1':
        this.vertical = this.vertical - 1;
        break;
      default:
        break;
    }
  }
}

module.exports = {
  CoursePlotter: CoursePlotter
}