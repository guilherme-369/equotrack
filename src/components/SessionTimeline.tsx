import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { SessionRecord } from '../data/sessions'

function ObservationGroup({ title, observations }: { title: string; observations: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-2 text-secondary font-semibold">{title}</h4>
      <dl className="space-y-2 text-secondary">
        {observations.map(([label, value]) => (
          <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
            <dt className="text-muted">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function TimelineEntry({ session }: { session: SessionRecord }) {
  const [expanded, setExpanded] = useState(false)
  const contentId = `session-${session.number}-record`
  const Icon = expanded ? ChevronUp : ChevronDown

  return (
    <li className="relative pb-8 pl-6 last:pb-0 md:pl-8">
      <span aria-hidden="true" className="absolute top-1 -left-[5px] h-2 w-2 rounded-badge bg-primary" />
      <article aria-labelledby={`session-${session.number}-heading`}>
        <time dateTime={session.date} className="text-secondary font-medium text-muted tabular-nums">
          {session.date.split('-').reverse().join('/')}
        </time>
        <h3 id={`session-${session.number}-heading`} className="mt-1 text-section font-semibold">Sessão #{session.number}</h3>

        <div id={contentId} className="mt-4 space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <ObservationGroup title="Motor" observations={[
              ['Postura', session.posture], ['Equilíbrio', session.balance],
            ]} />
            <ObservationGroup title="Comportamento" observations={[
              ...(expanded ? [['Resposta a comandos', session.commandResponse] as [string, string]] : []),
              ['Engajamento', session.engagement],
            ]} />
            {expanded && (
              <ObservationGroup title="Comunicação e interação" observations={[
                ['Comunicação', session.communication], ['Interação com o cavalo', session.horseInteraction],
              ]} />
            )}
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="text-secondary font-semibold">Atividades</h4>
            <p className="mt-1 text-body">{session.activities}</p>
          </div>
          <div>
            <h4 className="text-secondary font-semibold">Observação</h4>
            <p className="mt-1 text-body leading-6">
              {expanded ? session.observation : `${session.observation.slice(0, session.observation.lastIndexOf(' ', 80))}…`}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          aria-label={`${expanded ? 'Recolher registro' : 'Ver registro completo'} da sessão ${session.number}`}
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-button text-secondary font-medium text-primary hover:text-primary-hover hover:underline"
        >
          {expanded ? 'Recolher registro' : 'Ver registro completo'}
          <Icon size={16} aria-hidden="true" />
        </button>
      </article>
    </li>
  )
}

export default function SessionTimeline({ sessions }: { sessions: SessionRecord[] }) {
  return (
    <ol aria-label="Sessões da mais recente para a mais antiga" className="ml-1 border-l border-border">
      {sessions.map((session) => <TimelineEntry key={session.number} session={session} />)}
    </ol>
  )
}
