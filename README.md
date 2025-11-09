# Assignment 3A - Relational Databases

1.  Käytin tunnilla opittuja asioita tämän tehtävän toteuttamiseen. Lisäsin sovellukseen kaksi kokonaan uutta taulua (Locations ja Bookings), joita ei ollut valmiissa esimerkeissä.

2. Testasin ja tarkistin, että taulut luotiin oikein ja näkyvät MariaDB-tietokannassa.

3. Minulla oli aluksi paljon ongelmia MariaDB:n kanssa, koska en muistanut salasanaa. Sen selvittämiseen kului aikaa.
Lisäksi minulla oli ongelma, jossa VS Code ei yhdistänyt SQL-tiedostoa MariaDB:hen, koska polkua ei tunnistettu oikein.


------------------------
* SHOW DATABASES;
* USE mediashare;
* SHOW TABLES;
![alt text](image-3.png)
* DESCRIBE Users;
![alt text](image-4.png)
* DESCRIBE MediaItems;
![alt text](image-5.png)
* DESCRIBE Locations;
![alt text](image-6.png)
* DESCRIBE Bookings;
![alt text](image-7.png)


-------------------------------------------
näyttää data:
* SELECT * FROM Users;
![alt text](image-8.png)
* SELECT * FROM MediaItems;
![alt text](image-9.png)
* SELECT * FROM Locations;
![alt text](image-10.png)
* SELECT * FROM Bookings;
![alt text](image-11.png)

-----------------------------------
Users — MediaItems:
=> 1 käyttäjä voi omistaa monta mediaa

Users — Bookings:
=> 1 käyttäjä voi tehdä monta varausta


Locations — Bookings:
=> 1 paikka voi olla varattu monta kertaa

![alt text](image-12.png)