// link up to existing elements in the HTML
var rowContainer = document.querySelector(".container");
var currentDay = document.querySelector("#currentDay");
var deleteBtn = document.querySelector("#delete-button");

// working hours for the day
var startingHour = 8;
var endingHour = 17;

// when the application first loads
window.onload = function() {
  // get any existing saved items from storage
  var currentTimeblocks = getCurrentTimeblocks();
  // set up Moment for use
  var currentTime = moment();

  // set the current date using Moment, and all the rows
  displayCurrentDate(currentTime);
  displayTimeblockRows(currentTime);

  // when you click on part of the container, i.e. one of the timeblocks
  rowContainer.addEventListener("click", function(event) {
      containerClicked(event, currentTimeblocks);
    });

  // set the text of the timeblock currently under interaction
  setTimeblockText(currentTimeblocks);
};

// delete button for clearing your schedule entirely
deleteBtn.addEventListener("click", function() {
  localStorage.setItem("storedSchedule", []);
  window.location.reload();
})

// the object to serve each time block and the associated entry
class TimeblockObj {
  constructor(hour, entry) {
    this.hour = hour;
    this.entry = entry;
  }
}
  
// get any existing data from local storage and return it, otherwise return an empty array
function getCurrentTimeblocks() {
  var currentTimeblocks = localStorage.getItem("storedSchedule");
  return currentTimeblocks ? JSON.parse(currentTimeblocks) : [];
}

// display the current date under the main heading using Moment
function displayCurrentDate(currentTime) {
  currentDay.textContent = currentTime.format("dddd, Do of MMMM");
}

// display a row for each hour of the working day
function displayTimeblockRows(currentTime) {
  var currentHour = currentTime.hour();
  
  //Set working hours, I like 8-5 but yours might differ!
  for (var i = startingHour; i <= endingHour; i++) {
    var timeblock = createTimeblockRow(i);
    var hourCol = createCol(createHourDiv(i), 1);
    var textArea = createCol(createTextArea(i, currentHour), 10);
    var saveBtn = createCol(createSaveBtn(i), 1);
    appendTimeblockColumns(timeblock, hourCol, textArea, saveBtn);
    rowContainer.appendChild(timeblock);
  }
}

// set the text of the timeblock entry, as long as the overall list has an entry
function setTimeblockText(timeblockList) {
  if (timeblockList.length === 0 ) {
    return;
  } else {
    for (var timeblock of timeblockList) {
      document.querySelector(`#timeblock-${timeblock.hour} textarea`)
        .value = timeblock.entry;
    }
  }
}

// create a row for a certain timeblock, based on the hour
function createTimeblockRow(hourId) {
  var timeblock = document.createElement("div");
  timeblock.classList.add("row");
  timeblock.id = `timeblock-${hourId}`;
  return timeblock;
}

// create a column, with a certain size using Bootstrap syntax
function createCol(element, colSize) {
  var col = document.createElement("div");
  col.classList.add(`col-${colSize}`,"p-0");
  col.appendChild(element);
  return col;
}

// create an element for the row"s hour to go in
function createHourDiv(hour) {
  var hourCol = document.createElement("div");
  hourCol.classList.add("hour");
  hourCol.textContent = formatHour(hour);
  return hourCol;
}

// use Moment to set up the correct format with AM and PM for display
function formatHour(hour) {
  var hourString = String(hour);
  return moment(hourString, "h").format("hA");
}

// create a text area for the user to type their schedule event
function createTextArea(hour, currentHour) {
  var textArea = document.createElement("textarea");
  textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
  return textArea;
}

// set the correct class in order to change the background colour of the row, based on the current time
function getTextAreaBackgroundClass(hour, currentHour) {
  return hour < currentHour ? "past" : hour === currentHour ? "present" : "future";
}

// create a save button at the end of each row, using Font Awesome's icon library
function createSaveBtn(hour) {
  var saveBtn = document.createElement("button");
  saveBtn.classList.add("saveBtn");
  saveBtn.innerHTML = '<i class="fas fa-calendar-check fa-lg"></i>';
  saveBtn.setAttribute("data-hour", hour);
  return saveBtn;
}

// append all the content of the timeblock to the overall row that houses it
function appendTimeblockColumns(timeblockRow, hourCol, textAreaCol, saveBtnCol) {
  var innerCols = [hourCol, textAreaCol, saveBtnCol];
  for (var col of innerCols) {
    timeblockRow.appendChild(col);
  }
}

// handle when clicks happen on something in the container, and when the save button is clicked
function containerClicked(event, timeblockList) {
  if (isSaveButton(event)) {
    var timeblockHour = getTimeblockHour(event);
    var textAreaValue = getTextAreaValue(timeblockHour);
    placeTimeblockInList(new TimeblockObj(timeblockHour, textAreaValue), timeblockList);
    saveTimeblockList(timeblockList);
  }
}

// check to see if the click is for a save button, to determine the following behaviour
function isSaveButton(event) {
  return event.target.matches("button") || event.target.matches(".fa-calendar-check");
}

// get the hour of the time block that was clicked, depending if it was the relevant save button or not
function getTimeblockHour(event) {
  return event.target.matches(".fa-calendar-check") ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
}

// get the value of the text area where the user typed their schedule entry
function getTextAreaValue(timeblockHour) {
  return document.querySelector(`#timeblock-${timeblockHour} textarea`).value;
}

// save the timeblock in the overall list
function placeTimeblockInList(newTimeblockObj, timeblockList) {
  if (timeblockList.length > 0) {
    for (var savedTimeblock of timeblockList) {
      if (savedTimeblock.hour === newTimeblockObj.hour) {
        savedTimeblock.entry = newTimeblockObj.entry;
        return;
      }
    }
  } 
  timeblockList.push(newTimeblockObj);
  return;
}

// save the relevant data to local storage in the browser
function saveTimeblockList(timeblockList) {
  localStorage.setItem("storedSchedule", JSON.stringify(timeblockList));
}