function GetAll(date=Date, scheduleddays=Array) {

    var daysoftheweek = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 0,
    };

    var month = date.getMonth();
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var lastDay = lastDayOfMonth.getDate();
    var alldays = [];

    var numberofdays = scheduleddays.length;
    for (daynum = 0; daynum < numberofdays; daynum++) {
        var weekdaysofthemonth = {};
        var practicedates = [];
        for (var i = 0; i <= lastDay; i++) {
            var temp = new Date(date.getFullYear(), month, i);
            var weekdaystring = scheduleddays[daynum]
            var dayoftheweek = daysoftheweek[weekdaystring]
            var day = temp.getDay();

            if (day == dayoftheweek) // Passed as an arg
            {

                var dd = temp.getDate();
                var mm = temp.getMonth() + 1;
                var monthlength = mm.toString().length
                var daylength = dd.toString().length
                var mm0 = monthlength == 1 ? ('0' + mm.toString()) : mm.toString();
                var dd0 = daylength == 1 ? ('0' + dd.toString()) : dd.toString();


                var yyyy = temp.getFullYear();
                alldays.push(yyyy + "-" + mm0 + "-" + dd0)

            }

        }
        //weekdaysofthemonth[weekdaystring] = practicedates
        //alldays.push(weekdaysofthemonth)
        if (alldays.length == numberofdays) {
            break
        }
    }
    return alldays

}


function getCurrentMonth(Null){
  var today = new Date();
  var thismonth = Utilities.formatDate(today,'America/Dallas','YYYY-MM');
  return thismonth
}

function getPracticeDays(weeklypractice=Array) {
    var date = new Date()
    var alldays = GetAll(date, weeklypractice)
    return alldays

}
