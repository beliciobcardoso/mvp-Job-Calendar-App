"use client"
import { addDays, format } from "date-fns"
import { useEffect, useMemo, useState } from "react"

type Month = {
  index: number
  name: string
  dates: string[]
}

const previousYear = new Date().getFullYear() + 1

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

const daysOfWeek = [
  { index: 0, name: "Seg" },
  { index: 1, name: "Ter" },
  { index: 2, name: "Qua" },
  { index: 3, name: "Qui" },
  { index: 4, name: "Sex" },
  { index: 5, name: "Sáb" },
  { index: 6, name: "Dom" },
]

const obterDiaDaSemana = (day: string) => {
  // const dataCurrent = new Date(`2024-12-14T00:00:00`).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  // console.log(dataCurrent);
  
  const diaFormatado = new Date(`2024-12-${day}T00:00:00`).toLocaleString(
    "pt-BR",
    { weekday: "short" },
  )
  return diaFormatado
}

const calendarGenerator = async (year: number) => {
  const daysInMonth = []
  const monthsYear: Month[] = []
  for (let i = 0; i < 12; i++) {
    const monthCurrent = new Date(year, i).getMonth()
 
    for (let j = 1; j <= new Date(year, i, j).getDate(); j++) {
      if (monthCurrent === i) {
        const dayFormatted = format(addDays(monthCurrent, j), "dd")
        daysInMonth.push(dayFormatted)
      }
    }
    monthsYear.push({
      index: i + 1,
      name: getMonthName(i),
      dates: daysInMonth,
    })
  }

  const daysOfWeekCalendar = [
    { index: 0, name: "Seg" },
    { index: 1, name: "Ter" },
    { index: 2, name: "Qua" },
    { index: 3, name: "Qui" },
    { index: 4, name: "Sex" },
    { index: 5, name: "Sáb" },
    { index: 6, name: "Dom" },
  ]

  return Promise.resolve({
    months: monthsYear,
    daysOfWeek: daysOfWeekCalendar,
  })
}

const diasDoMes = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
]

export default function CalendarComp() {
  const [currentYear, setCurrentYear] = useState(previousYear)
  const calendarGeneratorMemoized = useMemo(
    () => calendarGenerator(currentYear),
    [currentYear],
  )
  const [calendar, setCalendar] = useState<Month[]>([])
  const [daysOfWeekCalendar, setDaysOfWeekCalendar] = useState(daysOfWeek)

  useEffect(() => {
    if (calendarGeneratorMemoized) {
      calendarGeneratorMemoized.then((value) => {
        setCalendar(value.months)
        setDaysOfWeekCalendar(value.daysOfWeek)
      })
    }
  }, [calendarGeneratorMemoized])

  return (
    <div className="flex items-center flex-col">
      <h1>{currentYear}</h1>
      <div className="flex flex-col">
        <h1>{}</h1>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Seg</span>
          <span className="text-gray-600">Ter</span>
          <span className="text-gray-600">Qua</span>
          <span className="text-gray-600">Qui</span>
          <span className="text-gray-600">Sex</span>
          <span className="text-gray-600">Sáb</span>
          <span className="text-gray-600">Dom</span>
        </div>
        <ul className="grid grid-cols-7 gap-4">
          {diasDoMes.map((dia) => (
            <li key={dia} className="py-2 px-4rounded-lg">
              <span>{dia}</span>
              <span className="text-sm text-gray-600">
                {obterDiaDaSemana(dia)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {calendar.map((month) => (
        <div key={month.index}>
          <h2>{month.name.toUpperCase()}</h2>
          <div className="flex flex-wrap">
            {month.dates.map((date) => (
              <span key={date}>{date},</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
