// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // Variable linked to the p element in the HTML
  // Will show current date
  var currentDateEl = $("#currentDay");
  // All save buttons are connected to this
  var saveBtnEl = $(".saveBtn");
  // Array containing all time blocks in the DOM
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
  // Stores the value of each hour and the text the user inputs to its respective time block
  var dayPlans = {
    hour9:'',
    hour10:'',
    hour11:'',
    hour12:'',
    hour13:'',
    hour14:'',
    hour15:'',
    hour16:'',
    hour17:'',
  };
  // When the save button of a timeblock is clicked, the text in the text area
  // is saved into the javascript object corresonding to the matching hour.
  saveBtnEl.on("click",function(event){
    var parentDiv = $(this).parent();

    var hourSaved = "hour" + (parentDiv.attr("id")).toString().slice(5);
    console.log(hourSaved);
    var userInput = parentDiv.children('textarea').val();

    dayPlans[hourSaved] = userInput.trim();
    localStorage.setItem("dayPlans", JSON.stringify(dayPlans));
  });
  // Checks each time block and ,using the current time, sets its class to either
  // past, present, or future.
  function checkTimeBlocks(){
    // Get value of the current hour in 0-23 format
    var currentHour = dayjs().format("H");
    // Compares the current hour to the hour set in each time block
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


  // Check local storage when page loads for previously saved day plans.
  // Sets the timeblock text area text to whatever text the user saved.
  function init(){
    var savedDayPlans = JSON.parse(localStorage.getItem("dayPlans"));

    if(savedDayPlans !== null){
      // Sets the javascript object declared earlier to the one saved in the local storage
      dayPlans = savedDayPlans;
      // Goes through each timeblock and sets the text to what is saved in local storage if their is any
      for(var i = 0; i < timeBlocksEl.length; i++){
        var blockHour = timeBlocksEl[i].attr("id").slice(5);
        var hourSaved = "hour" + blockHour;
        var textAreaEl = timeBlocksEl[i].children('textarea');
        if(dayPlans[hourSaved] !== null){
          textAreaEl.text(dayPlans[hourSaved]);
        }
      }

    }
  }
  checkTimeBlocks();
  currentDateEl.text(dayjs().format("dddd, MMMM D"));

  init();
});
