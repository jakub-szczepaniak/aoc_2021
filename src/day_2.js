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

class Position{
  constructor(horizontal=0, vertical=0){
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
  multiplier(){
    return this.horizontal*this.vertical;
  }
}

class CoursePlotter{
  constructor(){
    this.position = new Position(0, 0);
  }

  move(movement){
    this.position = movement.update(this.position);
  }

  multiplier() {
    return this.position.multiplier();
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
  update(position) {
    return new Position(position.horizontal + this.value, position.vertical);
  }
}
class DownCommand extends Command {
  constructor(value) {
    super("down", value);
  }
  update(position) {
    return new Position(position.horizontal, position.vertical + this.value);
  }
}
class UpCommand extends Command {
  constructor(value) {
    super("up", value);
  }
  update(position) {
    return new Position(position.horizontal, position.vertical - this.value);
  }
}

module.exports = {
  CoursePlotter: CoursePlotter,
  Command: Command,
  CourseParser: CourseParser
}