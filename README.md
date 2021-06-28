# Week 5 Homework: Scheduler

My solution, hosted using Github Pages: https://raven-bootcamp.github.io/week5-homework-scheduler/

The repository with my code: https://github.com/raven-bootcamp/week5-homework-scheduler

## The Task
We are to create a simple daily schedule application that allows a user to save events for each hour of the day. 
The app will run in the browser and feature dynamically updated HTML and CSS.
Moment.js is required to work with date and time.

## My Approach
The colours I chose for the various times are:
- **past** = dark grey
- **present** = red/pink
- **future** = dark green

Please keep in mind that if viewing this application after working hours, all of the time blocks are effectively in the past for today, thus they will all be dark grey coloured.  For best assessment of the app, use it during working hours.

I also added an extra button to clear any saved data that exists for your schedule.  It seemed time consuming for the user to delete everything, so I added a button to do that.

Overall I used Bootstrap as it was built into the starter code that was given to us. But the starter code also came along with some CSS, some of which was not relevant due to Bootstrap.  So I found that a little confusing and decided to just leave it in there.  Not sure if that was a test, maybe I should have removed any superfluous code? 

## Acceptance Criteria
```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Mockup
![image](/images/mockup.gif)

## Screenshot of Solution
![image](/images/homework-week5.png)
