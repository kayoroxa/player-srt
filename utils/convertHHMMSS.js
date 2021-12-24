// convert HH:MM:SS to seconds
// convert MM:SS to seconds

function convertTimeStr(timeStr) {
  var parts = timeStr.split(':')
  var time = 0
  if (parts.length == 3) {
    time =
      parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  } else if (parts.length == 2) {
    time = parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return time
}

module.exports = convertTimeStr
