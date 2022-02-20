/* Your Code Here */

const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arrEmployee) => {
    return arrEmployee.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeIn = {
        type: 'TimeIn',
        hour: Number.parseInt(hour),
        date: date
    }
    this.timeInEvents.push(timeIn)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeOut = {
        type: 'TimeOut',
        hour: Number.parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeOut)
    return this
}

const hoursWorkedOnDate = function (soughtDate) {
    const timeIn = this.timeInEvents.find(timeIn => timeIn.date === soughtDate)
    const timeOut = this.timeOutEvents.find(timeOut => timeOut.date === soughtDate)
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function (soughtDate) {
    return hoursWorkedOnDate.call(this, soughtDate) * this.payPerHour
}

const findEmployeeByFirstName = (employee, firstNameString) => {
    return employee.find(arr => arr.firstName === firstNameString) 
}

const calculatePayroll = function (arrEmployee) {
    return arrEmployee.reduce((total, arr) => {
        return total + allWagesFor.call(arr)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}