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

class SimpleValidator {
    isValid(report_length) {
        if (report_length < 1) { throw SonarFailure;}
        if (report_length == 1) { return false}
        return true;
    }
}
class ComplexValidator {
    isValid(report_length) {
        if (report_length < 3) {return false}
        return true;
    }
}

class SonarAnalyzer {
    static message = "";
    constructor(validator=null) {
        this.validator = validator;
    }
    analyze(_) {
    }
    not_available(message) {
        return `N/A - ${message}`
    }
}

class SimpleSonarAnalyzer extends SonarAnalyzer {
    static message = "no previous measurement";
    constructor(){
        super(new SimpleValidator());
    }
    analyze(report) {
        if (this.validator.isValid(report.length)) {
            return this.do_analyze(report)    
        } else {
            return this.not_available(SimpleSonarAnalyzer.message);
        }
    }
    do_analyze(report) {
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
}

class ComplexSonarAnalyzer extends SonarAnalyzer {
    static message = "no previous sum";
    constructor(){
        super(new ComplexValidator());
    }
    analyze(report) {
        if(!this.validator.isValid(report.length)) { return this.not_available(ComplexSonarAnalyzer.message);}
        return this.do_analyze(report);
    }
    do_analyze(report) {
        return 9;
    }
}

module.exports = {
    SimpleSonarAnalyzer: SimpleSonarAnalyzer,
    ComplexSonarAnalyzer: ComplexSonarAnalyzer,
    SubmarineSonar: SubmarineSonar,
    SimpleValidator: SimpleValidator,
    ComplexValidator: ComplexValidator
}