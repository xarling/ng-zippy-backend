ng-zippy-backend
================

The backend for the ng-workshop. 

# Installatie 

- Haal binnen met git.
- Run "npm install" om alle packages voor npm binnen te halen
- Run mongod om Mongo op te starten, of start mongo met het start-mongo.sh script. Dit start een mongodb op met als data directory ./data/db/ (don't worry, deze zit al in de .gitignore). 
- Run postcode-import.sh om de data in de mongodb in te laden. Dit stopt een aantal postcodes in de database. Misschien kunnen we deze lijst groter maken, maar dat later. 
- Run "node express.js" om de server te starten. Deze draait dan op localhost:3000.
- Ga naar de browser op http://localhost:3000. Je ziet de melding dat dit endpoint niet bestaat. 


# endpoints

Ga naar http://localhost:3000/postcode/.
Je ziet een lege array.

Ga naar http://localhost:3000/postcode?huisnummer=2&postcode=2011VE. Je ziet een postcode.


