// Creating Employee Record //
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  // Creating Employee Records //
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Creating Time In //
  function createTimeInEvent(dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const hour = parseInt(time);
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: hour,
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }
  
  // Creating Time Out Event //
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
  
  // Calculating Hours Worked on Date
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(e => e.date === date)
    const timeOutEvent = this.timeOutEvents.find(e => e.date === date)
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100
  }
  
  // Calculating Wage
  function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    let payRate = this.payPerHour;
    return hoursWorked * payRate;
  }
  
  // Making All wages for
  function allWagesFor() {
    let datesWorked = this.timeInEvents.map(function(event) {
      return event.date
    })
  
    let wages = datesWorked.reduce(function(memo, date) {
      return memo + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0)
  
    return wages
  }
  
  // Finding Employee by first name
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
  }
  
  // Calculating Payroll
  function calculatePayroll(employees) {
    let totalPayroll = 0;
  
    employees.forEach(function(employee) {
      const wages = allWagesFor.call(employee);
      totalPayroll += wages;
    });
  
    return totalPayroll;
  }
  
  // Example usage:
  const employeesData = [
    ["John", "Doe", "Manager", 15],
    ["Jane", "Doe", "Worker", 10],
  ];
  const employees = createEmployeeRecords(employeesData);
  employees.forEach(function(employee) {
    createTimeInEvent.call(employee, "2023-04-30 08:00");
    createTimeOutEvent.call(employee, "2023-04-30 16:00");
  });
  const totalPayroll = calculatePayroll(employees);
  console.log(totalPayroll); // expected output: 190
  


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/* const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
*/

