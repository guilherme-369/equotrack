import { useEffect } from 'react'
import { ArrowLeft, ClipboardPlus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import SessionTimeline from '../components/SessionTimeline'
import { practitioners } from '../data/practitioners'
import { practitionerHistories } from '../data/sessions'

function formatDate(date: string) {
  return date.split('-').reverse().join('/')
}

export default function PractitionerHistory() {
  const { id } = useParams()
  const practitioner = practitioners.find((entry) => entry.id === id)
  const history = practitioner ? practitionerHistories[practitioner.id] : undefined

  useEffect(() => {
    document.title = `${practitioner ? `${practitioner.name} — Histórico` : 'Praticante não encontrado'} | EquoTrack`
  }, [practitioner])

  return (
    <div className="max-w-[900px] space-y-8">
      <Link to="/praticantes" className="inline-flex min-h-10 items-center gap-2 rounded-button text-secondary font-medium text-primary hover:underline">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar para praticantes
      </Link>

      {!practitioner ? <h1 className="text-page font-semibold">Praticante não encontrado</h1> : (
        <>
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-page font-semibold">{practitioner.name}</h1>
                <StatusBadge status={practitioner.status} />
              </div>
              <p className="mt-2 text-body text-muted">
                Última sessão: <time dateTime={practitioner.lastSession}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(practitioner.lastSession))}</time>
              </p>
            </div>
            <Link to="/sessoes/nova" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-button bg-primary px-4 py-2 text-body font-medium text-surface hover:bg-primary-hover">
              <ClipboardPlus size={18} aria-hidden="true" />
              Nova sessão
            </Link>
          </header>

          {history && (
            <dl aria-label="Resumo dos registros" className="grid gap-4 border-y border-border py-5 md:grid-cols-3">
              <div className="flex flex-col gap-1">
                <dt className="text-secondary text-muted">Sessões registradas</dt>
                <dd className="order-first text-section font-semibold tabular-nums">{history.total}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-secondary text-muted">Primeiro registro</dt>
                <dd className="order-first text-section font-semibold tabular-nums"><time dateTime={history.firstRecord}>{formatDate(history.firstRecord)}</time></dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-secondary text-muted">Último registro</dt>
                <dd className="order-first text-section font-semibold tabular-nums"><time dateTime={history.lastRecord}>{formatDate(history.lastRecord)}</time></dd>
              </div>
            </dl>
          )}

          <section aria-labelledby="history-heading">
            <h2 id="history-heading" className="text-section font-semibold">Histórico de sessões</h2>
            {history ? (
              <>
                <p className="mt-1 mb-6 text-secondary text-muted">{history.sessions.length} registros recentes exibidos de {history.total} sessões registradas neste exemplo fictício.</p>
                <SessionTimeline key={practitioner.id} sessions={history.sessions} />
              </>
            ) : (
              <p className="mt-4 border-t border-border py-5 text-body text-muted">Os registros deste praticante não estão disponíveis nesta demonstração.</p>
            )}
          </section>

          <p className="border-t border-border pt-4 text-small text-muted">Os campos apresentados neste protótipo são demonstrativos e não constituem instrumento clínico validado.</p>
        </>
      )}
    </div>
  )
}
