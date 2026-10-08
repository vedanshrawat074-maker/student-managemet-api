# Student Management REST API
**Lab Assignment 2 | Web Dev III (Node.js & Express) | Unit 2**
**Author:** VR Adikrishna

A RESTful API built with Node.js and Express.js to add, view, update and delete student records.
Uses an in-memory array only (no database, no Mongoose).

## Project structure
```
student-management-api/
├── app.js                    # server, middleware, error handling
├── routes/studentRoutes.js   # modular Express Router (CRUD)
├── middleware/logger.js      # custom logger (method, URL, time)
├── data/students.js          # in-memory student array
├── postman/Student_API.postman_collection.json
├── test/api.test.js          # self-check of all endpoints
└── package.json
```

## Run
```bash
npm install
npm start        # http://localhost:3000
npm test         # runs 16 checks
```

## Endpoints
| Method | URL | Body | Success | Errors |
|---|---|---|---|---|
| GET | /students | - | 200 | - |
| GET | /students/:id | - | 200 | 400 invalid id, 404 not found |
| POST | /students | `{ "name": "...", "course": "..." }` | 201 | 400 invalid input |
| PUT | /students/:id | `{ "name": "...", "course": "..." }` | 200 | 400, 404 |
| DELETE | /students/:id | - | 200 | 400, 404 |

Other: unknown route -> 404, malformed JSON -> 400, unexpected error -> 500.

## Sample data
| ID | Name | Course |
|---|---|---|
| 1 | Rahul | BCA |
| 2 | Priya | BTech |
| 3 | Amit | BCA |

## Testing in Postman
1. Start the server (`npm start`).
2. Postman -> Import -> select `postman/Student_API.postman_collection.json`.
3. Run requests 1 to 9 in order (or use the Collection Runner). Each has a status-code test.

## Requirement checklist
- [x] Express server
- [x] Student CRUD APIs (GET all, GET one, POST, PUT, DELETE)
- [x] Custom logger middleware
- [x] Modular routing
- [x] Error handling with 200 / 201 / 400 / 404 (and 500)
- [x] Postman collection included
- [x] No database, no Mongoose; array/JSON data only
