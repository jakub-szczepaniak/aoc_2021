const fs = require('fs');
class CourseParser{
  static build_course(steps) {
    return steps.map((step) => {
      let [direction, length] = step.split(" ");
      return Command.create(direction, Number(length));
    })
  }
  static load_from_file(filepath) {
        const data = fs.readFileSync(filepath, 'utf8')
        return this.build_course(data.split("\r\n"));
  }
}

class CoursePlotter{
  constructor(){
    this.horizontal = 0;
    this.vertical = 0;
  }
  move(movement){
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
  move_many(steps) {
    steps.forEach(step => {
      this.move(step)  
    });
  }
}

class Command{
  constructor(direction, value) {
    this.direction = direction;
    this.value = value;
  }
  static create(direction, value) {
    switch (direction) {
      case "forward":
        return new ForwardCommand(value);
      case "down" :
        return new DownCommand(value);
      case "up" :
        return new UpCommand(value)
    }
  }
}

class ForwardCommand extends Command {
  constructor(value) {
    super("forward", value);
  }
}
class DownCommand extends Command {
  constructor(value) {
    super("down", value);
  }
}
class UpCommand extends Command {
  constructor(value) {
    super("up", value);
  }
}

module.exports = {
  CoursePlotter: CoursePlotter,
  Command: Command,
  CourseParser: CourseParser
}