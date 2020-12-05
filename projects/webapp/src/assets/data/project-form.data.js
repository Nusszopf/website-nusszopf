export default {
  contact: {
    title: 'Kontakt',
    info:
      'Kann man dich über deine E-Mailadresse kontaktieren oder soll die Kommunikation erst einmal über den Nusszopf laufen?',
    label: ['Direkt kontaktieren unter', 'möglich'],
  },
  goal: {
    title: 'Ziel des Projekts*',
    info: 'Was soll mit dem Projekt erreicht werden?',
    placeholder: 'Wie lässt sich das Ziel des Projektes in einem Satz beschreiben?',
    error: ['Nicht mehr als 150 Zeichen', 'Gib ein Ziel ein'],
  },
  location: {
    title: 'Ort*',
    info: 'Ist das Projekt an einen bestimmten Ort gebunden?',
    placeholder: 'Ort',
    action: 'Projekt ist ortsunabhängig',
    error: ['Gib einen Ort ein', 'Wähle einen Ort aus der Liste aus'],
  },
  motto: {
    title: 'Projektmotto',
    info: 'Wie lässt sich eure Arbeitsweise beschreiben?',
    placeholder: 'Was ist euer Projektmotto?',
    error: 'Nicht mehr als 200 Zeichen',
  },
  period: {
    title: 'Projektzeitraum*',
    info: 'Gibt es einen definierten Zeitraum, in welchem das Projekt stattfindet?',
    action: {
      switch: 'Projektzeitraum ist flexibel',
      from: 'Von',
      to: 'Bis',
      placeholder: 'dd.mm.yyyy',
    },
    error: ['Gib ein Startdatum ein', 'Nicht im Format dd.mm.yyyy', 'Gib ein Enddatum ein', 'Enddatum vor Startdatum'],
  },
  project: {
    title: 'Projektbeschreibung*',
    info:
      'Worum geht es bei dem Projekt? Wie kam es zu dem Projekt? Welche/s Problem/e sollen mit dem Projekt gelöst werden? Was steht schon fest für den Projektprozess?',
    placeholder: 'Was muss man über das Projekt wissen?',
    error: ['Maximale Zeichenlänge erreicht', 'Gib eine Beschreibung ein'],
  },
  team: {
    title: 'Projektteam',
    info:
      'Wer macht bei dem Projekt mit? Wie arbeitet ihr zusammen bzw. wollt ihr zusammen arbeiten? Wie organisiert ihr euch? Was gibt es über euch unbedingt zu wissen?',
    placeholder: 'Was muss man über das Projektteam wissen?',
    error: 'Maximale Zeichenlänge erreicht',
  },
  title: {
    title: 'Titel*',
    info: 'Gib deinem Projekt einen Titel.',
    placeholder: 'Wie heißt das Projekt?',
    error: ['Nicht mehr als 30 Zeichen', 'Gib einen Titel ein'],
  },
  visibility: {
    title: 'Sichtbarkeit',
    info: 'Soll das Projekt allgemein oder nur für dich sichtbar sein?',
    public: {
      title: 'Öffentlich',
      description: 'Projekt kann über Nusszopf und Suchmaschinen gefunden werden',
    },
    private: {
      title: 'Privat',
      description: 'Projekt ist nur für dich sichtbar.',
    },
  },
}