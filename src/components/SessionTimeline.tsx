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
    <li className="relative pb-10 pl-6 last:pb-0 md:pl-10">
      <span aria-hidden="true" className="absolute top-1 -left-[7px] h-3 w-3 rounded-badge border-2 border-background bg-brand" />
      <article aria-labelledby={`session-${session.number}-heading`}>
        <time dateTime={session.date} className="font-heading text-subsection font-semibold text-brand-dark tabular-nums">
          {session.date.split('-').reverse().join('/')}
        </time>
        <h3 id={`session-${session.number}-heading`} className="mt-2 text-subsection font-semibold">Sessão #{session.number}</h3>

        <div id={contentId} className="mt-6 space-y-6">
          <div className="grid gap-6 rounded-card border border-border bg-surface p-5 md:grid-cols-2">
            <ObservationGroup title="Motor" observations={[
              ['Postura', session.posture], ['Equilíbrio', session.balance],
            ]} />
            <ObservationGroup title="Comportamento" observations={[
              ...(expanded ? [['Resposta a comandos', session.commandResponse] as [string, string]] : []),
              ['Engajamento', session.engagement],
            ]} />
            {expanded && <ObservationGroup title="Comunicação e interação" observations={[
              ['Comunicação', session.communication], ['Interação com o cavalo', session.horseInteraction],
            ]} />}
          </div>
          <div className="border-l-2 border-brand-soft pl-4">
            <h4 className="text-secondary font-semibold text-brand-dark">Atividades</h4>
            <p className="mt-1 text-body">{session.activities}</p>
          </div>
          <div className="rounded-card bg-background p-5">
            <h4 className="text-secondary font-semibold">Observação narrativa</h4>
            <p className="mt-2 text-body leading-7">
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
          className="ui-link mt-3 text-secondary"
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
