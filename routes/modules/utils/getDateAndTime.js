function getDateAndTime(m) {
    var dateAndTime = '';
    switch (m.getMonth()) {
        case 0: 
            dateAndTime = 'Jan';
            break;
        case 1:
            dateAndTime = 'Feb';
            break;
        case 2: 
            dateAndTime = 'Mar';
            break;
        case 3:
            dateAndTime = 'Apr';
            break;
        case 4: 
            dateAndTime = 'May';
            break;
        case 5:
            dateAndTime = 'Jun';
            break;
        case 6:
            dateAndTime = 'Jul';
            break;
        case 7: 
            dateAndTime = 'Aug';
            break;
        case 8:
            dateAndTime = 'Sep';
            break;
        case 9:
            dateAndTime = 'Oct';
            break;
        case 10:
            dateAndTime = 'Nov';
            break;
        case 11:
            dateAndTime = 'Dec';
            break;
    }
    dateAndTime = dateAndTime + "/" + m.getDate().toString() + ", ";
    var min = m.getMinutes() < 10 ? "0" + m.getMinutes().toString() : m.getMinutes().toString();
    if (m.getHours() === 0) {
        dateAndTime = dateAndTime + "12:" + m.getMinutes().toString() + "am"
    } else if (m.getHours() >= 1 && m.getHours() <= 11) {
        dateAndTime = dateAndTime + m.getHours().toString() + ":" + min + "am"
    } else if (m.getHours() === 12) {
        dateAndTime = dateAndTime + m.getHours().toString() + ":" + min + "pm"
    } else {
        dateAndTime = dateAndTime + (m.getHours() - 12).toString() + ":" + min + "pm"
    }
    return dateAndTime
}

module.exports = {getDateAndTime};