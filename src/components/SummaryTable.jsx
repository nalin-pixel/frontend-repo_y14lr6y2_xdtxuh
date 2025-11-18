import { useMemo, useState } from 'react'

const formatMoney = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n || 0)

export default function SummaryTable({ rows }) {
  const [sortKey, setSortKey] = useState('terminalName')
  const [sortDir, setSortDir] = useState('asc')

  const sorted = useMemo(() => {
    const s = [...(rows || [])]
    s.sort((a, b) => {
      const av = (a[sortKey] ?? '').toString().toLowerCase()
      const bv = (b[sortKey] ?? '').toString().toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return s
  }, [rows, sortKey, sortDir])

  const changeSort = (key) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-200">
          <tr>
            <th className="text-left p-3 cursor-pointer" onClick={() => changeSort('courier')}>Курьер</th>
            <th className="text-left p-3 cursor-pointer" onClick={() => changeSort('terminalName')}>Подразделение</th>
            <th className="text-right p-3 cursor-pointer" onClick={() => changeSort('orders')}>Заказов</th>
            <th className="text-right p-3 cursor-pointer" onClick={() => changeSort('amount')}>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, idx) => (
            <tr key={idx} className={idx % 2 ? 'bg-slate-900/40' : ''}>
              <td className="p-3 text-white">{r.courier || '—'}</td>
              <td className="p-3 text-blue-200">{r.terminalName || '—'}</td>
              <td className="p-3 text-right text-white">{r.orders}</td>
              <td className="p-3 text-right text-green-300">{formatMoney(r.amount)}</td>
            </tr>
          ))}
          {(!sorted || sorted.length === 0) && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-slate-400">Нет данных</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
