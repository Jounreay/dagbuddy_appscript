function getFolders(name = String) {
    try {
        return DriveApp.getFoldersByName(name).next()
    } catch (RangeError) {}
    Logger.log(`Name: ${name} is not a valid directory, please create the directory or provide a valid name for it.`)
    throw Error(RangeError);
}

//Typing isnt enforced here because I cannot declare the type of object in appscript, apparently. 
//Left is a DriveApp obj, right is an array
function createSubFolders(topfolders=Array, childfolders = Array) {
    var createdfolders = [];
    Logger.log(topfolders.length)
    if (!topfolders.length){
      for (i = 0; i < childfolders.length; i++) {
        Logger.log(`Creating folder: ${childfolders[i]} in directory ${topfolders}`)
        var createdfolder = topfolders.createFolder(childfolders[i])
        createdfolders.push(createdfolder);
      }
    } else {
          for (i = 0; topfolders.length > i; i++){
            for (k =0; childfolders.length > k; k++){
                      Logger.log(`Creating folder: ${childfolders[k]} in directory ${topfolders[i]}`)
                      var createdfolder = topfolders[i].createFolder(childfolders[k])
                      createdfolders.push(createdfolder);
            }

          }
      }
    Logger.log("Done")
    return createdfolders
    }


function createAttendanceFolder(monthlyfolders = Array, weeklypracticedays = Array) {
    var attendancefolder = getFolders("Attendance")
    var childFolder = getChildFolders();
    while (childFolder.hasNext) {
        var child = childFolder.next();
        var previousmonths = child.getFoldersByName(thismonth).next()
        if (previousmonths != thismonth) {
            child.createFolder(thismonth)
        } else {
            Logger.log(`Folder for ${thismonth} already exists`)
        }
    }
}

function createPhotosandVids_WeeklyPractice(monthlyfolders = Array, weeklypracticedays = Array, subfolders = Array) {

    var photosandvidsfolder = getFolders("Photos/Vids")
    var days = Object.values(weeklypracticedays)
    const monthtocreate = []
    var thismonth = getCurrentMonth();
    monthtocreate.push(thismonth)
    Logger.log(`Creating Photos/Vids directory ${monthtocreate[0]}`)
    var basemonthfolder = createSubFolders(photosandvidsfolder, monthtocreate)
    Logger.log(`Created Photos/Vids directory ${monthtocreate[0]}`)
    Logger.log(`Creating folders for the following days in ${monthtocreate}: ${days}`)
    var monthfolder = createSubFolders(basemonthfolder,monthlyfolders)
    createSubFolders(monthfolder, subfolders)
    
     }
