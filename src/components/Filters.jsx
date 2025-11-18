import { useMemo } from 'react'

export default function Filters({ terminals = {}, selectedTerminal, setSelectedTerminal, start, setStart, end, setEnd, onRefresh }) {
  const options = useMemo(() => {
    return Object.entries(terminals).map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }, [terminals])

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
      <div className="flex-1">
        <label className="block text-sm text-blue-200/80 mb-1">Начало</label>
        <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-blue-200/80 mb-1">Конец</label>
        <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-blue-200/80 mb-1">Подразделение</label>
        <select value={selectedTerminal || ''} onChange={(e) => setSelectedTerminal(e.target.value || null)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white">
          <option value="">Все</option>
          {options.map(o => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>
      <button onClick={onRefresh} className="h-[42px] md:h-[38px] px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg border border-blue-500/40 transition">Обновить</button>
    </div>
  )
}
