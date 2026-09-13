import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Fictional records for the academic prototype; no scheduling logic is applied.
const indicators = [
  { label: 'Praticantes ativos', value: 24, description: 'Em acompanhamento' },
  { label: 'Sessões este mês', value: 87, description: 'Registros realizados' },
  { label: 'Registros pendentes', value: 3, description: 'Aguardando preenchimento' },
]

const recentRecords = [
  { name: 'Ana Beatriz', date: '11/09/2026', dateTime: '2026-09-11', professional: 'Fisioterapeuta' },
  { name: 'Lucas Martins', date: '11/09/2026', dateTime: '2026-09-11', professional: 'Psicóloga' },
  { name: 'Gabriel Silva', date: '10/09/2026', dateTime: '2026-09-10', professional: 'Fisioterapeuta' },
  { name: 'Marina Alves', date: '10/09/2026', dateTime: '2026-09-10', professional: 'Terapeuta ocupacional' },
]

const pendingSessions = [
  { name: 'Marina Alves', time: '09:00' },
  { name: 'Pedro Lima', time: '10:30' },
  { name: 'Carlos Eduardo', time: '14:00' },
]

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard | EquoTrack'
  }, [])

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-page font-semibold">Dashboard</h1>
        <p className="mt-2 text-body text-muted">Visão geral dos registros de acompanhamento.</p>
      </header>

      <dl className="grid gap-4 md:grid-cols-3">
        {indicators.map(({ label, value, description }) => (
          <div key={label} className="rounded-card border border-border bg-surface p-5">
            <dt className="text-body font-semibold">{label}</dt>
            <dd className="mt-3 text-page font-semibold tabular-nums">{value}</dd>
            <dd className="mt-1 text-secondary text-muted">{description}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="recent-records-heading">
        <h2 id="recent-records-heading" className="mb-4 text-section font-semibold">Registros recentes</h2>
        <table className="hidden w-full text-left text-body md:table">
          <caption className="sr-only">Registros recentes de sessões por praticante</caption>
          <thead className="border-b border-border text-secondary text-muted">
            <tr>
              <th scope="col" className="py-3 pr-4 font-medium">Praticante</th>
              <th scope="col" className="px-4 py-3 font-medium">Data</th>
              <th scope="col" className="px-4 py-3 font-medium">Profissional</th>
              <th scope="col" className="py-3 pl-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentRecords.map(({ name, date, dateTime, professional }) => (
              <tr key={name}>
                <th scope="row" className="py-4 pr-4 font-medium">{name}</th>
                <td className="px-4 py-4 whitespace-nowrap tabular-nums"><time dateTime={dateTime}>{date}</time></td>
                <td className="px-4 py-4">{professional}</td>
                <td className="py-4 pl-4"><span className="inline-block rounded-badge bg-primary-soft px-2 py-1 text-small font-medium text-primary">Registrado</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-border border-t border-border md:hidden">
          {recentRecords.map(({ name, date, dateTime, professional }) => (
            <li key={name} className="py-4">
              <h3 className="mb-3 text-body font-medium">{name}</h3>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 text-secondary">
                <dt className="text-muted">Data</dt>
                <dd className="tabular-nums"><time dateTime={dateTime}>{date}</time></dd>
                <dt className="text-muted">Profissional</dt>
                <dd>{professional}</dd>
                <dt className="text-muted">Status</dt>
                <dd><span className="inline-block rounded-badge bg-primary-soft px-2 py-1 text-small font-medium text-primary">Registrado</span></dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pending-sessions-heading">
        <h2 id="pending-sessions-heading" className="mb-4 text-section font-semibold">Sessões pendentes</h2>
        <ul className="divide-y divide-border border-t border-border">
          {pendingSessions.map(({ name, time }) => (
            <li key={name} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <h3 className="text-body font-medium">{name}</h3>
                <p className="mt-1 text-secondary text-muted">Hoje, <time>{time}</time></p>
              </div>
              <Link
                to="/sessoes/nova"
                aria-label={`Registrar sessão de ${name}`}
                className="inline-flex min-h-10 items-center justify-center rounded-button border border-border bg-surface px-3 py-2 text-secondary font-medium text-primary hover:border-primary hover:bg-primary-soft"
              >
                Registrar sessão
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Dashboard
