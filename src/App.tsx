import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import PagePlaceholder from './pages/PagePlaceholder'
import Practitioners from './pages/Practitioners'
import PractitionerHistory from './pages/PractitionerHistory'
import NewSession from './pages/NewSession'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="praticantes" element={<Practitioners />} />
          <Route path="praticantes/:id" element={<PractitionerHistory />} />
          <Route path="sessoes/nova" element={<NewSession />} />
          <Route path="relatorios" element={<PagePlaceholder title="Relatórios" description="Consolidação dos registros de sessões por praticante e período." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
