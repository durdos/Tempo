# Tempo

Ton coach sportif : séances, charge d'entraînement, muscles travaillés, planning synchronisé avec ton agenda.

**Ouvrir l'app :** https://durdos.github.io/tempo/

## Comment ça marche

- **L'app** (ce dépôt) est publiée gratuitement par GitHub Pages. Elle s'installe sur l'écran d'accueil du téléphone, s'ouvre tout de suite et reste lisible hors connexion.
- **Tes données** restent dans ton Google Sheet. L'app y accède via ton script Google Apps Script, qui ne répond qu'avec ta clé de connexion.
- **Ce dépôt ne contient aucune donnée** : uniquement le code de l'app.

## Connecter un appareil

1. Dans Apps Script, lance la fonction `connecterTempo`.
2. Copie le code de connexion affiché dans le journal d'exécution.
3. Ouvre l'app et colle-le. Une seule fois par appareil.

Pour révoquer tous les appareils : lance `nouvelleCle`, puis reconnecte ceux que tu utilises.
