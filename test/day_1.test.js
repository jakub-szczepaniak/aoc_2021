const day_1 = require('../src/day_1.js');

describe("Sonar analyzer", function(){
    test("for empty report, throw an error", function(){
        report =make_empty_report();
        subject = new day_1.SonarAnalyzer();
        expect(() => { subject.analyze(report) } ).toThrow();
    });
    test("for single measurement, flags there is no previous measurement", function(){
        report = make_report(["0"]);;
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe("N/A - no previous measurement");
    });
    test("two equal readings -> 0 increase", function(){
        report = make_report(["1", "1"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(0);
    });
    test("two different readings -> 1 increase", function(){
        report = make_report(["1", "2"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(1);
    });

    test("two different readings -> 0 increase", function(){
        report = make_report(["2", "1"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(0);
    });

    test("2 same readings, 1 bigger -> 1 increase", function(){
        report = make_report(["1", "1", "2"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(1);
    });
    test("3 different readings -> no increase", function(){
        report = make_report(["3", "2", "1"]);
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(0);
    });
    test("for real input", function(){
        report = make_report_from_file(__dirname + '/day_1.input');
        subject = new day_1.SonarAnalyzer();
        expect(subject.analyze(report)).toBe(1215);
    })

});

function make_report(readings) {
    return day_1.SubmarineSonar.build_report(readings);
}

function make_empty_report() {
    return day_1.SubmarineSonar.build_report([]);
}
function make_report_from_file(filename) {
    return day_1.SubmarineSonar.read_from(filename);
}
