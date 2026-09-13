import { practitionerHistories } from './sessions'

export type Practitioner = {
  id: string
  name: string
  lastSession: string
  status: 'Ativo' | 'Pausado'
}

// Fictional data for the academic prototype.
const practitionerProfiles: Omit<Practitioner, 'lastSession'>[] = [
  { id: 'ana-beatriz', name: 'Ana Beatriz', status: 'Ativo' },
  { id: 'gabriel-silva', name: 'Gabriel Silva', status: 'Ativo' },
  { id: 'lucas-martins', name: 'Lucas Martins', status: 'Ativo' },
  { id: 'marina-alves', name: 'Marina Alves', status: 'Ativo' },
  { id: 'pedro-lima', name: 'Pedro Lima', status: 'Ativo' },
  { id: 'carlos-eduardo', name: 'Carlos Eduardo', status: 'Pausado' },
  { id: 'helena-rocha', name: 'Helena Rocha', status: 'Pausado' },
  { id: 'arthur-mendes', name: 'Arthur Mendes', status: 'Pausado' },
]

// Both pages use the newest history date as the source of truth.
export const practitioners: Practitioner[] = practitionerProfiles.map((practitioner) => ({
  ...practitioner,
  lastSession: practitionerHistories[practitioner.id].lastRecord,
}))
