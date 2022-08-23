function getFolders(name = String) {
    try {
        return DriveApp.getFoldersByName(name).next()
    } catch (RangeError) {}
    Logger.log(`Name: ${name} is not a valid directory, please create the directory or provide a valid name for it.`)
    throw Error(RangeError);
}

//Typing isnt enforced here because I cannot declare the type of object in appscript, apparently. 
//Left is a DriveApp obj, right is an array
function createSubFolders(topfolder, childfolders = Array) {
    var createdfolders = [];
    for (i = 0; i < childfolders.length(); i++) {
        createdfolders.push(topfolder.createFolder(childfolders[i]));
    }
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
    var thismonth = getCurrentMonth()

    Logger.log(`Creating Photos/Vids directory ${thismonth}`)
    var basemonthfolder = createSubFolders(photosandvidsfolder, thismonth)
    Logger.log(`Created Photos/Vids directory ${thismonth}`)
    for (i = 0; i < weeklypracticedays.length(); i++)
        var alphamonth = weeklypracticedays[i]
    for (i = 0; i < monthlyfolders[alphamonth].length(); i++) {
        var daysubfolder = getFolders("Photos/Vids").getFoldersByName(basemonthfolder[0].getName()).next()
        var createddayfolders = createSubFolders(daysubfolder, monthlyfolders[alphamonth])
        for (i = 0; i < createddayfolders.length(); i++) {
            var dailypracticefolder = getFolders("Photos/Vids").getFoldersByName(basemonthfolder[0].getName()).next().getFoldersByName(createddayfolders[i])
            createSubFolders(dailypracticefolder, subfolders)
        }

    }

}
