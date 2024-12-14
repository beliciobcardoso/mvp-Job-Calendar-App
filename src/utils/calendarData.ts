import { addDays, format } from "date-fns"

function getMonthName(month: number) {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  return monthNames[month]
}

export const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]

export const getYearPrevious = new Date().getFullYear() + 1

export type MonthData = {
  index: number
  name: string
  days: (string | null)[]
}

const daysInMonth = (year: number) => {
  const monthsYear: MonthData[] = []
  
  for (let i = 0; i < 12; i++) {

    const days = [] as (string | null)[]
    const monthCurrent = new Date(year, i).getMonth()
    const initWeek = new Date(year, i).getDay()
    if (days.length === 0) {
      for (let r = 0; r < initWeek; r++) {
        days.push(null)
      }
    }

    for (let j = 1; j <= new Date(year, i, j).getDate(); j++) {  
        const dayFormatted = format(addDays(monthCurrent, j), "dd")
        days.push(dayFormatted)   
    }

    monthsYear.push({
      index: i,
      name: getMonthName(i),
      days,
    })
  }
  return monthsYear
}

export const months = daysInMonth(getYearPrevious)

