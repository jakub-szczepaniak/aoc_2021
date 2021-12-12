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
    static message = "";
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
    not_available(message) {
        return `N/A - ${message}`
    }
}

class SimpleSonarAnalyzer extends SonarAnalyzer {
    static message = "no previous measurement";
    analyze(report) {
        let validator = new SonarReportValidator;
        if (validator.isValid(report.length)) {
            return this.simple_analyze(report)    
        } else {
            return this.not_available(SimpleSonarAnalyzer.message);
        }
    }
    simple_analyze(report) {
        var increases = 0;
        for(var i=1; i<=report.length; i++) {
            increases = increases + this.count_increases(report[i-1], report[i]);
        }
        return increases;
    }
}

class ComplexSonarAnalyzer extends SonarAnalyzer {
    static message = "no previous sum";
    analyze(report) {
        if (report.length < 3) { return this.not_available(ComplexSonarAnalyzer.message);}

    }
}

module.exports = {
    SimpleSonarAnalyzer: SimpleSonarAnalyzer,
    ComplexSonarAnalyzer: ComplexSonarAnalyzer,
    SubmarineSonar: SubmarineSonar
}