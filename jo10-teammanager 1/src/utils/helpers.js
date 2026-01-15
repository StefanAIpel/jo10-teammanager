// Datum helpers
export const TODAY = new Date().toISOString().split('T')[0];
export const TODAY_SHORT = new Date().toLocaleDateString('nl-NL', { 
  weekday: 'short', 
  day: 'numeric', 
  month: 'short' 
}).replace('.', '');

// Score resultaat bepalen
// Bij UIT: 2e getal is score van Hooglanderveen
// Bij THUIS: 1e getal is score van Hooglanderveen
export function getScoreResult(uitslag, type) {
  if (!uitslag) return '';
  const parts = uitslag.match(/(\d+)\s*[-:]\s*(\d+)/);
  if (!parts) return 'draw';
  const [, thuis, uit] = parts.map(Number);
  const onzeScore = type === 'uit' ? uit : thuis;
  const hunScore = type === 'uit' ? thuis : uit;
  if (onzeScore > hunScore) return 'win';
  if (onzeScore < hunScore) return 'loss';
  return 'draw';
}

// Volgende wedstrijd vinden
export function getNextMatch(wedstrijden) {
  return wedstrijden.find(m => 
    m.sortDate >= TODAY && 
    m.type !== 'info' && 
    m.type !== 'ntb' && 
    m.type !== 'vrij' &&
    !m.uitslag
  );
}

// Vrijdagen voor techniektraining (feb-mei)
export function getVrijdagen() {
  const vrijdagen = [];
  const start = new Date('2026-02-27');
  const end = new Date('2026-05-31');
  let d = new Date(start);
  while (d <= end) {
    if (d.getDay() === 5) { // Vrijdag
      vrijdagen.push(d.toISOString().split('T')[0]);
    }
    d.setDate(d.getDate() + 1);
  }
  return vrijdagen;
}

// WhatsApp bericht genereren
export function generateWhatsAppMessage(match) {
  const { datum, tegenstander, type, verzamelTijd, aftrap, veld, kleedkamer, 
          verzamelPlek, spelbegeleider, chauffeurs, afwezig, invallers, info } = match;
  
  const isThuis = type === 'thuis';
  const loc = isThuis ? 'thuis' : 'uit';
  
  let msg = `*Zaterdag competitie: ${tegenstander} (${loc})* ⚽\n\n`;
  msg += `⏰ *Verzamelen:* ${verzamelTijd || 'NTB'} uur`;
  msg += isThuis ? ' voor de kleedkamers.\n' : ` _vertrek_ bij ${verzamelPlek || 'Karwei Vathorst'}\n`;
  msg += '👕 *Kleding:* wedstrijdkleding/presentatiepak vooraf aantrekken\n';
  
  if (isThuis) {
    msg += '📍 *Locatie:* thuis\n';
    msg += '🚴 *Vervoer:* kom op de fiets!\n';
  } else {
    if (verzamelPlek) msg += `📍 *Verzamelplek:* ${verzamelPlek}\n`;
    msg += `🚗 *Vervoer:* _${chauffeurs && chauffeurs.length ? chauffeurs.join('_, _') : 'NTB'}_\n`;
  }
  
  msg += '\n';
  if (afwezig && afwezig.length > 0) msg += `🚫 *Afwezig:* ${afwezig.join(', ')}\n`;
  if (invallers && invallers.length > 0) msg += `🔀 *Invallers:* +${invallers.join(', +')}\n`;
  
  msg += `🚪 *Kleedkamer:* ${kleedkamer || 'NTB'}\n`;
  msg += `🥅 *Veld:* ${veld || 'NTB'}\n`;
  msg += `⚽ *Aftrap:* ${aftrap || 'NTB'} uur\n`;
  
  msg += `\n🦺 *Spelbegeleider:* ${spelbegeleider || 'NTB'}\n`;
  
  if (isThuis) msg += '\n🍦 *Kantine:* Gezellig nazitten, ook voor ouders!\n';
  if (info) msg += `\nℹ️ ${info}\n`;
  
  msg += `\n📲 _Meer info:_ https://tinyurl.com/Teamafspraken-app`;
  
  return msg;
}

// Kopieer WhatsApp bericht naar clipboard
export function copyWhatsApp(match) {
  const message = generateWhatsAppMessage(match);
  
  navigator.clipboard.writeText(message).then(() => {
    // Success handled by component
  }).catch(() => {
    // Fallback voor oudere browsers
    const ta = document.createElement('textarea');
    ta.value = message;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  
  return message;
}
