class CoursePlotter{
  constructor(){
    this.horizontal = 0;
    this.vertical = 0;
  }
  move(command){
    this.horizontal = 1;
    this.vertical = 1;
  }
}

module.exports = {
  CoursePlotter: CoursePlotter
}