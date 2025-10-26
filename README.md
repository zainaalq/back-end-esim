# Opettajan tuntiesimerkit + kotitehtävä
(main-harjoitus, init-versio)

1) GET / (server root) => palauttaa tekstin: "Welcome to my REST API!"

2) GET /items => palauttaa kaikki itemit

3) GET /items/:id => palauttaa yksittäisen itemin ID:n perusteella

4) POST /items => lisää uuden itemin

5) PUT /items/:id => päivittää olemassa olevan itemin

6) DELETE /items/:id => poistaa itemin

* Lisäsin myös kaksi lisätoiminnallisuutta:

- GET /items/random
  => palauttaa satunnaisen itemin

- GET /items/count
  => laskee ja palauttaa, kuinka monta itemiä listassa on
