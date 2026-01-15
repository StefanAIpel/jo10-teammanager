# 📱 Handleiding: JO10 Teammanager Online Plaatsen & Publiceren

## Inhoudsopgave
1. [Online plaatsen (Netlify)](#1-online-plaatsen-netlify)
2. [PWA installeren op telefoon](#2-pwa-installeren-op-telefoon)
3. [Publiceren in Google Play Store](#3-publiceren-in-google-play-store)
4. [Publiceren in Apple App Store](#4-publiceren-in-apple-app-store)
5. [Alternatief: PWA Builder](#5-alternatief-pwa-builder-makkelijkst)
6. [Firebase instellen](#6-firebase-instellen)
7. [Updates doorvoeren](#7-updates-doorvoeren)

---

## 1. Online plaatsen (Netlify)

### Optie A: Via GitHub (aanbevolen)

#### Stap 1: GitHub account aanmaken
1. Ga naar https://github.com
2. Klik **Sign up** en maak account aan
3. Bevestig je e-mail

#### Stap 2: Repository aanmaken
1. Klik rechtsboven op **+** → **New repository**
2. Naam: `jo10-teammanager`
3. Zet op **Public**
4. Klik **Create repository**

#### Stap 3: Code uploaden
**Via browser (makkelijk):**
1. Open je nieuwe repository
2. Klik **uploading an existing file**
3. Sleep alle bestanden uit de uitgepakte zip naar het venster
4. Klik **Commit changes**

**Via terminal (voor gevorderden):**
```bash
cd jo10-teammanager
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/jo10-teammanager.git
git push -u origin main
```

#### Stap 4: Netlify koppelen
1. Ga naar https://app.netlify.com
2. Klik **Sign up** → **Sign up with GitHub**
3. Autoriseer Netlify
4. Klik **Add new site** → **Import an existing project**
5. Kies **GitHub**
6. Selecteer `jo10-teammanager`
7. Build settings worden automatisch herkend:
   - Build command: `npm run build`
   - Publish directory: `build`
8. Klik **Deploy site**

#### Stap 5: Wachten op deployment
- Netlify bouwt je app (duurt 1-2 minuten)
- Je krijgt een URL zoals: `https://random-name-123.netlify.app`

#### Stap 6: Custom domein (optioneel)
1. Ga naar **Site settings** → **Domain management**
2. Klik **Add custom domain**
3. Voer je domein in (bijv. `jo10.vvhooglanderveen.nl`)
4. Volg de DNS instructies

---

### Optie B: Direct uploaden (sneller, geen GitHub)

1. **Build lokaal:**
```bash
cd jo10-teammanager
npm install
npm run build
```

2. **Upload naar Netlify:**
   - Ga naar https://app.netlify.com/drop
   - Sleep de `build` folder naar de pagina
   - Klaar! Je krijgt direct een URL

---

## 2. PWA installeren op telefoon

### Android (Chrome)
1. Open de app URL in Chrome
2. Tik op de **drie puntjes** rechtsboven
3. Kies **Toevoegen aan startscherm** of **App installeren**
4. Bevestig met **Installeren**
5. De app staat nu op je startscherm!

### iPhone/iPad (Safari)
1. Open de app URL in Safari
2. Tik op het **Deel icoon** (vierkant met pijl omhoog)
3. Scroll naar beneden
4. Kies **Zet op beginscherm**
5. Geef de app een naam en tik **Voeg toe**

### Desktop (Chrome/Edge)
1. Open de app URL
2. Klik op het **installatie icoon** in de adresbalk (plusje in cirkel)
3. Of: Menu → **App installeren**

---

## 3. Publiceren in Google Play Store

### Vereisten
- Google Play Developer account (€25 eenmalig)
- App icons in verschillende formaten
- Privacy policy pagina

### Stap 1: Developer account aanmaken
1. Ga naar https://play.google.com/console
2. Klik **Een account maken**
3. Betaal €25 registratiekosten
4. Vul bedrijfs/persoonlijke gegevens in

### Stap 2: Project voorbereiden met Capacitor
```bash
cd jo10-teammanager

# Installeer Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialiseer Capacitor
npx cap init "JO10 Teammanager" "nl.vvhooglanderveen.jo10"

# Build de React app
npm run build

# Voeg Android platform toe
npx cap add android

# Synchroniseer
npx cap sync android
```

### Stap 3: Android Studio instellen
1. Download Android Studio: https://developer.android.com/studio
2. Installeer en open Android Studio
3. Open het project:
```bash
npx cap open android
```

### Stap 4: App icons toevoegen
1. In Android Studio: **File** → **New** → **Image Asset**
2. Selecteer je 512x512 icon
3. Genereer alle formaten

### Stap 5: Signing key aanmaken
1. **Build** → **Generate Signed Bundle / APK**
2. Kies **Android App Bundle**
3. **Create new...** voor nieuwe keystore
4. Vul in:
   - Key store path: `jo10-release-key.jks`
   - Password: (kies sterk wachtwoord, **bewaar goed!**)
   - Alias: `jo10-key`
   - Validity: 25 years
   - Vul naam/organisatie in
5. Klik **OK** en dan **Next**
6. Kies **release** en klik **Finish**

### Stap 6: App Bundle maken
1. **Build** → **Generate Signed Bundle / APK**
2. Kies **Android App Bundle**
3. Selecteer je keystore
4. Kies **release**
5. Klik **Finish**
6. Bundle staat in: `android/app/release/app-release.aab`

### Stap 7: Uploaden naar Play Console
1. Ga naar https://play.google.com/console
2. **Alle apps** → **App maken**
3. Vul in:
   - App-naam: JO10 Teammanager
   - Standaardtaal: Nederlands
   - App of game: App
   - Gratis of betaald: Gratis
4. Accepteer voorwaarden

### Stap 8: Store-vermelding invullen
**Hoofd store-vermelding:**
- Korte beschrijving (80 tekens):
  ```
  VV Hooglanderveen JO10 wedstrijden, trainingen en teaminfo
  ```
- Volledige beschrijving:
  ```
  De officiële app voor JO10 teams van VV Hooglanderveen.
  
  ⚽ Functies:
  • Wedstrijdschema voor JO10-1, JO10-2 en JO10-3
  • Verzameltijden, locaties en veldinfo
  • Trainingsschema's
  • Teamafspraken
  • WhatsApp berichten delen
  • Offline beschikbaar
  
  Seizoen 2025-2026, Fase 3
  ```

**Afbeeldingen uploaden:**
- App icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots: minimaal 2 (telefoon)

### Stap 9: App-inhoud invullen
- **Privacybeleid**: Link naar privacy policy
- **App-toegang**: Alle functies beschikbaar zonder login
- **Advertenties**: Nee
- **Inhoudsbeoordeling**: Vul vragenlijst in (PEGI rating)
- **Doelgroep**: Niet specifiek voor kinderen

### Stap 10: Release aanmaken
1. Ga naar **Productie** → **Releases**
2. Klik **Nieuwe release maken**
3. Upload je `.aab` bestand
4. Voeg release-opmerkingen toe
5. Klik **Opslaan** → **Release beoordelen**
6. Klik **Uitrollen naar productie**

### Stap 11: Wachten op review
- Google reviewt je app (1-7 dagen)
- Je krijgt e-mail als de app live is

---

## 4. Publiceren in Apple App Store

### Vereisten
- Apple Developer account (€99/jaar)
- Mac computer met Xcode
- App icons in verschillende formaten
- Privacy policy pagina

### Stap 1: Apple Developer account
1. Ga naar https://developer.apple.com/programs/
2. Klik **Enroll**
3. Log in met Apple ID (of maak aan)
4. Betaal €99/jaar

### Stap 2: Project voorbereiden met Capacitor
```bash
cd jo10-teammanager

# Installeer iOS platform
npm install @capacitor/ios

# Build de React app
npm run build

# Voeg iOS platform toe
npx cap add ios

# Synchroniseer
npx cap sync ios
```

### Stap 3: Xcode project openen
```bash
npx cap open ios
```

### Stap 4: App configureren in Xcode
1. Selecteer het project in de navigator
2. Selecteer het target "App"
3. **General** tab:
   - Display Name: JO10 Teammanager
   - Bundle Identifier: `nl.vvhooglanderveen.jo10`
   - Version: 1.0.0
   - Build: 1
4. **Signing & Capabilities**:
   - Team: Selecteer je Apple Developer account
   - Zet **Automatically manage signing** aan

### Stap 5: App icons toevoegen
1. Open **Assets.xcassets** → **AppIcon**
2. Sleep icons naar de juiste slots:
   - 20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt, 1024pt
3. Of gebruik https://appicon.co om alle formaten te genereren

### Stap 6: Archive maken
1. Selecteer **Any iOS Device** als build target
2. **Product** → **Archive**
3. Wacht tot archive klaar is

### Stap 7: Uploaden naar App Store Connect
1. In Organizer (opent automatisch na archive)
2. Selecteer je archive
3. Klik **Distribute App**
4. Kies **App Store Connect**
5. Kies **Upload**
6. Volg de stappen en klik **Upload**

### Stap 8: App Store Connect configureren
1. Ga naar https://appstoreconnect.apple.com
2. **Mijn apps** → **+** → **Nieuwe app**
3. Vul in:
   - Platforms: iOS
   - Naam: JO10 Teammanager
   - Primaire taal: Nederlands
   - Bundel-ID: selecteer je bundle ID
   - SKU: `jo10-teammanager`

### Stap 9: App-informatie invullen
**Versie-informatie:**
- Screenshots (verplicht):
  - 6.5" (iPhone 14 Pro Max): 1284 x 2778
  - 5.5" (iPhone 8 Plus): 1242 x 2208
- Promotietekst (170 tekens)
- Beschrijving
- Trefwoorden
- Support URL
- Marketing URL (optioneel)

**App Review Information:**
- Contactgegevens
- Demo account (indien nodig)
- Notities voor reviewer

### Stap 10: Build selecteren
1. Scroll naar **Build** sectie
2. Klik **+** en selecteer je geüploade build
3. Klik **Gereed**

### Stap 11: Indienen voor review
1. Controleer alle velden
2. Klik **Voeg toe voor review**
3. Klik **Verstuur naar App Review**

### Stap 12: Wachten op review
- Apple reviewt je app (1-3 dagen)
- Je krijgt e-mail met status updates

---

## 5. Alternatief: PWA Builder (makkelijkst!)

PWA Builder kan je PWA automatisch omzetten naar store-ready apps.

### Stap 1: PWA online zetten
Zorg dat je app online staat (zie sectie 1)

### Stap 2: PWA Builder gebruiken
1. Ga naar https://www.pwabuilder.com
2. Voer je app URL in
3. Klik **Start**
4. PWA Builder analyseert je app

### Stap 3: Packages downloaden
1. Klik **Package for stores**
2. **Android**:
   - Klik **Generate**
   - Download de APK/AAB
   - Upload naar Play Console
3. **iOS**:
   - Klik **Generate**
   - Download het Xcode project
   - Open in Xcode en volg stappen 4-12 hierboven

### Voordelen PWA Builder
- Geen Capacitor setup nodig
- Automatische icon generatie
- Sneller dan handmatig

---

## 6. Firebase instellen

### Database regels instellen
1. Ga naar https://console.firebase.google.com
2. Open project **switch-volleybal**
3. **Realtime Database** → **Rules**
4. Vervang met:
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
5. Klik **Publish**

### (Optioneel) Nieuw Firebase project
1. **Add project** → Naam: `jo10-teammanager`
2. Schakel Google Analytics uit (niet nodig)
3. **Create project**
4. **Realtime Database** → **Create Database**
5. Kies **Europe (eur3)**
6. Start in **test mode**
7. Kopieer config naar `src/hooks/useFirebase.js`

---

## 7. Updates doorvoeren

### Bij code wijzigingen

**Met GitHub (automatisch):**
```bash
git add .
git commit -m "Update: beschrijving van wijziging"
git push
```
Netlify detecteert de push en rebuildt automatisch!

**Zonder GitHub:**
1. `npm run build`
2. Upload nieuwe `build` folder naar Netlify

### App Store updates

**Android:**
1. Verhoog versienummer in `android/app/build.gradle`
2. Maak nieuwe signed bundle
3. Upload naar Play Console als nieuwe release

**iOS:**
1. Verhoog Version en Build in Xcode
2. Maak nieuwe archive
3. Upload naar App Store Connect
4. Dien in voor review

---

## 📋 Checklist voor publicatie

### Algemeen
- [ ] App online op Netlify
- [ ] Firebase database werkt
- [ ] Alle team data correct
- [ ] WhatsApp functie werkt

### Google Play Store
- [ ] Developer account (€25)
- [ ] Privacy policy URL
- [ ] App icon 512x512
- [ ] Feature graphic 1024x500
- [ ] Minimaal 2 screenshots
- [ ] Beschrijvingen ingevuld
- [ ] Signed App Bundle (.aab)

### Apple App Store
- [ ] Developer account (€99/jaar)
- [ ] Mac met Xcode
- [ ] Privacy policy URL
- [ ] App icons alle formaten
- [ ] Screenshots alle formaten
- [ ] Beschrijvingen ingevuld
- [ ] Build geüpload

---

## ❓ Veelgestelde vragen

**Q: Moet ik betalen voor de app stores?**
A: Ja, Google Play kost €25 eenmalig, Apple €99/jaar.

**Q: Kan ik de app gratis aanbieden?**
A: Ja, je kiest zelf of de app gratis of betaald is.

**Q: Hoe lang duurt de review?**
A: Google: 1-7 dagen, Apple: 1-3 dagen.

**Q: Wat als mijn app wordt afgewezen?**
A: Je krijgt feedback waarom. Los het op en dien opnieuw in.

**Q: Kan ik de app ook zonder stores delen?**
A: Ja! De PWA is direct te installeren via de URL.

---

## 🆘 Hulp nodig?

- **Netlify docs**: https://docs.netlify.com
- **Capacitor docs**: https://capacitorjs.com/docs
- **Play Console help**: https://support.google.com/googleplay/android-developer
- **App Store help**: https://developer.apple.com/help/app-store-connect

---

*Laatste update: Januari 2025*
