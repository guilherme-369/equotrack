import type { SessionRecord } from '../data/sessions'

export const structuredFields = [
  { key: 'posture', label: 'Postura' },
  { key: 'balance', label: 'Equilíbrio' },
  { key: 'commandResponse', label: 'Resposta a comandos' },
  { key: 'engagement', label: 'Engajamento' },
  { key: 'communication', label: 'Comunicação' },
  { key: 'horseInteraction', label: 'Interação com o cavalo' },
] as const satisfies readonly { key: keyof SessionRecord; label: string }[]

export function selectReportSessions(sessions: SessionRecord[], start: string, end: string) {
  return sessions
    .filter(({ date }) => (!start || date >= start) && (!end || date <= end))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function countObservations(sessions: SessionRecord[], key: typeof structuredFields[number]['key']) {
  const counts = new Map<string, number>()
  for (const session of sessions) {
    counts.set(session[key], (counts.get(session[key]) ?? 0) + 1)
  }
  return Array.from(counts, ([value, count]) => ({ value, count }))
}
