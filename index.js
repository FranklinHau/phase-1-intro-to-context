function createEmployeeRecord(employeeArr) {
  let employeeRecord = {
    firstName: employeeArr[0],
    familyName: employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecord;
}

function createEmployeeRecords(employeesArr) {
  let employeeRecords = employeesArr.map(createEmployeeRecord);
  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateTimeStr) {
  let [date, hour] = dateTimeStr.split(" ");
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeStr) {
  let [date, hour] = dateTimeStr.split(" ");
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStr) {
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateStr);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateStr);
  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, dateStr) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStr);
  let wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  let allDates = employeeRecord.timeInEvents.map(event => event.date);
  let totalWages = allDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  return totalWages;
}

function calculatePayroll(employeeRecords) {
  let totalPayroll = employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  return totalPayroll;
}

let dataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300],
  ["Byron", "Poodle", "Mascot", 3],
  ["Julius", "Caesar", "General", 27],
  ["Rafiki", "", "Aide", 10],
  ["Simba", "", "King", 100]
];

let employees = createEmployeeRecords(dataEmployees);
employees.forEach(function (employee) {
  let events = [
    ["2022-04-26 0900", "2022-04-26 1700"],
    ["2022-04-27 0900", "2022-04-27 1300"]
  ];
  events.forEach(function (event) {
    createTimeInEvent(employee, event[0]);
    createTimeOutEvent(employee, event[1]);
  });
});

console.log(calculatePayroll(employees)); 
