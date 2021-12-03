const day_1 = require('../src/day_1.js');

test("for single element, returns 0", function(){
    readings = day_1.SubmarineSonar.build_from("123");
    subject = new day_1.SonarAnalyzer();
    expect(subject.depth(readings)).toBe(0);
});

test("for 2 elements, if first is lower than 2nd, return 1", function(){
    readings = day_1.SubmarineSonar.build_from("123", "234");
    subject = new day_1.SonarAnalyzer();
    expect(subject.depth(readings)).toBe(1);
});

test.skip("For big readings returns solution value", function (){
    readings = day_1.SubmarineSonar.build_from(__dirname + "/day_1.input");
    subject = new day_1.SonarAnalyzer();
    expect(subject.depth(readings)).toBe(42);
}) 
