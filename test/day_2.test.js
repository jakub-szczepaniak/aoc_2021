const day_2 = require('../src/day_2.js');
const {tags} = require('jest-tags');

describe("Submarine course plotter", function(){
  test("after command 'forward 1', multiplier is 0", function(){
   let course_plot = make_plotter();
   
   course_plot.move_many([move_forward(1)]);
   
   expect(course_plot.multiplier()).toBe(0);
  });
  test("after command 'down 1', multiplier is 0", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_down(1)]);
    
    expect(course_plot.multiplier()).toBe(0);
  });

  test("after commands 'forward 1', 'down 2', multiplier is 2", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_forward(1), move_down(2)]);
    
    expect(course_plot.multiplier()).toBe(2);
  });

  test("after commands 'forward 1', 'forward 2', mutliplier is 0", function(){
    let course_plot = make_plotter();
    
    course_plot.move_many([move_forward(1), move_forward(2)]);
    
    expect(course_plot.multiplier()).toBe(0);
  })

  tags("integration").test("Test for the input file", function(){
    let course_plot = make_plotter();
    let course = day_2.CourseParser.load_from_file(__dirname + '/day_2.input')
    course_plot.move_many(course);
    expect(course_plot.multiplier()).toBe(1604850);
  })
});
describe("Advanced course plotter", function(){
  test("calculates for sample short input", function() {
    let course_plot = make_advanced_plotter();
    course_plot.move_many([adv_move_forward(5), adv_move_down(5), adv_move_forward(8)]);
    expect(course_plot.multiplier()).toBe(520);
  });
  test("runs for real input", function(){
    let course_plot = make_advanced_plotter();
    let course = day_2.CourseParser.load_advanced_from_file(__dirname + '/day_2.input');
    course_plot.move_many(course);
    expect(course_plot.multiplier()).toBe(1685186100)
  });
});

function make_advanced_plotter(){
  return new day_2.AdvancedCoursePlotter();
}

function make_plotter() {
  return new day_2.CoursePlotter();
}

function adv_move_forward(value){
  return day_2.Command.advanced_create("forward", value);
}
function adv_move_down(value) {
  return day_2.Command.advanced_create("down", value);
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

