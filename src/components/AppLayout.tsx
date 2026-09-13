import { ClipboardPlus, FileText, LayoutDashboard, Users } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/praticantes', label: 'Praticantes', icon: Users },
  { to: '/sessoes/nova', label: 'Nova sessão', icon: ClipboardPlus },
  { to: '/relatorios', label: 'Relatórios', icon: FileText },
]

function AppLayout() {
  return (
    <div className="min-h-dvh desktop:grid desktop:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:not-sr-only focus:rounded-button focus:bg-surface focus:px-4 focus:py-3 focus:text-action-strong"
      >
        Pular para o conteúdo
      </a>

      <header className="app-sidebar px-4 py-6 md:px-6 desktop:sticky desktop:top-0 desktop:h-dvh desktop:overflow-y-auto desktop:px-4 desktop:py-8">
        <div className="mb-6 border-b border-surface/20 pb-6 font-heading text-section font-bold desktop:mb-8 desktop:px-4">
          EquoTrack
        </div>
        <nav aria-label="Navegação principal">
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 desktop:grid-cols-1">
            {navigation.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="app-nav-link text-secondary desktop:text-body"
                >
                  <Icon size={18} aria-hidden="true" className="shrink-0" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1} className="min-w-0 p-4 md:p-6 desktop:p-8">
        <div className="mx-auto w-full max-w-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
