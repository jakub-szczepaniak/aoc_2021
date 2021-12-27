const fs = require('fs');
class CourseParser{
  static build_course(steps) {
    return steps.map((step) => {
      let [direction, length] = step.split(" ");
      return Command.create(direction, Number(length));
    })
  }
  static build_advanced_course(steps) {
    return steps.map((step) => {
      let [direction, length] = step.split(" ");
      return Command.advanced_create(direction, Number(length));
    })
  }
  static load_from_file(filepath) {
        const data = fs.readFileSync(filepath, 'utf8')
        return this.build_course(data.split("\r\n"));
  }
  static load_advanced_from_file(filepath) {
    const data = fs.readFileSync(filepath, 'utf8')
    return this.build_advanced_course(data.split("\r\n"));
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
class AdvancedPosition extends Position{
  constructor(horizontal=0, vertical=0,aim=0) {
    super(horizontal, vertical);
    this.aim = aim;
  }
}

class CoursePlotter{
  constructor(){
    this.position = new Position(0, 0);
  }

  move(command){
    this.position = command.update(this.position);
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

class AdvancedCoursePlotter extends CoursePlotter {
  constructor(horizontal=0, depth=0, aim=0) {
    super();
    this.position = new AdvancedPosition(horizontal,depth, aim);
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
  static advanced_create(direction, value) {
    switch(direction) {
      case "forward":
        return new AdvancedForwardCommand(value);
      case "down":
        return new AdvancedDownCommand(value);
      case "up":
        return new AdvancedUpCommand(value);
    }
  }
}

class ForwardCommand extends Command {
  constructor(value) {
    super("forward", value);
  }
  update(position) {
    return new Position(
      position.horizontal + this.value, 
      position.vertical);
  }
}

class AdvancedForwardCommand extends ForwardCommand {
  update(position) {
    return new AdvancedPosition(
      position.horizontal + this.value, 
      position.vertical + (this.value*position.aim),
      position.aim)
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

class AdvancedDownCommand extends DownCommand {
  update(position) {
    return new AdvancedPosition(
      position.horizontal, 
      position.vertical, 
      position.aim + this.value);
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
class AdvancedUpCommand extends UpCommand {
  update(position) {
    return new AdvancedPosition(
      position.horizontal, 
      position.vertical, 
      position.aim - this.value);
  }
}

module.exports = {
  CoursePlotter: CoursePlotter,
  Command: Command,
  CourseParser: CourseParser,
  AdvancedCoursePlotter: AdvancedCoursePlotter
}