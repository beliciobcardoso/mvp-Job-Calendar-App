import type React from "react"
import { type MonthData, dayNames, getYearPrevious, months } from "../utils/calendarData"


const Month: React.FC<{ data: MonthData }> = ({ data }) => (
  <div className="rounded-lg shadow-md p-4 bg-neutral-700">
    <h3 className="text-lg font-semibold mb-2 text-center bg-gray-400 uppercase rounded-lg">
      {data.name}
    </h3>
    <div className="grid grid-cols-7 gap-1">
      {dayNames.map((day) => (
        <div
          key={day}
          className="text-center text-xs font-medium text-gray-100"
        >
          {day}
        </div>
      ))}
      {data.days.map((day) => (
        <div
          key={day}
          className={`text-center p-1 text-sm ${day && Number(day) > 0 && Number(day) <= 31 ? "text-gray-200" : "font-medium"}`}
        >
          {day}
        </div>
      ))}
    </div>
  </div>
)

const Calendar: React.FC = () => (
  <div className="bg-gray-500 min-h-screen py-8">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Calendário {getYearPrevious}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month) => (
          <Month key={month.name} data={month} />
        ))}
      </div>
    </div>
  </div>
)

export default Calendar
