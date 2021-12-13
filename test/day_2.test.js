const day_2 = require('../src/day_2.js');

describe("Submarine course plotter", function(){
  test("we add command forward 1 then the horizontal position is 1", function(){
   let course_plot = make_plotter();
   course_plot.move("forward 1");
   expect(course_plot.horizontal).toBe(1);
  });
  test("we add command down 1 then vertical position is 1", function(){
    let course_plot = make_plotter();
    course_plot.move("down 1");
    expect(course_plot.vertical).toBe(1);
  })

});

function make_plotter() {
  return new day_2.CoursePlotter();
}
