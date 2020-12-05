export default {
  title: {
    title: 'Titel*',
    info: 'Wie soll das Gesuch heißen?',
    placeholder: 'Wer oder was wird gesucht?',
  },
  category: {
    title: 'Kategorie*',
    info: 'Wähle eine passende Kategorie für das Gesuch aus!',
    options: {
      placeholder: 'Kategorie',
      companions: 'Mitstreiter:innen',
      rooms: 'Räume',
      materials: 'Materialien',
      financials: 'Finanzielle Ressourcen',
      others: 'Sonstiges',
    },
  },
  description: {
    title: 'Beschreibung*',
    info: 'Beschreibe das Gesuch: Was wird gesucht und wozu? Wann wird es gebraucht?',
    placeholder: 'Was muss man über das Gesuch wissen?',
    error: ['Maximale Zeichenlänge erreicht', 'Gib eine Beschreibung ein'],
  },
}