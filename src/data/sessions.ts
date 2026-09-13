export type SessionRecord = {
  number: number
  date: string
  posture: string
  balance: string
  commandResponse: string
  engagement: string
  communication: string
  horseInteraction: string
  activities: string
  observation: string
}

// Fictional excerpt: four of Gabriel's twelve registered sessions.
export const gabrielHistory = {
  total: 12,
  firstRecord: '2026-05-14',
  lastRecord: '2026-09-10',
  sessions: [
    {
      number: 12, date: '2026-09-10', posture: 'Adequada', balance: 'Bom',
      commandResponse: 'Consistente', engagement: 'Alto', communication: 'Verbal', horseInteraction: 'Boa',
      activities: 'Circuito com cones e atividade de coordenação.',
      observation: 'Demonstrou maior independência durante a execução das atividades e manteve bom engajamento ao longo da sessão.',
    },
    {
      number: 11, date: '2026-09-03', posture: 'Adequada', balance: 'Bom',
      commandResponse: 'Consistente', engagement: 'Moderado', communication: 'Verbal', horseInteraction: 'Boa',
      activities: 'Atividades de equilíbrio e reconhecimento de comandos.',
      observation: 'Respondeu adequadamente aos comandos apresentados, com necessidade de orientação pontual em algumas atividades.',
    },
    {
      number: 10, date: '2026-08-27', posture: 'Com apoio', balance: 'Moderado',
      commandResponse: 'Parcial', engagement: 'Alto', communication: 'Verbal', horseInteraction: 'Boa',
      activities: 'Percurso guiado com mudanças de direção e atividade com objetos.',
      observation: 'Apresentou boa participação nas atividades e buscou interação com o cavalo durante diferentes momentos da sessão.',
    },
    {
      number: 9, date: '2026-08-20', posture: 'Com apoio', balance: 'Moderado',
      commandResponse: 'Parcial', engagement: 'Moderado', communication: 'Verbal', horseInteraction: 'Boa',
      activities: 'Atividade de adaptação, condução e exercícios simples de coordenação.',
      observation: 'Participou das atividades propostas com assistência e apresentou boa aceitação do contato com o cavalo.',
    },
  ] satisfies SessionRecord[],
}

export type PractitionerHistoryData = {
  total: number
  firstRecord: string
  lastRecord: string
  sessions: SessionRecord[]
}

// Complete fictional histories for the remaining demonstration practitioners.
const additionalSessions: Record<string, SessionRecord[]> = {
  "ana-beatriz": [
    {
      "number": 3,
      "date": "2026-09-11",
      "posture": "Adequada",
      "balance": "Bom",
      "commandResponse": "Consistente",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Circuito com cones e encaixe de argolas.",
      "observation": "Realizou o percurso e colocou as argolas nos suportes indicados. Solicitou a repetição da atividade ao final."
    },
    {
      "number": 2,
      "date": "2026-09-04",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Consistente",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Percurso com paradas e identificação de objetos.",
      "observation": "Nomeou os objetos apresentados durante as paradas e realizou o percurso com apoio nas mudanças de direção."
    },
    {
      "number": 1,
      "date": "2026-08-28",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Condução guiada e exploração de materiais de diferentes texturas.",
      "observation": "Tocou os materiais oferecidos e comentou suas texturas. Acompanhou a condução com assistência durante o percurso."
    }
  ],
  "lucas-martins": [
    {
      "number": 2,
      "date": "2026-09-11",
      "posture": "Adequada",
      "balance": "Bom",
      "commandResponse": "Consistente",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Percurso entre cones e entrega de objetos em pontos definidos.",
      "observation": "Entregou os objetos nos pontos combinados e respondeu aos comandos de parada. Fez pausas entre as etapas da atividade."
    },
    {
      "number": 1,
      "date": "2026-09-04",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Atividade com bolas e mudanças de direção.",
      "observation": "Escolheu as bolas pelas cores e as entregou durante as paradas. Recebeu orientação para as mudanças de direção."
    }
  ],
  "marina-alves": [
    {
      "number": 2,
      "date": "2026-09-10",
      "posture": "Adequada",
      "balance": "Moderado",
      "commandResponse": "Consistente",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Sequência de comandos e circuito com argolas.",
      "observation": "Acompanhou a sequência de comandos e nomeou as cores das argolas. Pediu para repetir uma etapa do circuito."
    },
    {
      "number": 1,
      "date": "2026-09-03",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Percurso guiado e reconhecimento de pontos de parada.",
      "observation": "Indicou os pontos de parada após a apresentação do percurso. Realizou as etapas com orientação verbal e apoio."
    }
  ],
  "pedro-lima": [
    {
      "number": 2,
      "date": "2026-09-08",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Consistente",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Condução entre marcadores e alcance de objetos.",
      "observation": "Alcançou os objetos durante as paradas e os entregou conforme solicitado. Manteve apoio durante a condução."
    },
    {
      "number": 1,
      "date": "2026-09-01",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Familiarização com o percurso e atividade de identificação de cores.",
      "observation": "Observou o percurso antes da condução e nomeou algumas cores. Solicitou pausas durante a atividade com os marcadores."
    }
  ],
  "carlos-eduardo": [
    {
      "number": 2,
      "date": "2026-09-02",
      "posture": "Adequada",
      "balance": "Bom",
      "commandResponse": "Consistente",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Percurso com mudanças de direção e transporte de argolas.",
      "observation": "Transportou as argolas entre os pontos indicados. Respondeu aos comandos de parada e conversou durante os intervalos."
    },
    {
      "number": 1,
      "date": "2026-08-26",
      "posture": "Adequada",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Atividade com cones e escolha de objetos.",
      "observation": "Escolheu os objetos antes do percurso e os posicionou nos cones. Recebeu orientação pontual para seguir a sequência."
    }
  ],
  "helena-rocha": [
    {
      "number": 2,
      "date": "2026-09-04",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Consistente",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Percurso guiado com paradas para alcançar argolas.",
      "observation": "Alcançou as argolas nas paradas e indicou verbalmente a próxima cor. Utilizou apoio ao retomar o percurso."
    },
    {
      "number": 1,
      "date": "2026-08-28",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Reconhecimento do espaço e atividade com objetos de diferentes tamanhos.",
      "observation": "Explorou os objetos apresentados e comentou seus tamanhos. Participou do percurso com assistência e pausas combinadas."
    }
  ],
  "arthur-mendes": [
    {
      "number": 2,
      "date": "2026-09-01",
      "posture": "Adequada",
      "balance": "Bom",
      "commandResponse": "Consistente",
      "engagement": "Alto",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Circuito com cones e sequência de entrega de bolas.",
      "observation": "Seguiu o circuito e entregou as bolas na sequência apresentada. Nomeou os pontos de parada durante a atividade."
    },
    {
      "number": 1,
      "date": "2026-08-25",
      "posture": "Com apoio",
      "balance": "Moderado",
      "commandResponse": "Parcial",
      "engagement": "Moderado",
      "communication": "Verbal",
      "horseInteraction": "Boa",
      "activities": "Condução guiada e identificação de objetos ao longo do percurso.",
      "observation": "Identificou os objetos após a orientação verbal. Realizou as mudanças de direção com apoio e pediu uma pausa ao final."
    }
  ]
}

export const practitionerHistories: Record<string, PractitionerHistoryData> = {
  'gabriel-silva': gabrielHistory,
  ...Object.fromEntries(Object.entries(additionalSessions).map(([id, records]) => {
    const sessions = [...records].sort((a, b) => b.date.localeCompare(a.date))
    return [id, {
      total: sessions.length,
      firstRecord: sessions[sessions.length - 1].date,
      lastRecord: sessions[0].date,
      sessions,
    }]
  })),
}
