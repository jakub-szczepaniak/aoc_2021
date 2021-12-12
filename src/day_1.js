const fs = require('fs');
const path = require('path');

class SubmarineSonar {
    static build_report(readings){
        return readings.map((reading) => {return Number(reading)});
    }
    static read_from(filepath) {
        const data = fs.readFileSync(filepath, 'utf8')
        return this.build_report(data.split("\r\n"));
    }
}

class SonarReportValidator {
    isValid(report_length) {
        if (report_length < 1) { throw SonarFailure;}
        if (report_length == 1) { return false}
        return true;
    }
}

class SonarAnalyzer {
    analyze(report) {
        let validator = new SonarReportValidator;
        if (validator.isValid(report.length)) {
            return this.simple_analyze(report)    
        } else {
            return this.no_previous_readings();
        }
    }
    simple_analyze(report) {
        var increases = 0;
        for(var i=1; i<=report.length; i++) {
            increases = increases + this.count_increases(report[i-1], report[i]);
        }
        return increases;
    }
    count_increases(reading_1, reading_2) {
        if (reading_1 < reading_2){
            return 1;
        } else {
            return 0;
        }
    }
    
    no_previous_readings(){
        return "N/A - no previous measurement"
    }
}

class ComplexSonarAnalyzer extends SonarAnalyzer {
    analyze(report) {
        if (report.length < 3) { return this.no_previous_sum();}

    }
    no_previous_sum() {
        return "N/A - no previous sum";
    }
}

module.exports = {
    SonarAnalyzer: SonarAnalyzer,
    ComplexSonarAnalyzer: ComplexSonarAnalyzer,
    SubmarineSonar: SubmarineSonar
}