# Repozitář pro gymspace webovou aplikaci využívající Vue.js a Django.

## Zapnutí serveru pro Vue:
Jdi do /gymspace-frontend/ v terminálu a napiš:
```
ionic serve  (pro local)
ionic serve --external (pro hostovani)
```

Server se zapne na specifické url, koukni se do terminálu.
Změň si baseUrl v src/components/API/apiCaller.js na IP tvého django serveru.

## Zapnutí serveru pro Django
Jdi do /gymspace/ v terminálu a napiš:
```
python manage.py runserver

Nefunguje?
python manage.py makemigrations
python manage.py migrate
python manage.py runserver {ip:port}

Vytvoreni admina?
python manage.py createsuperuser
```


# Commit Guidelines

Tento soubor slouží jako přehled doporučených postupů pro psaní commit zpráv v rámci projektu na GitHubu. Dodržování těchto pravidel zajistí konzistentní a čitelnou historii verzí, což usnadní práci nejen vám, ale i ostatním členům týmu.

## Struktura commit zprávy

Commit zpráva by měla mít dvě hlavní části:
- **Titulek (header):** Krátké shrnutí změny (max. 50 znaků).
- **Popis (body):** Delší vysvětlení změny (volitelné, ale doporučené).

### Titulek commit zprávy
1. **Buďte struční a konkrétní:** Titulek by měl jasně vyjádřit, co bylo změněno a proč.
2. **Používejte přítomný čas:** Pište například "Přidává", "Opravuje", "Maže". Vyhýbejte se minulému času.
3. **Začněte velkým písmenem:** Dodržujte formát s počátečním velkým písmenem.
4. **Nepoužívejte tečky na konci:** Titulek commit zprávy by neměl mít na konci tečku.

### Popis commit zprávy
Popis je volitelný, ale měl by být použit, pokud je změna složitější nebo potřebuje další vysvětlení. Popis začíná jedním prázdným řádkem pod titulkem a může obsahovat:
- **Co bylo změněno?**
- **Proč byla změna provedena?**
- **Jaké problémy to řeší?**

## Tagy commit zpráv

Pro označení povahy změny můžete použít tzv. tagy. Tyto tagy usnadňují rychlou orientaci v historii commitů.

### Běžně používané tagy:

- **feat:** Přidání nové funkcionality.  
  `feat: Přidává funkci resetování hesla`

- **fix:** Oprava chyby.  
  `fix: Opravuje chybu v ověřování e-mailů`

- **chore:** Údržba, která neovlivňuje funkcionalitu aplikace (např. aktualizace závislostí).  
  `chore: Aktualizace závislostí na nejnovější verzi`

- **refactor:** Změny ve struktuře kódu bez změny funkce (např. zlepšení čitelnosti, optimalizace).  
  `refactor: Optimalizuje metodu pro výpočet slev`

- **docs:** Změny v dokumentaci.  
  `docs: Aktualizace README s novým návodem`

- **test:** Přidání nebo změna testů.  
  `test: Přidává testy pro validaci vstupů`

- **style:** Změny týkající se formátování, stylu nebo whitespace.  
  `style: Oprava odsazení a formátování kódu`

- **perf:** Změny zlepšující výkon.  
  `perf: Zlepšení výkonu při načítání velkých souborů`

- **ci:** Změny týkající se CI/CD pipeline.  
  `ci: Přidání automatických testů do CI pipeline`

- **build:** Změny související s build systémem nebo externími závislostmi.  
  `build: Přidání konfigurace pro webpack`

- **revert:** Vrácení předchozího commitu.  
  `revert: Vrací commit "Přidání funkce pro vyhledávání"`

### Další specializované tagy:

- **hotfix:** Rychlá oprava kritických chyb v produkci.  
  `hotfix: Opravuje chybu, která způsobuje pád aplikace při spuštění`

- **deploy:** Nasazení nové verze aplikace do produkce.  
  `deploy: Nasazuje verzi 1.0.1 na produkci`

- **security:** Změny týkající se zabezpečení aplikace.  
  `security: Opravuje zranitelnost v autentifikačním systému`

- **i18n:** Změny týkající se lokalizace nebo internacionalizace.  
  `i18n: Přidává podporu pro německou lokalizaci`

- **ux:** Změny, které zlepšují uživatelskou zkušenost.  
  `ux: Zlepšuje zobrazování notifikací při načítání dat`

- **db:** Změny týkající se databáze, např. migrace nebo úpravy schémat.  
  `db: Přidání nového indexu pro tabulku uživatelů`

- **config:** Změny konfigurací aplikace nebo vývojového prostředí.  
  `config: Aktualizace konfigurace ESLint`

### Kombinace tagů:

Pokud commit odpovídá více kategoriím, můžete použít více tagů najednou.  
Například:  
`feat(build): Přidává nové skripty pro sestavení projektu`  
`fix(ci): Oprava chyby v CI pipeline pro testování`

## Doporučení

- **Rozdělujte změny do menších commitů:** Každý commit by měl řešit jednu konkrétní úlohu nebo problém. To usnadňuje pochopení změn a vrácení zpět, pokud je to nutné.
- **Konzistence:** Dodržujte konzistentní styl psaní commit zpráv v rámci celého projektu.

---

Dodržováním těchto pravidel budete schopni udržet historii verzí projektu čistou, přehlednou a snadno pochopitelnou pro celý tým.


