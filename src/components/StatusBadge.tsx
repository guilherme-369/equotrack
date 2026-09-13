import type { Practitioner } from '../data/practitioners'

export default function StatusBadge({ status }: { status: Practitioner['status'] }) {
  return (
    <span className={`inline-block rounded-badge px-2 py-1 text-small font-medium ${status === 'Ativo' ? 'bg-primary-soft text-primary' : 'bg-background text-muted'}`}>
      {status}
    </span>
  )
}

