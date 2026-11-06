# Instructions pour Codex — ALMA CDMX

## Objectif
Reprendre cette maquette Astro pour le médecin du client d'Olivier. Conserver la direction artistique : crème, vert forêt, typographie éditoriale, photos chaleureuses, espaces généreux, finesse des bordures et rendu mobile soigné.

## Lancement
1. Ouvrir le dossier du projet extrait du ZIP.
2. Utiliser Node.js 22.12+ ; exécuter `npm ci`, puis `npm run dev`.
3. Avant livraison : `npm run build` et vérifier le site dans le navigateur.

## Ce qui fonctionne
Navigation et menu mobile, fiches des trois approches, FAQ, mini-articles, dialogue contact, agenda avec cinq prochains jours de semaine à partir de la date de Mexico, sélection de créneaux et récapitulatif de démonstration. Les interactions se font uniquement en mémoire et ne transmettent aucun formulaire.

## Personnalisation
- Demander le nom officiel du cabinet et du médecin, le titre professionnel exact, la cédula, les qualifications, le téléphone WhatsApp, l'adresse, les horaires réels, les tarifs et la liste définitive des prestations.
- Mettre à jour `src/data/site.ts`, le logotype dans `src/components/Brand.astro` et les mentions correspondantes de `src/pages/index.astro`. Le nom ALMA n'a pas fait l'objet d'une vérification de disponibilité.
- Les images représentent un lieu et des personnes fictifs. Remplacer le portrait conceptuel et l'intérieur par les photographies validées du cabinet si nécessaire. Ne pas présenter le médecin illustratif comme le praticien réel.
- Les captures fournies par le client ont servi à identifier les thèmes. Les promesses de guérison, de prévention du cancer, de régénération ou de sécurité garantie n'ont pas été reprises. Faire valider le contenu final par le professionnel ; conserver une information claire sur les risques et les limites.
- Ne pas inventer d'avis, de statistiques, de certifications ou de durée d'expérience.

## Contact et prise de rendez-vous réels
Le bouton de contact ouvre actuellement une explication de démonstration ; il n'utilise aucun faux numéro.
- Une fois le numéro validé, connecter le CTA à WhatsApp au format international ou au système de réservation réellement utilisé.
- Pour un vrai agenda, remplacer intégralement les dates et disponibilités simulées par un service autoritaire côté serveur. Revalider le créneau côté serveur au moment de réserver, gérer les conflits et n'afficher « confirmé » qu'après succès effectif.
- Ajouter le vrai avis de confidentialité, les consentements appropriés et une protection des formulaires. Ne pas collecter d'antécédents médicaux dans un simple formulaire de contact.
- Ne pas supprimer l'indication « démonstration » avant d'avoir remplacé le fonctionnement simulé.

## SEO
Le site reste `noindex, nofollow` dans la maquette. Après validation de toutes les informations : définir `site` dans `astro.config.mjs`, ajouter le domaine canonique, les métadonnées Open Graph, le sitemap et les données structurées factuelles. Retirer `noindex` uniquement pour la mise en ligne finale autorisée.

## Vérifications nécessaires
- Mobile 390 px, tablette 768 px, desktop 1440 px ; aucun débordement horizontal.
- Navigation au clavier, focus des dialogues, fermeture par Échap, retour au bouton déclencheur.
- Fiches des trois approches et FAQ.
- Agenda : changer de date remet à zéro le créneau, un créneau indisponible ne peut pas être choisi, aucun récapitulatif avant choix complet.
- Toutes les images et polices servies localement, compilation sans erreur.

## Déploiement
Astro produit `dist/`. Sur Vercel : framework Astro, build `npm run build`, output `dist`. Pas de base de données ni de secrets nécessaires pour la maquette. Le ZIP autonome n'inclut pas l'identité du preview hébergé.
