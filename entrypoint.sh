#!/bin/sh

# Création du dossier signing s'il n'existe pas
mkdir -p /app/config/signing

# Générer les clés uniquement si elles n'existent pas
if [ ! -f "/app/config/signing/signing.key" ]; then
    echo "Génération des clés RSA..."
    ssh-keygen -t rsa -b 2048 -m PEM -f /app/config/signing/signing.key -N ""
    openssl rsa -in /app/config/signing/signing.key -pubout -outform PEM -out /app/config/signing/signing.pub
    echo "Clés générées avec succès !"
else
    echo "Les clés existent déjà, pas besoin de les générer."
fi

# Exécuter la commande par défaut (démarrer l'application)
exec "$@"