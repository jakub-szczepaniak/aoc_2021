const day_1 = require('../src/day_1.js');

describe("Sonar analyzer", function(){
    test("for empty report, throw an error", function(){
        report =make_empty_report();
        subject = new day_1.SonarAnalyzer();
        expect(() => { subject.analyze(report) } ).toThrow();
    });
    test("for single measurement, flags there is no previous measurement", function(){
        report = make_report(["123"]);;
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe("N/A - no previous measurement");
    });
    test("two equal statements -> 0 increase", function(){
        report = make_report(["123", "123"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(0);
    });
});

function make_report(readings) {
    return day_1.SubmarineSonar.build_report(readings);
}

function make_empty_report() {
    return day_1.SubmarineSonar.build_report([]);
}
