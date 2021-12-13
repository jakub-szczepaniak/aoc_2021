const day_2 = require('../src/day_2.js');

describe("Submarine course plotter", function(){
  test("we add command forward 1 then the horizontal position is 1", function(){
   let course_plot = new CoursePlotter();
   course_plot.move("forward 1");
   expect(course_plot.horizontal).toBe(1);
  });
});

class CoursePlotter{
  constructor(){
    this.horizontal = 0;
  }
  move(command){
    this.horizontal = 1;
  }
}