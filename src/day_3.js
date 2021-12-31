class DiagnosticReport {
    constructor(report) {
        this.source = report;
    }
    power_consumption() {
        throw(DiagnosticReportException);
    }
    gamma_rate(){
        return parseInt(this.source, 2);
    }
    static parse(input) {
        return [input.split("").map((digit) => {return Number(digit)})];
    }
}

module.exports = {
    DiagnosticReport: DiagnosticReport
}