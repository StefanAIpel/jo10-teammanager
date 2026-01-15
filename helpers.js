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

// WhatsApp bericht genereren en direct openen
export function generateWhatsAppMessage(match) {
  const { datum, tegenstander, type, verzamelTijd, aftrap, veld, kleedkamer, 
          verzamelPlek, spelbegeleider, chauffeurs, afwezig, invallers, info } = match;
  
  let msg = `⚽ *${datum} - ${tegenstander}*\n`;
  msg += `📍 ${type === 'thuis' ? 'Thuis' : 'Uit'}\n\n`;
  
  if (verzamelTijd) msg += `⏰ Verzamelen: ${verzamelTijd}\n`;
  if (aftrap) msg += `🏁 Aftrap: ${aftrap}\n`;
  if (veld) msg += `🥅 Veld: ${veld}\n`;
  if (kleedkamer) msg += `🚪 Kleedkamer: ${kleedkamer}\n`;
  
  if (type !== 'thuis' && verzamelPlek) {
    msg += `📍 Verzamelplek: ${verzamelPlek}\n`;
  }
  
  if (spelbegeleider) msg += `🧑‍⚖️ Spelbegeleider: ${spelbegeleider}\n`;
  
  if (chauffeurs && chauffeurs.length > 0) {
    msg += `🚗 Chauffeurs: ${chauffeurs.join(', ')}\n`;
  }
  
  if (afwezig && afwezig.length > 0) {
    msg += `❌ Afwezig: ${afwezig.join(', ')}\n`;
  }
  
  if (invallers && invallers.length > 0) {
    msg += `🔄 Invallers: +${invallers.join(', +')}\n`;
  }
  
  if (info) msg += `\nℹ️ ${info}\n`;
  
  msg += `\n_Teamapp communicatie is leidend!_`;
  msg += `\n\n📲 _Meer info:_ https://tinyurl.com/Teamafspraken-app`;
  
  return msg;
}

// Open WhatsApp direct met bericht
export function openWhatsApp(match) {
  const message = generateWhatsAppMessage(match);
  const encoded = encodeURIComponent(message);
  
  // Gebruik wa.me voor universele ondersteuning (werkt op mobiel en desktop)
  const url = `https://wa.me/?text=${encoded}`;
  
  // Open in nieuw venster/app
  window.open(url, '_blank');
}
