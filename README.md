# Express

- Express käytössä http-moduulin sijaan
- Pug-template
- REST API mock-datan avulla (users + media)
- GET, POST ja DELETE endpointit API:lle 
- JSON-muotoinen vastaus endpointien kautta


* Users API & Media API (REST API endpointit)
- GET /api/media              /api/users
- GET /api/media/:d          /api/users/:d
- POST  api/media            /api/users
- DELETE  /api/media/:id     /api/users/:d


Test:

* GET http://localhost:3000/api/media/9590
![alt text](image.png)

* GET http://localhost:3000/api/items/27
![alt text](image-1.png)


* GET http://localhost:3000/api/users
![alt text](image-2.png)