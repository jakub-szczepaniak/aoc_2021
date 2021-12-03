const fs = require('fs');
const path = require('path');

class SubmarineSonar {
    static build_from() {
        if((arguments.length == 1) && arguments[0].endsWith('input')) {
            return input(arguments[0]);
        } else {
            return arguments;
        }
    }
    input(filename) {

        var text = fs.readFileSync(filename).toString();
        return text.split("\r\n")
    }
}

class SonarAnalyzer {
    depth(input) {
        if (input.length <= 1) {
            return 0;
        }
        let result = 0;
        for(let i = 1; i< input.length; i++) {
            if (input[i-1]<input[i]) {
                result++;
            }  
        }
        return result;
    }
}


module.exports = {
    SonarAnalyzer: SonarAnalyzer,
    SubmarineSonar: SubmarineSonar
}