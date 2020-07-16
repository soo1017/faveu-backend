function generateArrayOfRandomInteger(low1, high1) {
    var array_randomnum = [];
    var diff = high1 - low1;
    for (var n=0; n<=diff; n++) {
        var rannum = Math.floor(Math.random() * (high1 - low1 + 1) + low1);;
        var flag_match = false;
        for (var m=0; m<=n; m++) {
            if (array_randomnum[m] === rannum) {
                flag_match = true;
                break;
            }
        }
        if (flag_match == false) {
            array_randomnum[n] = rannum;
        } else {
            n--;
            flag_match = false;
        }
    }
    return array_randomnum;
}

module.exports = {generateArrayOfRandomInteger}