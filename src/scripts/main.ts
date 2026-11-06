type Therapy = { id:string; tag:string; title:string; intro:string; paragraphs:string[]; points:string[]; note:string };
const therapies: Therapy[] = JSON.parse(document.querySelector('#therapy-data')?.textContent || '[]');
const infoDialog = document.querySelector<HTMLDialogElement>('#info-dialog')!;
const bookingDialog = document.querySelector<HTMLDialogElement>('#booking-dialog')!;
const infoTitle = document.querySelector<HTMLElement>('#info-title')!;
const infoTag = document.querySelector<HTMLElement>('#info-tag')!;
const infoBody = document.querySelector<HTMLElement>('#info-body')!;
const infoBook = document.querySelector<HTMLButtonElement>('#info-book')!;
let selectedTherapy = 'consulta';
let returnFocus: HTMLElement | null = null;

function showDialog(dialog: HTMLDialogElement) {
  if (!document.querySelector('dialog[open]')) returnFocus = document.activeElement as HTMLElement;
  document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(d=>d.close());
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
}
function closeDialog(dialog: HTMLDialogElement) { dialog.close(); }
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{
    if (!document.querySelector('dialog[open]')) {
      document.body.classList.remove('dialog-open');
      returnFocus?.focus();
    }
  });
  dialog.querySelector('[data-close]')?.addEventListener('click',()=>closeDialog(dialog));
  dialog.addEventListener('click',event=>{
    if (event.target !== dialog) return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
  });
});

function paragraph(text:string, className='') {
  const p=document.createElement('p'); p.textContent=text; p.className=className; return p;
}
function showInfo(title:string, tag:string, intro:string, texts:string[], points:string[], note:string, canBook=true) {
  infoTitle.textContent=title; infoTag.textContent=tag;
  infoBody.replaceChildren(paragraph(intro,'dialog-intro'));
  texts.forEach(text=>infoBody.append(paragraph(text)));
  if(points.length) {
    const ul=document.createElement('ul');
    points.forEach(text=>{ const li=document.createElement('li'); li.textContent=text; ul.append(li); });
    infoBody.append(ul);
  }
  if(note) infoBody.append(paragraph(note,'info-note'));
  infoBook.hidden=!canBook;
  showDialog(infoDialog);
}
document.querySelectorAll<HTMLButtonElement>('[data-therapy]').forEach(button=>button.addEventListener('click',()=>{
  const t=therapies.find(item=>item.id===button.dataset.therapy);
  if(!t) return;
  selectedTherapy=t.id;
  showInfo(t.title,t.tag,t.intro,t.paragraphs,t.points,t.note);
}));

const form=document.querySelector<HTMLFormElement>('#booking-form')!;
const success=document.querySelector<HTMLElement>('#booking-success')!;
const service=document.querySelector<HTMLSelectElement>('#service')!;
const dates=document.querySelector<HTMLElement>('#date-options')!;
const times=document.querySelector<HTMLElement>('#time-options')!;
const summary=document.querySelector<HTMLElement>('#booking-summary')!;
const submit=document.querySelector<HTMLButtonElement>('.booking-submit')!;
let chosenDate='', chosenTime='';
const availableDates: Date[]=[];
const mexicoDate=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part=(type:string)=>mexicoDate.find(p=>p.type===type)!.value;
const today=new Date(`${part('year')}-${part('month')}-${part('day')}T12:00:00Z`);
for(let i=1;availableDates.length<5;i++){
  const d=new Date(today); d.setUTCDate(d.getUTCDate()+i);
  if(d.getUTCDay()!==0 && d.getUTCDay()!==6) availableDates.push(d);
}
const longDate=(iso:string)=>new Intl.DateTimeFormat('es-MX',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(iso));
function updateSummary(){
  submit.disabled=!(chosenDate&&chosenTime);
  summary.textContent=chosenDate&&chosenTime ? `${service.options[service.selectedIndex].text} · ${longDate(chosenDate)} · ${chosenTime} h` : 'Selecciona un día y un horario para continuar.';
}
function renderTimes(index:number){
  times.replaceChildren();
  ['09:00','10:30','12:00','13:30','15:00','16:30','17:30','18:00'].forEach((time,i)=>{
    const button=document.createElement('button'); button.type='button'; button.className='time-option';button.textContent=time;
    button.disabled=(i+index)%5===3;
    button.setAttribute('aria-label',`${time}${button.disabled?' — no disponible en la demo':''}`);
    button.setAttribute('aria-pressed','false');
    button.addEventListener('click',()=>{
      chosenTime=time;
      times.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      updateSummary();
    }); times.append(button);
  });
}
availableDates.forEach((date,index)=>{
  const iso=date.toISOString();
  const button=document.createElement('button');button.type='button';button.className='date-option';button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',longDate(iso));
  const weekday=document.createElement('span');weekday.textContent=new Intl.DateTimeFormat('es-MX',{weekday:'short',timeZone:'UTC'}).format(date).replace('.','');
  const day=document.createElement('strong');day.textContent=String(date.getUTCDate());
  const month=document.createElement('span');month.className='month';month.textContent=new Intl.DateTimeFormat('es-MX',{month:'short',timeZone:'UTC'}).format(date).replace('.','');
  button.append(weekday,day,month);dates.append(button);
  button.addEventListener('click',()=>{
    chosenDate=iso;chosenTime='';
    dates.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    renderTimes(index);updateSummary();
  });
});
function resetBooking(){
  form.hidden=false;success.hidden=true;chosenDate='';chosenTime='';
  dates.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
  times.replaceChildren(paragraph('Selecciona primero un día.'));updateSummary();
}
function openBooking(id='consulta'){
  resetBooking();service.value=id;showDialog(bookingDialog);
}
document.querySelectorAll<HTMLButtonElement>('[data-book]').forEach(button=>button.addEventListener('click',()=>openBooking(button.id==='info-book'?selectedTherapy:'consulta')));
service.addEventListener('change',updateSummary);
form.addEventListener('submit',event=>{
  event.preventDefault();if(!chosenDate||!chosenTime)return;
  document.querySelector('#success-summary')!.textContent=summary.textContent;
  form.hidden=true;success.hidden=false;bookingDialog.scrollTop=0;
  document.querySelector<HTMLButtonElement>('#book-again')!.focus();
});
document.querySelector('#book-again')!.addEventListener('click',()=>{resetBooking();service.focus();});

const menu=document.querySelector<HTMLButtonElement>('.menu-button')!;
const nav=document.querySelector<HTMLElement>('#main-nav')!;
function closeMenu(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.matchMedia('(min-width:701px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>{
  selectedTherapy='consulta';
  showInfo('Conversemos.','CIUDAD DE MÉXICO','Tu próxima consulta comienza con una conversación.',['En la versión final, este espacio conectará con el WhatsApp y los datos reales del consultorio.','Por ahora, puedes explorar el recorrido de la agenda de demostración.'],[],'Maqueta: el teléfono, la dirección, los horarios y el perfil del médico están pendientes de confirmación.');
}));
document.querySelector('[data-privacy]')?.addEventListener('click',()=>showInfo('Tu privacidad.','VISTA PREVIA','Una demo sin datos personales.',['Esta maqueta no solicita datos de pacientes, no envía formularios y no almacena selecciones de citas.','No se incluyen herramientas de analítica ni un sistema de reservas. La versión final necesitará el aviso de privacidad del responsable del consultorio.'],[],'Las selecciones de la agenda desaparecen al recargar la página.',false));
document.querySelectorAll<HTMLButtonElement>('[data-article]').forEach(button=>button.addEventListener('click',()=>{
  selectedTherapy='consulta';
  if(button.dataset.article==='primera'){
    showInfo('Preguntar también es cuidarte.','TU CONSULTA · LECTURA BREVE','Lleva tus dudas. Todas tienen un lugar.', ['Una consulta es una oportunidad para entender las opciones y participar en las decisiones. Puedes llevar una lista de lo que te gustaría conversar.'],['¿Qué sabemos sobre mi situación y qué falta revisar?','¿Qué evidencia respalda esta opción para mi caso?','¿Cuáles son los riesgos y las alternativas?','¿Cómo revisaremos los resultados y cuándo?'],'Lleva una lista de tus medicamentos y suplementos, y los estudios recientes que tengas.');
  }else{
    showInfo('Antes de tomar un suplemento.','DECISIONES INFORMADAS · LECTURA BREVE','Más no siempre significa mejor.',['Un suplemento puede ser útil en situaciones concretas, pero no reemplaza una alimentación variada ni un tratamiento médico.','Comparte con el profesional los nombres y cantidades de todos los productos que utilizas. Así podrá revisar duplicidades e interacciones.'],['Pregunta si existe una necesidad documentada.','Revisa la dosis, la duración y las interacciones.','No cambies medicamentos prescritos por un suplemento.'],'La elección debe considerar tu situación individual.');
    const source=document.createElement('a');source.className='source-link';source.href='https://ods.od.nih.gov/factsheets/DietarySupplements-Consumer/';source.target='_blank';source.rel='noopener noreferrer';source.textContent='Fuente: NIH · Información sobre suplementos';infoBody.append(source);
  }
}));
