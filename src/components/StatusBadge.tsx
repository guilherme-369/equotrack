import type { Practitioner } from '../data/practitioners'

export default function StatusBadge({ status }: { status: Practitioner['status'] }) {
  return (
    <span className={`ui-badge ${status === 'Ativo' ? 'ui-badge-positive' : 'ui-badge-neutral'}`}>
      {status}
    </span>
  )
}

