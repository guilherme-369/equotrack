import { useEffect, useState } from 'react'
import { ChevronRight, Search, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import { practitioners } from '../data/practitioners'
import StatusBadge from '../components/StatusBadge'

function SessionDate({ date }: { date: string }) {
  return <time dateTime={date}>{date.split('-').reverse().join('/')}</time>
}

function Practitioners() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')

  useEffect(() => {
    document.title = 'Praticantes | EquoTrack'
  }, [])

  const query = search.trim().toLocaleLowerCase('pt-BR')
  const results = practitioners.filter((practitioner) =>
    practitioner.name.toLocaleLowerCase('pt-BR').includes(query)
    && (status === 'Todos' || practitioner.status === status),
  )

  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-page font-bold">Praticantes</h1>
        <p className="mt-2 text-body text-muted">Consulte os praticantes acompanhados e acesse seus históricos.</p>
      </header>

      <section aria-label="Consulta de praticantes" className="space-y-4">
        <div className="ui-card grid gap-4 md:grid-cols-[minmax(0,1fr)_180px_auto] md:items-end">
          <div className="relative min-w-0">
            <label htmlFor="practitioner-search" className="sr-only">Buscar praticante</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-3 left-3 text-muted" />
            <input
              id="practitioner-search"
              type="search"
              placeholder="Buscar praticante..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="ui-control pl-10"
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="practitioner-status" className="sr-only">Status do praticante</label>
            <select
              id="practitioner-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="ui-control md:w-36"
            >
              <option>Todos</option>
              <option>Ativo</option>
              <option>Pausado</option>
            </select>
          </div>
          <p role="status" className="flex min-h-11 items-center gap-2 text-secondary text-muted md:justify-end">
            <Users size={16} aria-hidden="true" />
            <span>{results.length} {results.length === 1 ? 'praticante' : 'praticantes'}</span>
          </p>
        </div>

        {results.length === 0 ? (
          <div className="ui-card">
            <p className="text-body font-medium">Nenhum praticante encontrado.</p>
            <p className="mt-1 text-secondary text-muted">Tente alterar a busca ou o filtro de status.</p>
          </div>
        ) : (
          <div className="ui-card overflow-hidden p-0">
            <table className="ui-table hidden text-body md:table [&_tbody_tr:last-child]:border-b-0">
              <caption className="sr-only">Praticantes acompanhados e suas últimas sessões</caption>
              <thead className="border-b border-border text-secondary text-muted">
                <tr>
                  <th scope="col" className="font-medium">Praticante</th>
                  <th scope="col" className="font-medium">Última sessão</th>
                  <th scope="col" className="font-medium">Status</th>
                  <th scope="col" className="w-12"><span className="sr-only">Histórico</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.map((practitioner) => (
                  <tr key={practitioner.id} className="relative hover:bg-background focus-within:bg-background">
                    <th scope="row" className="font-semibold">
                      <Link to={`/praticantes/${practitioner.id}`} className="after:absolute after:inset-0" aria-label={`Acessar histórico de ${practitioner.name}`}>
                        {practitioner.name}
                      </Link>
                    </th>
                    <td className="whitespace-nowrap text-muted tabular-nums"><SessionDate date={practitioner.lastSession} /></td>
                    <td><StatusBadge status={practitioner.status} /></td>
                    <td className="text-right text-muted"><ChevronRight size={18} aria-hidden="true" /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-border md:hidden">
              {results.map((practitioner) => (
                <li key={practitioner.id}>
                  <Link to={`/praticantes/${practitioner.id}`} className="flex min-h-[88px] items-center justify-between gap-4 px-5 py-4 hover:bg-background" aria-label={`Acessar histórico de ${practitioner.name}`}>
                    <div className="min-w-0">
                      <p className="text-body font-semibold">{practitioner.name}</p>
                      <p className="mt-1 text-secondary text-muted tabular-nums">Última sessão: <SessionDate date={practitioner.lastSession} /></p>
                      <div className="mt-2"><StatusBadge status={practitioner.status} /></div>
                    </div>
                    <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

export default Practitioners
