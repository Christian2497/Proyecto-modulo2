# DayaDay

### Description

DayaDay will help you to get the most out of your company knowledge of the opportunities and strength of your workers being able to detect the abilities of each one and we will be able to obtain a history of the performance as a help for the reviews. Another benefit will be to have a portal of news and events of the company.

### User Stories

- Sign Up

- Log-In

- Log-out

- Home

- Audit

- News



### MVP

- CRUD

- Sign-up / Log-in / Log-out

- Private Pages

- Models relationed

- Responsive


### Backlog

- Graphic

- Feedback companies


### Tech challenge

- Work on GitHub as a team

- CRUD


### Structure

```
Proyecto-modulo-2/
        ├── .gitignore
        ├── .env
        ├── app.js
        ├── readme.md
        ├── bin
        │   └── www
        ├── config
        │	├── cloudinary.js
        │   └── configDB.js
        ├── helpers
        │   └── middleware.js
        ├── models
        │   ├── Company.js
        │   ├── Department.js
        │   ├── New.js
        │	├── Event.js
        │	└── Employee.js
        ├── public
        │   ├── images
        │   ├── scripts
        │   └── stylesheets
        ├── routes
        │   ├── index.js
        │   ├── users.js
        │	├── news.js
        │   └── audit.js             
        │
        └── views
            ├── error.hbs
            ├── index.hbs
            ├── layout.hbs
            ├── audit.hbs
            ├── users
            │   ├── login.hbs
            │   └── signup.hbs
            ├── valorate-user.hbs
            ├── dept-edit.hbs
            ├── department-details.hbs
            ├── employee-edit.hbs
            ├── event-edit.hbs
            ├── new-edit.hbs
            └── news.hbs
                
```



#### Routes

- GET /
- Renders the homepage
- GET /signup
  - Renders sign up form
  - Redirect / when user logged in
- POST /signup
  - Redirect / when user logged in
  - body:
    - name
    - email
    - password
    - select
- GET /login
  - Redirect / when user logged in
  - Render log in form
- POST /login
  - Redirect / when user logged in
  - body:
    - email
    - password
- GET /logout
- body:(empty)
- GET /audit

  - Render the audit page
  - Show all departments
- POST /audit
  - Create new departments
  - Redirect /audit when create departments
  - body:
    - name
    - description
- GET /audit/edit
  - Render department edit form
  - Redirect /audit when edit department
- POST /audit/edit
  - Update the department
  - Redirect /audit when edit department
  - body:
    - name
    - description
- POST /audit/:id(department id)/delete
  - Delete department
  - Redirect /audit when department is deleted
- GET /audit/:id(department id)
  - Render employees for this department
- POST /audit/:id(department id)
  - Create employees for this department
  - Redirect /audit/:id when employee is created
  - body:
    - name
    - lastName
    - email
    - phone
    - position
    - starterDate
- GET /audit/auditory/:id(employee id)
  - Render employee details
- POST /audit/auditory/:id(employee id)
  - Render audit form
  - Redirect /audit/auditory/:id when submit audit
- GET /audit/auditory/:id(employee id)/edit
  - Render employee edit form
- POST /audit/auditory/:id(employee id)/edit
  - Render employee edit form
  - Update employee
  - Redirect /audit/auditory/:id when employee is edited
  - body:
    - email
    - phone
    - position
    - imgPath
- POST /audit/auditory/:id(employee id)/delete
  - Delete employee
  - Redirect /audit/:id when employee is deleted
- GET /news
  
  - Render the news page
  - Render events form
  - Render news form
- POST /news
  - Render events form
  - body:
    - title
    - description
    - imgPath
  - Render news form
  - body:
    - title
    - place
    - date
    - time
    - description
    - imgPath
  - Redirect /news when event or new is created
- GET /news/edit
  - Render edit news form
  - Redirect /news when new is edited
- POST /news/edit
  - Render edit news form
  - Update new
  - Redirect /news when new is editted
  - body:
    - title
    - description
    - img
- GET /news/events/edit
  - Render edit event form
  - Redirect /news when event is editted
- POST /news/events/edit
  - Render edit event form
  - Update event
  - Redirect /news when event is editted
  - body:
    - title
    - description
    - place
    - date
    - time
    - imgPath
- POST /news/:id(news id)/delete
  - Delete New
  - Redirect /news when new is deletted
- POST /news/events/:id(event id)/delete
  - Delete event
  - Redirect /news when event is deletted

#### Models

- Company

  ```
    {
      name: String,
      email: String,
      password: String,
      img: { type: String, default: '...' },
      department: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
    }
  ```

- Department

  ```
    {
      name: String,
      managers: [{ type: Schema.Types.ObjectId, ref: 'Manager' }],
      employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }
    }
  ```

- Employee

  ```
    {
      name: String,
      email: String,
      password: String,
      img: { type: String, default: '...' },
      departmentId: { type: Schema.Types.ObjectId, ref: 'Department' }
    }
  ```

- Event

  ```
   {
      titleEvent: String,
      descriptionEvent: String,
      imgPathEvent: String,
      date: Date,
      time: String,
      place: String,
    },
  ```

- New

```
  {
    title: String,
    description: String,
    imgPath: String,
  },
```

## Links

#### GitHub



#### Heroku

https://projecto-m2.herokuapp.com/

#### Trello

https://trello.com/b/awb5ehPF/projecto-m2

#### References

https://wireframepro.mockflow.com/view/proyecto-modulo-2#/page/de687f1d9b3243e59aadc0d59c9756e9