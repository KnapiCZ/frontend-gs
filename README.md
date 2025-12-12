# frontend-gs (Gymspace web)

Frontend pro **Gymspace** – webová/mobilní aplikace postavená na **Vue + Ionic** (Capacitor). Repo obsahuje i platformní projekty pro **Android** a **iOS**.

---

## Tech stack

- **Vue 3** + **TypeScript**
- **Ionic Framework** (+ **Capacitor** pro Android/iOS)
- **Pinia** (state management)
- **Vite** (build & dev server)
- **Cypress** (E2E testy)

---

## Požadavky

- **Node.js** (doporučeně LTS) + **npm**
- Pro mobilní buildy:
  - **Android Studio** + Android SDK (Android)
  - **Xcode** (iOS – pouze macOS)

---

## Rychlý start // pokud máte backend

```bash
npm install
ionic serve
```

> Alternativně pro spuštění na zařízení v síti:
```bash
ionic serve --external
```

---

## Konfigurace prostředí (.env)

Repo obsahuje `.env.production`. Pro lokální běh si typicky vytvoř vlastní `.env` (necommitovat) a nastav potřebné proměnné podle backendu a prostředí.

Tip:
- držte tajemství mimo git (tokeny/klíče jen lokálně nebo přes CI secrets)

---

## Skripty & běžné příkazy

### Web (build)
```bash
ionic build
```

### Capacitor (sync)
Kdykoliv přidáš plugin nebo změníš web build:
```bash
ionic cap sync
```

### Android
```bash
ionic cap open android
# nebo (pokud máš vše nastavené)
ionic cap run android
```

### iOS
```bash
ionic cap open ios
# nebo
ionic cap run ios
```

---

## Testy

### E2E (Cypress)
- Konfigurace je v `cypress.config.ts`.
- Spuštění (dle toho, co máš v `package.json`):
```bash
npx cypress open
# nebo
npx cypress run
```

---

## Struktura repozitáře

- `src/` – hlavní aplikace (Vue/Ionic)
- `resources/` – ikony, splash screeny a assety pro mobilní platformy
- `android/` – Android projekt (Capacitor)
- `ios/` – iOS projekt (Capacitor)
- `tests/` – testy (dle struktury projektu)

---

## Commit pravidla (rychlá verze)

Používej prefixy pro rychlou orientaci v historii:

- `feat:` nová funkcionalita  
- `fix:` oprava chyby  
- `chore:` údržba / závislosti  
- `refactor:` úprava struktury bez změny chování  
- `docs:` dokumentace  
- `test:` testy  
- `style:` formátování  
- `perf:` výkon  
- `ci:` CI/CD  
- `build:` build tooling  
- `revert:` revert  
- `hotfix:` rychlá oprava produkce  

Příklad:
```text
feat: Přidává registraci přes OAuth
```
