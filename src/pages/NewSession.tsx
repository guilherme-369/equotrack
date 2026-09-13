import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { practitioners } from '../data/practitioners'

type Field = {
  name: string
  label: string
  type: 'select' | 'date' | 'time' | 'textarea'
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  rows?: number
}

const options = (...labels: string[]) => labels.map((label) => ({ value: label, label }))

const sections: { title: string; description?: string; fields: Field[] }[] = [
  {
    title: 'Identificação da sessão',
    fields: [
      { name: 'practitioner', label: 'Praticante', type: 'select', required: true, options: practitioners.map(({ id, name }) => ({ value: id, label: name })) },
      { name: 'date', label: 'Data', type: 'date', required: true },
      { name: 'professional', label: 'Profissional', type: 'select', required: true, options: options('Fisioterapeuta', 'Psicóloga', 'Terapeuta ocupacional', 'Profissional de equitação') },
      { name: 'time', label: 'Horário', type: 'time' },
    ],
  },
  {
    title: 'Motor',
    description: 'Registre aspectos observados durante a sessão.',
    fields: [
      { name: 'posture', label: 'Postura', type: 'select', required: true, options: options('Adequada', 'Com apoio', 'Necessita assistência') },
      { name: 'balance', label: 'Equilíbrio', type: 'select', required: true, options: options('Bom', 'Moderado', 'Necessita assistência') },
      { name: 'assistanceLevel', label: 'Nível de assistência', type: 'select', required: true, options: options('Independente', 'Assistência mínima', 'Assistência moderada', 'Assistência integral') },
    ],
  },
  {
    title: 'Comportamento',
    fields: [
      { name: 'commandResponse', label: 'Resposta a comandos', type: 'select', required: true, options: options('Consistente', 'Parcial', 'Necessita assistência') },
      { name: 'engagement', label: 'Engajamento', type: 'select', required: true, options: options('Alto', 'Moderado', 'Baixo') },
      { name: 'behavior', label: 'Comportamento observado', type: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Comunicação e interação',
    fields: [
      { name: 'communication', label: 'Comunicação', type: 'select', required: true, options: options('Verbal', 'Não verbal', 'Mista') },
      { name: 'socialInteraction', label: 'Interação social', type: 'select', required: true, options: options('Espontânea', 'Mediada', 'Limitada') },
      { name: 'horseInteraction', label: 'Interação com o cavalo', type: 'select', required: true, options: options('Boa', 'Moderada', 'Necessita mediação') },
    ],
  },
  {
    title: 'Detalhes da sessão',
    fields: [
      { name: 'activities', label: 'Atividades executadas', type: 'textarea', required: true, rows: 3, placeholder: 'Descreva as principais atividades realizadas durante a sessão.' },
      { name: 'incidents', label: 'Intercorrências', type: 'textarea', rows: 3, placeholder: 'Registre intercorrências relevantes, se houver.' },
      { name: 'observation', label: 'Observações complementares', type: 'textarea', required: true, rows: 6, placeholder: 'Registre observações sobre participação, respostas às atividades e outros aspectos relevantes da sessão.' },
    ],
  },
]

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

function SessionForm({ practitionerId }: { practitionerId: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (saved) successRef.current?.focus()
  }, [saved])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const nextErrors: Record<string, string> = {}
    let firstInvalid: FormControl | undefined

    for (const { fields } of sections) {
      for (const field of fields) {
        const control = form.elements.namedItem(field.name) as FormControl
        const value = control.value.trim()
        if (field.required && !value) {
          nextErrors[field.name] = field.type === 'select' ? 'Selecione uma opção.' : 'Preencha este campo.'
        } else if (!control.validity.valid || (value && field.options && !field.options.some((option) => option.value === value))) {
          nextErrors[field.name] = 'Informe um valor válido.'
        }
        if (nextErrors[field.name] && !firstInvalid) firstInvalid = control
      }
    }

    setErrors(nextErrors)
    setSaved(!firstInvalid)
    firstInvalid?.focus()
  }

  return (
    <form noValidate onSubmit={handleSubmit} onChange={() => setSaved(false)} className="space-y-8">
      <div className="space-y-3 rounded-card border border-border bg-surface p-5 text-secondary text-muted">
        <p className="flex items-start gap-3">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-action-strong" />
          <span>Os campos apresentados neste protótipo são demonstrativos e devem ser avaliados pela equipe profissional antes de eventual utilização assistencial.</span>
        </p>
        <p>* Campos obrigatórios.</p>
      </div>

      {sections.map(({ title, description, fields }) => (
        <fieldset key={title} className="min-w-0 border-t border-border pt-6">
          <legend className="text-section font-semibold">{title}</legend>
          {description && <p className="mt-2 text-secondary text-muted">{description}</p>}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {fields.map((field) => {
              const error = errors[field.name]
              const common = {
                id: `session-${field.name}`,
                name: field.name,
                required: field.required,
                defaultValue: field.name === 'practitioner' ? practitionerId : field.name === 'date' ? '2026-09-13' : '',
                'aria-invalid': error ? true : undefined,
                'aria-describedby': error ? `session-${field.name}-error` : undefined,
                className: 'ui-control',
                onChange: () => setErrors((current) => {
                  if (!current[field.name]) return current
                  const next = { ...current }
                  delete next[field.name]
                  return next
                }),
              }
              return (
                <div key={field.name} className={`min-w-0 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                  <label htmlFor={common.id} className="mb-2 block text-secondary font-medium">
                    {field.label}{field.required && <span aria-hidden="true"> *</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select {...common}>
                      <option value="">Selecione...</option>
                      {field.options?.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea {...common} rows={field.rows} placeholder={field.placeholder} className={`${common.className} block resize-y`} />
                  ) : (
                    <input {...common} type={field.type} />
                  )}
                  {error && <p id={common['aria-describedby']} className="mt-2 flex items-start gap-2 text-secondary text-danger"><AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />{error}</p>}
                </div>
              )
            })}
          </div>
        </fieldset>
      ))}

      <div className="border-t border-border pt-8">
        {Object.keys(errors).length > 0 && <p role="alert" className="mb-5 flex items-start gap-2 text-secondary text-danger"><AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />Revise os campos indicados antes de salvar o registro.</p>}
        {saved && (
          <div ref={successRef} tabIndex={-1} role="status" className="mb-6 rounded-card border border-border bg-brand-soft p-5">
            <p className="flex items-start gap-3 text-body font-medium text-brand-dark"><CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />Registro simulado salvo com sucesso.</p>
            <p className="mt-1 text-secondary text-foreground">Este protótipo não realiza persistência em banco de dados.</p>
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:justify-end">
          <button type="submit" className="ui-button ui-button-primary md:order-last">Salvar registro</button>
          <Link to="/praticantes" className="ui-button ui-button-secondary">Cancelar</Link>
        </div>
      </div>
    </form>
  )
}

export default function NewSession() {
  const [searchParams] = useSearchParams()
  const practitionerId = practitioners.find(({ id }) => id === searchParams.get('praticante'))?.id ?? ''

  useEffect(() => {
    document.title = 'Nova sessão | EquoTrack'
  }, [])

  return (
    <div className="max-w-form space-y-8">
      <header>
        <h1 className="text-page font-bold">Nova sessão</h1>
        <p className="mt-2 text-body text-muted">Registre as informações observadas durante a sessão de equoterapia.</p>
      </header>
      <SessionForm key={practitionerId} practitionerId={practitionerId} />
    </div>
  )
}
