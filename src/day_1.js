const fs = require('fs');
const path = require('path');

class SubmarineSonar {
    static build_report(readings){
        return readings;
    }
}

class SonarAnalyzer {
    analyze(report) {
        if (report.length < 1) { throw SonarFailure;}
        if (report.length == 1) { return this.no_previous_readings();}
        if (report.length > 1) {
            return this.count_increases(report[0], report[1]);
        }
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

module.exports = {
    SonarAnalyzer: SonarAnalyzer,
    SubmarineSonar: SubmarineSonar
}