import { useEffect, useState } from 'react'
import { ChevronRight, Search } from 'lucide-react'
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
      <header>
        <h1 className="text-page font-semibold">Praticantes</h1>
        <p className="mt-2 text-body text-muted">Consulte os praticantes acompanhados e acesse seus históricos.</p>
      </header>

      <section aria-label="Consulta de praticantes">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <div className="relative w-full md:max-w-sm">
            <label htmlFor="practitioner-search" className="sr-only">Buscar praticante</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-3 left-3 text-muted" />
            <input
              id="practitioner-search"
              type="search"
              placeholder="Buscar praticante..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-h-11 w-full rounded-input border border-border bg-surface py-2 pr-3 pl-10 text-body placeholder:text-muted"
            />
          </div>
          <div>
            <label htmlFor="practitioner-status" className="sr-only">Status do praticante</label>
            <select
              id="practitioner-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="min-h-11 w-full rounded-input border border-border bg-surface px-3 py-2 text-body md:w-36"
            >
              <option>Todos</option>
              <option>Ativo</option>
              <option>Pausado</option>
            </select>
          </div>
        </div>

        <p role="status" className="mb-3 text-secondary text-muted">
          {results.length} {results.length === 1 ? 'praticante' : 'praticantes'}
        </p>

        {results.length === 0 ? (
          <div className="border-t border-border py-6">
            <p className="text-body font-medium">Nenhum praticante encontrado.</p>
            <p className="mt-1 text-secondary text-muted">Tente alterar a busca ou o filtro de status.</p>
          </div>
        ) : (
          <>
            <table className="hidden w-full bg-surface text-left text-body md:table">
              <caption className="sr-only">Praticantes acompanhados e suas últimas sessões</caption>
              <thead className="border-b border-border text-secondary text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Praticante</th>
                  <th scope="col" className="px-4 py-3 font-medium">Última sessão</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="w-12 px-4 py-3"><span className="sr-only">Histórico</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.map((practitioner) => (
                  <tr key={practitioner.id} className="relative hover:bg-background focus-within:bg-background">
                    <th scope="row" className="px-4 py-4 font-medium">
                      <Link to={`/praticantes/${practitioner.id}`} className="after:absolute after:inset-0" aria-label={`Acessar histórico de ${practitioner.name}`}>
                        {practitioner.name}
                      </Link>
                    </th>
                    <td className="px-4 py-4 whitespace-nowrap text-muted tabular-nums"><SessionDate date={practitioner.lastSession} /></td>
                    <td className="px-4 py-4"><StatusBadge status={practitioner.status} /></td>
                    <td className="px-4 py-4 text-muted"><ChevronRight size={18} aria-hidden="true" /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-border border-t border-border bg-surface md:hidden">
              {results.map((practitioner) => (
                <li key={practitioner.id}>
                  <Link to={`/praticantes/${practitioner.id}`} className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-background" aria-label={`Acessar histórico de ${practitioner.name}`}>
                    <div className="min-w-0">
                      <p className="text-body font-medium">{practitioner.name}</p>
                      <p className="mt-1 text-secondary text-muted tabular-nums">Última sessão: <SessionDate date={practitioner.lastSession} /></p>
                      <div className="mt-2"><StatusBadge status={practitioner.status} /></div>
                    </div>
                    <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  )
}

export default Practitioners
