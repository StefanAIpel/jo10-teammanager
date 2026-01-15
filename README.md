# JO10 Teammanager App

VV Hooglanderveen JO10 Teammanager - React PWA voor wedstrijden, trainingen en teaminfo.

## 🚀 Features

- **PWA** - Installeerbaar als app op telefoon
- **Offline** - Werkt ook zonder internet
- **Real-time sync** - Firebase database
- **Multi-team** - JO10-1, JO10-2, JO10-3
- **Edit mode** - Wedstrijden bewerken (met wachtwoord)
- **WhatsApp** - Kopieer berichten voor teamgroep

## 📁 Project Structuur

```
jo10-teammanager/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js              # Service worker
│   └── icons/             # App icons (nog toevoegen)
├── src/
│   ├── index.js           # Entry point
│   ├── App.jsx            # Main component
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TeamSelector.jsx
│   │   ├── TabNavigation.jsx
│   │   ├── Overview.jsx
│   │   ├── MatchCard.jsx
│   │   ├── MatchList.jsx
│   │   ├── TrainingSchedule.jsx
│   │   ├── Agreements.jsx
│   │   ├── AllMatches.jsx
│   │   ├── EditModal.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── PasswordModal.jsx
│   │   ├── Toast.jsx
│   │   ├── InstallBanner.jsx
│   │   ├── DateBanner.jsx
│   │   └── AlertBanner.jsx
│   ├── hooks/
│   │   └── useFirebase.js # Firebase hook
│   ├── data/
│   │   └── teams.js       # Team data
│   ├── utils/
│   │   └── helpers.js     # Helper functies
│   └── styles/
│       └── index.css      # Alle styles
├── package.json
├── netlify.toml
└── README.md
```

## 🛠 Setup

### 1. Clone of download
```bash
git clone https://github.com/[username]/jo10-teammanager.git
cd jo10-teammanager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

De app draait nu op http://localhost:3000

## 🔥 Firebase Setup

De app gebruikt Firebase Realtime Database. Om data op te slaan:

### 1. Firebase Console
Ga naar https://console.firebase.google.com

### 2. Open project
Open **switch-volleybal** (of maak nieuw project)

### 3. Database regels
Ga naar **Realtime Database** → **Rules** en zet:

```json
{
  "rules": {
    "jo10": {
      ".read": true,
      ".write": true
    }
  }
}
```

Klik **Publish**.

### 4. (Optioneel) Eigen Firebase project
Als je een nieuw project wilt:
1. Maak project aan
2. Maak Realtime Database (Europe)
3. Kopieer config naar `src/hooks/useFirebase.js`

## 🌐 Deployment naar Netlify

### Via GitHub (aanbevolen)

1. **Push naar GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[username]/jo10-teammanager.git
git push -u origin main
```

2. **Netlify verbinden**
- Ga naar https://app.netlify.com
- Klik **Add new site** → **Import an existing project**
- Kies GitHub en selecteer je repo
- Build settings worden automatisch herkend (netlify.toml)
- Klik **Deploy**

3. **Custom domain (optioneel)**
- Site settings → Domain management
- Voeg custom domain toe

### Direct uploaden

1. Build de app:
```bash
npm run build
```

2. Ga naar https://app.netlify.com/drop

3. Sleep de `build` folder naar de pagina

## 📱 App Icons

Voeg app icons toe in `public/icons/`:
- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192)
- icon-384.png (384x384)
- icon-512.png (512x512)
- favicon.ico

Gebruik een tool zoals https://realfavicongenerator.net om deze te genereren.

## 🔐 Wachtwoord

Edit mode wachtwoord: `jo10trainer`

Wijzig in `src/App.jsx`:
```javascript
const EDIT_PASSWORD = "jo10trainer";
```

## 📝 Data aanpassen

Team data staat in `src/data/teams.js`. Hier kun je:
- Spelers toevoegen/verwijderen
- Wedstrijden aanpassen
- Afspraken wijzigen

## 🎨 Styling

Alle CSS staat in `src/styles/index.css`. 

Kleuren (CSS variables):
- `--primary`: #0a1628 (donkerblauw)
- `--secondary`: #1a2744
- `--accent`: #ffd700 (goud)
- `--green`: #32cd32
- `--red`: #ff6b6b
- `--purple`: #9b59b6
- `--orange`: #e67e22

## 📲 Publiceren in App Stores

### iOS (Apple App Store)
Gebruik **Capacitor** om de PWA om te zetten naar native iOS app:
```bash
npm install @capacitor/core @capacitor/ios
npx cap init
npm run build
npx cap add ios
npx cap open ios
```

### Android (Google Play Store)
```bash
npm install @capacitor/core @capacitor/android
npx cap add android
npx cap open android
```

Of gebruik **PWA Builder**: https://www.pwabuilder.com

## 📞 Support

Bij vragen: check de browser console (F12) voor errors.

---

© VV Hooglanderveen JO10 2025-2026
