import { useEffect } from 'react'

type PagePlaceholderProps = {
  title: string
  description?: string
}

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  useEffect(() => {
    document.title = `${title} | EquoTrack`
  }, [title])

  return (
    <header>
      <h1 className="text-page font-semibold">{title}</h1>
      {description && <p className="mt-2 text-body text-muted">{description}</p>}
    </header>
  )
}

export default PagePlaceholder
