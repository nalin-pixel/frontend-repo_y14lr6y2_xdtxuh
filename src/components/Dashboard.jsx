import { useEffect, useMemo, useState } from 'react'

const formatMoney = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n || 0)
const formatInt = (n) => new Intl.NumberFormat('ru-RU').format(n || 0)

export default function Dashboard({ totals }) {
  const { orders = 0, couriers = 0, amount = 0 } = totals || {}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">
        <div className="text-slate-300 text-sm">Заказов</div>
        <div className="text-3xl font-bold text-white mt-1">{formatInt(orders)}</div>
      </div>
      <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">
        <div className="text-slate-300 text-sm">Курьеров</div>
        <div className="text-3xl font-bold text-white mt-1">{formatInt(couriers)}</div>
      </div>
      <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">
        <div className="text-slate-300 text-sm">Сумма</div>
        <div className="text-3xl font-bold text-white mt-1">{formatMoney(amount)}</div>
      </div>
    </div>
  )
}
