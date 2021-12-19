const day_2 = require('../src/day_2.js');

describe("Submarine course plotter", function(){
  test("we add command 'forward 1' then the horizontal position is 1", function(){
   let course_plot = make_plotter();
   
   course_plot.move_many([move_forward(1)]);
   
   expect(course_plot.horizontal).toBe(1);
  });
  test("we add command 'down 1' then vertical position is 1", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_down(1)]);
    
    expect(course_plot.vertical).toBe(1);
  });

  test("we add command 'down 1' then 'up 1'  thern the vertical position is 0", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_down(1), move_up(1)]);
    
    expect(course_plot.vertical).toBe(0);
  });

  test("We can pass command forward twice commands as a list", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_forward(1), move_forward(2)]);
    
    expect(course_plot.horizontal).toBe(3);
  })

});

function make_plotter() {
  return new day_2.CoursePlotter();
}

function move_forward(value) {
  return day_2.Command.create("forward", value);
}

function move_down(value) {
  return day_2.Command.create("down", value);
}

function move_up(value) {
  return day_2.Command.create("up", value);
}

