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

class SonarAnalyzer {
    analyze(report) {
        if (report.length < 1) { throw SonarFailure;}
        if (report.length == 1) { return this.no_previous_readings();}
        if (report.length > 1) {
            var increases = 0;
            for(var i=1; i<=report.length; i++) {
                increases = increases + this.count_increases(report[i-1], report[i]);
            }
            return increases;
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