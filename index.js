// // Your code here

// function createEmployeeRecord (array){
//  return {
//    firstName: array[0],
//    familyName: array [1],
//    title: array[2],
//    payPerHour: array[3],
//    timeInEvents: [],
//    timeOutEvents: [],
//  }
// }

// function createEmployeeRecords (arrayOfRecords) {
//   return arrayOfRecords.map(rec => createEmployeeRecord(rec))
// }

// function createTimeInEvent (array, dateStamp) {
//   const timeIn = createEmployeeRecord(array, dateStamp);
//   const [date, hour] = dateStamp.toString().split(" ")
//   // can also do this: 
//   // const arrFromDate = dateStamp.split(" ")
//   // const date = arrFromDate[0]
//   // const hour = arrFromDate[1]

//   const inEvent = {
//     type: "TimeIn",
//     hour: parseInt(hour),
//     date: date,
//   }
//   timeIn.timeInEvents.push(inEvent)
//   return timeIn
//   }

//   function createTimeOutEvent (array, dateStamp) {
//     const timeOut = createEmployeeRecord(array, dateStamp);
//     const [date, hour] = dateStamp.toString().split(" ")
//     // can also do this: 
//     // const arrFromDate = dateStamp.split(" ")
//     // const date = arrFromDate[0]
//     // const hour = arrFromDate[1]

//     const outEvent = {
//       type: "TimeOut",
//       hour: parseInt(hour),
//       date: date,
//     }
//     timeOut.timeOutEvents.push(outEvent)
//     return timeOut
//     }

//   function hoursWorkedOnDate (array, targetDate) {
//     const timeIn = createEmployeeRecord(array, targetDate);
//     const timeOut = createEmployeeRecord(array, targetDate);
//     const inEvent = createTimeInEvent (array, targetDate)
//     timeIn.timeInEvents.find(inEvent => inEvent.date === targetDate)
//     const outEvent = createTimeOutEvent (array, targetDate)
//     timeOut.timeOutEvents.find(outEvent => outEvent.date === targetDate)
//     return (outEvent.hour -  inEvent.hour) / 100
//   }


const createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

const createEmployeeRecords = (arrayOfRecords) => {
  return arrayOfRecords.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = (array, dateStamp) => {
  //let timeIn = createEmployeeRecord(timeInEvents, dateStamp)
  const [date, hour] = dateStamp.toString().split(" ")
  // can also do this: 
  // const arrFromDate = dateStamp.toString().split(" ")
  // const date = arrFromDate[0]
  // const hour = arrFromDate[1]

  const inEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  }
  array.timeInEvents.push(inEvent)
  return array
}

const createTimeOutEvent = (array, dateStamp) => {
  //let timeOut = createEmployeeRecord(timeOutEvents, dateStamp)
  const [date, hour] = dateStamp.toString().split(" ")

  const outEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  }
  array.timeOutEvents.push(outEvent)
  return array
}

const hoursWorkedOnDate = (array, date) => {
  let hours;
  for (let i = 0; i < array.timeInEvents.length; i++) {
    if (array.timeInEvents[i].date === date) {
      if (array.timeOutEvents[i].date === date) {
        hours = array.timeOutEvents[i].hour - array.timeInEvents[i].hour
      }
    }
  }

  return hours / 100
}

const wagesEarnedOnDate = (array, date) => {
  return (hoursWorkedOnDate(array, date)) * array.payPerHour
}

const allWagesFor = (targetDate) => {
  let allPay = [];
  let allDates = [];

  for (let i = 0; i < targetDate.timeInEvents.length; i++) {
    allDates.push(targetDate.timeInEvents[i].date)
  }

  allDates.forEach(date => {
    allPay.push(wagesEarnedOnDate(targetDate, date))
  });

  return allPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

const calculatePayroll = (arrOfERecordObj) => {
  let payroll = [];

  arrOfERecordObj.forEach(employee => {
      payroll.push(allWagesFor(employee)) 
  });

  return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}

