import { useEffect, useMemo, useState } from 'react'
import Dashboard from './components/Dashboard'
import Filters from './components/Filters'
import SummaryTable from './components/SummaryTable'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

const defaultRange = () => {
  const now = new Date()
  const start = new Date(now)
  start.setHours(0,0,0,0)
  const end = new Date(now)
  end.setHours(23,59,59,999)

  const toLocal = (d) => new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,16)
  return { start: toLocal(start), end: toLocal(end) }
}

export default function App() {
  const [{ start, end }, setRange] = useState(defaultRange())
  const [selectedTerminal, setSelectedTerminal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rows, setRows] = useState([])
  const [totals, setTotals] = useState({ orders: 0, couriers: 0, amount: 0 })
  const [terminals, setTerminals] = useState({})

  const fetchData = async () => {
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams()
      // Convert local datetime-local to ISO (without minutes offset issues)
      const startISO = new Date(start).toISOString().slice(0,19)
      const endISO = new Date(end).toISOString().slice(0,19)
      params.set('start', startISO)
      params.set('end', endISO)
      if (selectedTerminal) params.set('terminal', selectedTerminal)

      const res = await fetch(`${BACKEND}/api/jps/orders?` + params.toString())
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setRows(data.rows || [])
      setTotals(data.totals || { orders: 0, couriers: 0, amount: 0 })
      setTerminals(data.terminals || {})
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const setStart = (v) => setRange(r => ({ ...r, start: v }))
  const setEnd = (v) => setRange(r => ({ ...r, end: v }))

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Отчёт по курьерам</h1>

        <Dashboard totals={totals} />

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <Filters
            terminals={terminals}
            selectedTerminal={selectedTerminal}
            setSelectedTerminal={setSelectedTerminal}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            onRefresh={fetchData}
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg border border-red-500/40 bg-red-900/30 text-red-200 text-sm">{error}</div>
        )}

        <SummaryTable rows={rows} />

        {loading && (
          <div className="text-center text-slate-300">Загрузка...</div>
        )}
      </div>
    </div>
  )
}
