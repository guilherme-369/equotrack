import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Printer } from 'lucide-react'
import { practitioners } from '../data/practitioners'
import { practitionerHistories } from '../data/sessions'
import { countObservations, selectReportSessions, structuredFields } from '../utils/report'
import './Reports.css'

const initialConfiguration = { practitionerId: 'gabriel-silva', start: '2026-08-20', end: '2026-09-10' }
const controlClass = 'ui-control'

function formatDate(date: string) {
  return date.split('-').reverse().join('/')
}

function periodLabel(start: string, end: string) {
  if (start && end) return `${formatDate(start)} a ${formatDate(end)}`
  if (start) return `A partir de ${formatDate(start)}`
  if (end) return `Até ${formatDate(end)}`
  return 'Todos os registros disponíveis'
}

export default function Reports() {
  const [configuration, setConfiguration] = useState(initialConfiguration)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState('')
  const previewHeading = useRef<HTMLHeadingElement>(null)
  const practitioner = practitioners.find(({ id }) => id === configuration.practitionerId)!
  const sessions = selectReportSessions(practitionerHistories[practitioner.id].sessions, configuration.start, configuration.end)

  useEffect(() => {
    document.title = 'Relatórios | EquoTrack'
  }, [])

  function generatePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const practitionerControl = form.elements.namedItem('practitioner') as HTMLSelectElement
    const startControl = form.elements.namedItem('start') as HTMLInputElement
    const endControl = form.elements.namedItem('end') as HTMLInputElement
    const nextErrors: Record<string, string> = {}
    if (!practitioners.some(({ id }) => id === practitionerControl.value)) nextErrors.practitioner = 'Selecione um praticante.'
    if (!startControl.validity.valid) nextErrors.start = 'Informe uma data válida.'
    if (!endControl.validity.valid) nextErrors.end = 'Informe uma data válida.'
    if (startControl.value && endControl.value && startControl.value > endControl.value) {
      nextErrors.start = 'A data inicial não pode ser posterior à data final.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setFeedback('')
      const firstInvalid = [practitionerControl, startControl, endControl].find((control) => nextErrors[control.name])
      firstInvalid?.focus()
      return
    }
    setConfiguration({ practitionerId: practitionerControl.value, start: startControl.value, end: endControl.value })
    setFeedback('Visualização atualizada com os filtros selecionados.')
    requestAnimationFrame(() => previewHeading.current?.focus())
  }

  return (
    <div className="reports-page max-w-form space-y-8">
      <header className="report-screen-only">
        <h1 className="text-page font-bold">Relatórios</h1>
        <p className="mt-2 text-body text-muted">Consolide os registros de sessões para consulta e elaboração de relatórios.</p>
      </header>

      <section aria-labelledby="report-configuration-heading" className="report-screen-only ui-card">
        <h2 id="report-configuration-heading" className="mb-5 text-section font-semibold">Configurar relatório</h2>
        <form noValidate onSubmit={generatePreview}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="min-w-0">
              <label htmlFor="report-practitioner" className="mb-2 block text-secondary font-medium">Praticante <span aria-hidden="true">*</span></label>
              <select id="report-practitioner" name="practitioner" required defaultValue={initialConfiguration.practitionerId} aria-invalid={!!errors.practitioner} aria-describedby={errors.practitioner ? 'report-practitioner-error' : undefined} className={controlClass}>
                <option value="">Selecione...</option>
                {practitioners.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
              {errors.practitioner && <p role="alert" id="report-practitioner-error" className="mt-1 text-secondary text-danger">{errors.practitioner}</p>}
            </div>
            {([{ name: 'start', label: 'Período inicial' }, { name: 'end', label: 'Período final' }] as const).map(({ name, label }) => (
              <div key={name} className="min-w-0">
                <label htmlFor={`report-${name}`} className="mb-2 block text-secondary font-medium">{label}</label>
                <input id={`report-${name}`} name={name} type="date" defaultValue={initialConfiguration[name]} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `report-${name}-error` : undefined} className={controlClass} />
                {errors[name] && <p role="alert" id={`report-${name}-error`} className="mt-1 text-secondary text-danger">{errors[name]}</p>}
              </div>
            ))}
          </div>
          <button type="submit" className="ui-button ui-button-primary mt-5 w-full md:w-auto">Gerar visualização</button>
          <p role="status" className="mt-2 text-secondary text-muted">{feedback}</p>
        </form>
      </section>

      <section aria-labelledby="report-preview-heading">
        <div className="report-screen-only mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 ref={previewHeading} tabIndex={-1} id="report-preview-heading" className="text-section font-semibold">Visualização do relatório</h2>
          {sessions.length > 0 && <button type="button" onClick={() => window.print()} className="ui-button ui-button-secondary text-secondary"><Printer size={16} aria-hidden="true" />Imprimir</button>}
        </div>

        <article className="report-document ui-card md:p-10" aria-label={`Relatório de acompanhamento de ${practitioner.name}`}>
          <header className="border-b-2 border-brand-soft pb-8">
            <p className="text-body font-semibold tracking-wide text-brand">EquoTrack</p>
            <h3 className="mt-3 text-section font-semibold">Relatório de acompanhamento</h3>
            <dl className="mt-6 space-y-2 text-body">
              <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Praticante:</dt><dd className="font-medium">{practitioner.name}</dd></div>
              <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Período:</dt><dd className="tabular-nums">{periodLabel(configuration.start, configuration.end)}</dd></div>
              <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Sessões consideradas:</dt><dd className="tabular-nums">{sessions.length}</dd></div>
            </dl>
          </header>

          {sessions.length === 0 ? (
            <div role="status" className="py-8">
              <p className="text-body font-medium">Nenhum registro encontrado no período selecionado.</p>
              <p className="mt-1 text-secondary text-muted">Altere o período ou selecione outro praticante.</p>
            </div>
          ) : (
            <>
              <p className="my-6 text-body leading-6">Este relatório consolida os registros das sessões realizadas no período selecionado, reunindo informações estruturadas e observações narrativas registradas ao longo do acompanhamento.</p>
              <section aria-labelledby="structured-report-heading">
                <h4 id="structured-report-heading" className="text-section font-semibold">Síntese dos registros estruturados</h4>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                  {structuredFields.map(({ key, label }) => (
                    <div key={key} className="report-observation-group border-l-2 border-brand-soft pl-4">
                      <h5 className="mb-2 text-body font-semibold text-brand-dark">{label}</h5>
                      <dl className="space-y-1 text-secondary">
                        {countObservations(sessions, key).map(({ value, count }) => (
                          <div key={value} className="flex flex-wrap gap-x-2"><dt>{value}:</dt><dd className="text-muted">{count} {count === 1 ? 'registro' : 'registros'}</dd></div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="period-records-heading" className="mt-8">
                <h4 id="period-records-heading" className="text-section font-semibold">Registros do período</h4>
                <ol className="mt-4 divide-y divide-border">
                  {sessions.map((session) => (
                    <li key={session.number} className="report-session py-6 first:pt-0">
                      <h5 className="font-heading text-subsection font-semibold text-brand-dark"><time dateTime={session.date}>{formatDate(session.date)}</time> <span className="font-sans text-body font-semibold text-foreground">— Sessão #{session.number}</span></h5>
                      <dl className="mt-3 space-y-3 text-body leading-6">
                        <div><dt className="text-secondary font-medium">Atividades:</dt><dd>{session.activities}</dd></div>
                        <div><dt className="text-secondary font-medium">Observação:</dt><dd>{session.observation}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          )}

          <footer className="mt-6 border-t border-border pt-4 text-small text-muted">Documento demonstrativo gerado a partir de dados fictícios do protótipo. Os campos utilizados não constituem instrumento clínico validado.</footer>
        </article>
      </section>
    </div>
  )
}
