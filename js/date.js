class DateData {
    constructor() {

        this.today = new Date()

        this.days_month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        this.start_month = [1, 2, 4, 5, 6, 0/* 5,  6,  2,  4,  0,  2,  5,  1,  3,  6,  1*/]
        this.months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

        this.real_day = parseInt(this.today.getDate())
        this.real_month = parseInt(this.today.getMonth())+1
        this.real_year = parseInt(this.today.getFullYear())
        this.real_date = this.real_month+"/"+this.real_day+"/"+this.real_year

        this.index_month = this.real_month
        this.index_year = this.real_year

    }

    getDaysUntil = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let dayCount = 0
      
        while (end > start) {
          dayCount++
          start.setDate(start.getDate() + 1)
        }
        
        return dayCount
    }

    getRealDaysUntil = (date) => {

        var days_until = CDate.getDaysUntil(CDate.real_date, date)
        if(days_until == 0) days_until = CDate.getDaysUntil(date, CDate.real_date) * -1
    
        return days_until;

    }

}