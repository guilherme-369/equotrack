import { useEffect } from 'react'
import { ArrowRight, ClipboardCheck, ClipboardPlus, Clock3, Users } from 'lucide-react'
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

const indicatorIcons = [Users, ClipboardCheck, Clock3]

const shortcuts = [
  { to: '/praticantes', label: 'Ver praticantes' },
  { to: '/sessoes/nova', label: 'Nova sessão' },
  { to: '/relatorios', label: 'Relatórios' },
]

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard | EquoTrack'
  }, [])

  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-page font-bold">Dashboard</h1>
        <p className="mt-2 text-body text-muted">Visão geral dos registros de acompanhamento.</p>
      </header>

      <dl aria-label="Indicadores operacionais" className="grid gap-4 md:grid-cols-3">
        {indicators.map(({ label, value, description }, index) => {
          const Icon = indicatorIcons[index]
          const isPending = index === 2
          return (
            <div key={label} className="ui-card">
              <dt className="flex items-start justify-between gap-4 text-secondary font-medium">
                <span>{label}</span>
                <Icon size={20} aria-hidden="true" className={`shrink-0 ${isPending ? 'text-warning' : 'text-brand'}`} />
              </dt>
              <dd className={`mt-6 font-heading text-page font-bold tabular-nums ${isPending ? 'text-warning-text' : 'text-brand-dark'}`}>{value}</dd>
              <dd className="mt-2 text-secondary text-muted">{description}</dd>
            </div>
          )
        })}
      </dl>

      <section aria-labelledby="recent-records-heading" className="ui-card overflow-hidden p-0">
        <div className="p-6">
          <h2 id="recent-records-heading" className="text-section font-semibold">Registros recentes</h2>
        </div>
        <table className="ui-table hidden text-body md:table [&_tbody_tr:last-child]:border-b-0 [&_th:first-child]:pl-6 [&_td:last-child]:pr-6">
          <caption className="sr-only">Registros recentes de sessões por praticante</caption>
          <thead className="border-y border-border">
            <tr>
              <th scope="col">Praticante</th>
              <th scope="col">Data</th>
              <th scope="col">Profissional</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentRecords.map(({ name, date, dateTime, professional }) => (
              <tr key={name}>
                <th scope="row" className="font-semibold">{name}</th>
                <td className="whitespace-nowrap text-secondary text-muted tabular-nums"><time dateTime={dateTime}>{date}</time></td>
                <td className="text-secondary">{professional}</td>
                <td><span className="ui-badge ui-badge-positive">Registrado</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-border border-t border-border md:hidden">
          {recentRecords.map(({ name, date, dateTime, professional }) => (
            <li key={name} className="p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-body font-semibold">{name}</h3>
                <span className="ui-badge ui-badge-positive">Registrado</span>
              </div>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-secondary">
                <dt className="text-muted">Data</dt>
                <dd className="tabular-nums"><time dateTime={dateTime}>{date}</time></dd>
                <dt className="text-muted">Profissional</dt>
                <dd>{professional}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid items-start gap-8 desktop:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section aria-labelledby="pending-sessions-heading" className="min-w-0">
          <h2 id="pending-sessions-heading" className="mb-6 text-section font-semibold">Sessões pendentes</h2>
          <ul className="divide-y divide-border border-y border-border">
            {pendingSessions.map(({ name, time }) => (
              <li key={name} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <h3 className="text-body font-semibold">{name}</h3>
                  <p className="mt-2 text-secondary text-muted">Hoje, <time className="tabular-nums">{time}</time></p>
                </div>
                <Link
                  to="/sessoes/nova"
                  aria-label={`Registrar sessão de ${name}`}
                  className="ui-button ui-button-primary gap-2 px-4 py-2 text-secondary"
                >
                  <ClipboardPlus size={16} aria-hidden="true" className="shrink-0" />
                  Registrar sessão
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-labelledby="dashboard-shortcuts-heading" className="min-w-0 desktop:border-l desktop:border-border desktop:pl-8">
          <h2 id="dashboard-shortcuts-heading" className="mb-4 text-subsection font-semibold">Atalhos</h2>
          <ul className="divide-y divide-border">
            {shortcuts.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="ui-link w-full justify-between gap-4 py-4 text-secondary">
                  {label}
                  <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Dashboard
