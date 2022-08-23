var weeklypractice = ["Wednesday", "Saturday", "Sunday"]
var dagdirs = ["Pics","Vids","GoPro"];

function main() {
  var monthlydates = getPracticeDays(weeklypractice)
  Logger.log(monthlydates)
  //createAttendanceFolder(monthlydates,weeklypractice)
  createPhotosandVids_WeeklyPractice(monthlydates,weeklypractice,dagdirs)
  //Logger.log()
}

