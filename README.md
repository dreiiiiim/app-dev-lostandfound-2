# app-dev-lost-and-found-2

backend at front end connected na completely dito pero chchange pa ni jian frontend for test lang naman to

TO START
sa powershell terminal

cd ..

NEXT

cd backend

npm start

dapat gumana no error may port 3001

npm run dev
cd frontend

npm run dev

open localhost link

GITHUB UPDATING

CREATE
POST http://localhost:3001/auth/register

{
"name": "Andrei Montaniel",
"student_id": "2023000000", - change lang to
"email": "andrei@example.com", - change din
"password": "123",
"faculty": "CICS",
"gender": "Other"
}

POST http://localhost:3001/auth/login

{
"student_id": "2023123456",
"password": "123"
}

copy token here

READ

GET http://localhost:3001/users/68

paste token manually sa authorization tas token insert
UPDATE

PUT http://localhost:3001/users/68

{
"name": "Jhe update",
"email": "jheupdated@example.com",
"faculty": "Faculty of Arts and Letters"
}

paste token manually sa authorization tas token insert

send

DELETE
http://localhost:3001/users/69
paste token manually sa authorization tas token insert

send
