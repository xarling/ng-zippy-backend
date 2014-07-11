#mongoimport --jsonArray -h <server> -d <database> -c <collection> -u <user> -p <password> --file <file.json>

mongoimport --jsonArray -h localhost:27017 -d zippy -c postcodes --file postcode-import.json