import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import PagePlaceholder from './pages/PagePlaceholder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="praticantes" element={<PagePlaceholder title="Praticantes" description="Consulta de praticantes e acesso ao histórico de sessões." />} />
          <Route path="praticantes/:id" element={<PagePlaceholder title="Histórico do praticante" description="Acompanhamento cronológico dos registros de sessões." />} />
          <Route path="sessoes/nova" element={<PagePlaceholder title="Nova sessão" description="Registro estruturado de uma sessão de equoterapia." />} />
          <Route path="relatorios" element={<PagePlaceholder title="Relatórios" description="Consolidação dos registros de sessões por praticante e período." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
