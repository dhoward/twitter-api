var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function formatDate(dateNum) {
  var date = new Date(dateNum);
  var month = months[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var modifier = "am";

  if(minutes < 10) {
    minutes = "0"+minutes;
  }

  if(hours >= 12) {
    modifier = "pm";
    if(hours > 12) {
      hours -= 12
    }
  }

  return month + " " + day + ", " + year + " @ " + hours + ":" + minutes + modifier;
};