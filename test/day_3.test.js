const { DiagnosticReport } = require('../src/day_3.js');
const day_3 = require('../src/day_3.js');

describe("Submarine diagnostic report", function(){
    describe("Power consumption", function(){
        test("when empty throws an error", function(){
            let subject = new day_3.DiagnosticReport([]);
            expect(() => { subject.power_consumption() }).toThrow('DiagnosticReportException');
        });
        test("when one reading, gamma rate is equal to input, decimal", function(){
            let sub = new day_3.DiagnosticReport(["00100"]);
            expect(sub.gamma_rate()).toBe(4);
        });
    });
    
})