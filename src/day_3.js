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
}

module.exports = {
    DiagnosticReport: DiagnosticReport
}