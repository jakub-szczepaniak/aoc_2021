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
        let readings = input.split("\r\n");
        let result = []
        readings.forEach(reading => {
            let parsed = reading.split("").map((digit) => {return Number(digit)});
            result.push(parsed)
        });
        return result;
    }
    static transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));

    }

}

module.exports = {
    DiagnosticReport: DiagnosticReport
}