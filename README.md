# ALMA — Médecine intégrative, CDMX

Maquette interactive en espagnol, développée avec Astro et TypeScript. Identité **ALMA** provisoire, destinée à être remplacée par celle du médecin.

## Démarrage

Node.js 22.12+ recommandé.

```bash
npm ci
npm run dev
```

Ouvrir l'adresse locale affichée par Astro. Pour une version compilée :

```bash
npm run build
npm run preview
```

## Contenu

- Accueil responsive, identité visuelle vert forêt / crème.
- Deux photographies conceptuelles générées pour la maquette, optimisées en WebP.
- Fiches de consultation intégrative, ozonothérapie et oligothérapie.
- Agenda de démonstration : service, cinq prochains jours ouvrés, créneau, récapitulatif.
- FAQ interactive, deux lectures et panneau de contact.
- Aucune transmission de données de patients, aucun backend de réservation.
- Polices locales, sans requête à Google Fonts au chargement.
- Métadonnées en espagnol et `noindex` tant que le contenu n'est pas validé.

## Fichiers à modifier

- `src/pages/index.astro` : composition de la page.
- `src/data/site.ts` : identité provisoire, thérapies et FAQ.
- `src/styles/global.css` : thème et responsive.
- `src/scripts/main.ts` : agenda et interactions.
- `src/components/Brand.astro` : logotype de démonstration.
- `public/images/` : visuels conceptuels.
- `INSTRUCTIONS_CODEX.md` : reprise et mise en production.

## Déploiement autonome

La sortie `dist/` est un site statique déployable sur Vercel, Netlify ou un serveur web. Commande de compilation : `npm run build`. Répertoire de sortie : `dist`.

Le dossier `.openai` de la source hébergée contient l'identité de son preview. Il est exclu du ZIP autonome. Ne pas réutiliser cette identité pour un autre projet.

Les informations du médecin, tarifs, adresse, téléphone, qualifications et disponibilités n'ont pas été fournis. Ne pas les inventer. Voir les instructions Codex avant toute ouverture au public.
