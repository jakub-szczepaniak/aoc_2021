const day_2 = require('../src/day_2.js');

describe("Submarine course plotter", function(){
  test("we add command 'forward 1' then the horizontal position is 1", function(){
   let course_plot = make_plotter();
   let command = move_forward(1);
   course_plot.move("forward 1", command);
   expect(course_plot.horizontal).toBe(1);
  });
  test("we add command 'down 1' then vertical position is 1", function(){
    let course_plot = make_plotter();
    let command = move_down(1);
    course_plot.move("down 1", command);
    expect(course_plot.vertical).toBe(1);
  });

  test("we add command 'down 1' then 'up 1'  thern the vertical position is 0", function(){
    let course_plot = make_plotter();
    let command = move_down(1);
    course_plot.move("down 1", command);
    expect(course_plot.vertical).toBe(1);
    course_plot.move("up 1");
    expect(course_plot.vertical).toBe(0);
  });

  test("we add command forward twice -> then horizontal position should be 2", function(){
    let course_plot = make_plotter();
    let command = move_forward(1);
    course_plot.move("forward 1", command);
    course_plot.move("forward 1", command);
    expect(course_plot.horizontal).toBe(2);
  });

});

function make_plotter() {
  return new day_2.CoursePlotter();
}

function move_forward(value) {
  return new day_2.Command("forward", value);
}

function move_down(value) {
  return new day_2.Command("down", value);
}

