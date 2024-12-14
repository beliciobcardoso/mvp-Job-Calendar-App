import Calendar from "../components/Calendar"

export default function Home() {
  return (
    <main className="grid grid-flow-col">
      <div className="col-span-7">
        <Calendar />
      </div>
    </main>
  )
}
