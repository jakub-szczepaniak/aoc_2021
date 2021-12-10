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
        return this.no_previous_readings();
    }
    
    no_previous_readings(){
        return "N/A - no previous measurement"
    }
}


module.exports = {
    SonarAnalyzer: SonarAnalyzer,
    SubmarineSonar: SubmarineSonar
}