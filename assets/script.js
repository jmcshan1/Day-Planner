// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var currentDateEl = $("#currentDay");
  var saveBtnEl = $(".saveBtn");
  var timeBlocksEl = [
    timeBlock9EL = $("#hour-9"),
    timeBlock10EL = $("#hour-10"),
    timeBlock11EL = $("#hour-11"),
    timeBlock12EL = $("#hour-12"),
    timeBlock1EL = $("#hour-13"),
    timeBlock2EL = $("#hour-14"),
    timeBlock3EL = $("#hour-15"),
    timeBlock4EL = $("#hour-16"),
    timeBlock5EL = $("#hour-17"),
  ]

  var dayPlans = {
    hour9: '',
    hour10: '',
    hour11: '',
    hour12: '',
    hour13: '',
    hour14: '',
    hour15: '',
    hour16: '',
    hour17: '',
  };
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  saveBtnEl.on("click",function(event){
    parentDiv = $(event.target).parent();
    hourSaved = "hour" + parentDiv.attr("id").slice(5);
    userInput = parentDiv.children('textarea').val();

    dayPlans[hourSaved] = userInput;
    localStorage.setItem("dayPlans", JSON.stringify(dayPlans));
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function checkTimeBlocks(){
    var currentHour = dayjs().format("H");
    for(var i = 0; i < timeBlocksEl.length; i++){
      var blockHour = parseInt(timeBlocksEl[i].attr("id").slice(5));
      if(blockHour > currentHour){
        timeBlocksEl[i].addClass("future");
        $(timeBlocksEl[i]).removeClass("past present")
      }else if(blockHour == currentHour){
        timeBlocksEl[i].addClass("present");
        $(timeBlocksEl[i]).removeClass("past future")
      }else{
        timeBlocksEl[i].addClass("past");
        $(timeBlocksEl[i]).removeClass("future present")
      }
    }
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  checkTimeBlocks();
  currentDateEl.text(dayjs().format("dddd, MMMM D"));
});
