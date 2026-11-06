// Identidad provisional. Sustituir con los datos confirmados del consultorio.
export const clinic = {
  name: 'ALMA',
  specialty: 'Medicina integrativa',
  city: 'Ciudad de México',
  demo: true,
  doctor: '',
  professionalLicense: '',
  address: '',
  whatsapp: '',
};

export const therapies = [
  {
    id: 'consulta', number: '01', tag: 'EL PUNTO DE PARTIDA',
    title: 'Consulta integrativa',
    short: 'Tu historia, tus hábitos y tus objetivos. El tiempo y la atención que mereces.',
    intro: 'Una conversación para comprender tu salud en contexto.',
    paragraphs: ['La consulta comienza con tu historia clínica, tus inquietudes y una revisión de los tratamientos que ya utilizas.', 'A partir de esa valoración se conversa sobre opciones, prioridades y seguimiento. Las decisiones se toman contigo, considerando la evidencia disponible y tus preferencias.'],
    points: ['Revisión de antecedentes y tratamientos', 'Objetivos personales y expectativas', 'Plan de seguimiento individual'],
    note: 'Los enfoques complementarios no deben sustituir ni retrasar una atención médica necesaria.',
  },
  {
    id: 'ozono', number: '02', tag: 'INFORMACIÓN Y VALORACIÓN',
    title: 'Ozonoterapia',
    short: 'Conoce este enfoque, la evidencia disponible y las preguntas que conviene hacer.',
    intro: 'Antes de elegir una terapia, necesitas información clara.',
    paragraphs: ['La ozonoterapia utiliza mezclas de oxígeno y ozono en distintos procedimientos. Su mención en esta página no implica una eficacia demostrada para una enfermedad concreta.', 'Antes de considerar un procedimiento, solicita una explicación de la evidencia para tu caso, los riesgos, las alternativas y las credenciales del profesional. No se presenta aquí como cura ni como sustituto de tratamientos establecidos.'],
    points: ['Revisión individual de tu situación clínica', 'Conversación sobre evidencia y alternativas', 'Explicación de riesgos y consentimiento'],
    note: 'El ozono puede ser tóxico. La valoración profesional no elimina los riesgos ni garantiza beneficios. Este sitio no ofrece instrucciones de aplicación.',
  },
  {
    id: 'oligo', number: '03', tag: 'UNA MIRADA A LOS MICRONUTRIENTES',
    title: 'Oligoterapia',
    short: 'Una conversación sobre oligoelementos, alimentación y suplementación individual.',
    intro: 'Pequeños elementos. Decisiones bien informadas.',
    paragraphs: ['La oligoterapia propone el uso de oligoelementos. Que un mineral participe en funciones del organismo no demuestra que suplementarlo trate una enfermedad.', 'La necesidad de un suplemento, su cantidad y su compatibilidad con medicamentos requieren una evaluación individual. Una carencia documentada y una propuesta de terapia general no son lo mismo.'],
    points: ['Revisión de alimentación y suplementos actuales', 'Evaluación de posibles carencias', 'Consideración de interacciones y excesos'],
    note: 'Los suplementos no reemplazan una alimentación variada ni los medicamentos indicados. Evita la automedicación.',
  },
];

export const faqs = [
  ['¿Qué significa medicina integrativa?', 'Es una mirada que considera a la persona en su conjunto y conversa sobre enfoques complementarios junto con la atención médica convencional. Cada opción debe evaluarse por su evidencia, sus riesgos y su pertinencia para tu caso.'],
  ['¿Cómo es la primera consulta?', 'Se revisan tu historia, los medicamentos y suplementos que utilizas y tus objetivos. Lleva los estudios recientes que tengas. La propuesta final, duración y costo se confirman directamente con el consultorio.'],
  ['¿Necesito saber qué terapia elegir?', 'No. Puedes comenzar con una consulta de valoración. Conocer las opciones, sus límites y sus alternativas forma parte de una decisión informada.'],
  ['¿Puedo continuar con mi tratamiento actual?', 'No suspendas ni modifiques un tratamiento indicado por tu cuenta. Informa al profesional sobre todos tus medicamentos y suplementos para revisar posibles interacciones y coordinar tu atención.'],
  ['¿Dónde se encuentra el consultorio?', 'El proyecto está pensado para un médico en Ciudad de México. La dirección, los horarios y los datos del profesional se incorporarán una vez confirmados.'],
];
