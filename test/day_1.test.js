const { it } = require('jest-circus');
const each = require('jest-each').default;
const day_1 = require('../src/day_1.js');

test("for single measurement, flags there is no previous measurement", function(){
    report = day_1.SubmarineSonar.build_report(["123"]);
    subject = new day_1.SonarAnalyzer();
    expect(subject.analyze(report)).toBe("N/A - no previous measurement");
});

test("for empty report, throw an error", function(){
    report = day_1.SubmarineSonar.build_report([]);
    subject = new day_1.SonarAnalyzer();
    expect(() => { subject.analyze(report) } ).toThrow();
})

