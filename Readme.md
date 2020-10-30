# Proyecto M2

### Description

"Nombre web" will help you to get the most out of your company knowledge of the opportunities and strength of your workers being able to detect the abilities of each one and we will be able to obtain a history of the performance as a help for the reviews. Another benefit will be to have a portal of news and events of the company.

### User Stories

- Sign Up

- Log-In

- Log-out

- Home

- Departments

- News

- FAQ


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
        │   ├── seeds.js
        │   └── www
        ├── config
        │   └── configDB.js
        ├── middlewares
        │   └── user-mid.js
        ├── models
        │   ├── company.js
        │   ├── department.js
        │   └── manager.js
        │	└── employee.js
        ├── public
        │   ├── images
        │   ├── scripts
        │   └── stylesheets
        ├── routes
        │   ├── index.js
        │   ├── user.js
        │   └── private
        │       ├── dep.js
        │       ├── "blog".js
        │
        └── views
            ├── error.hbs
            ├── index.hbs
            ├── layout.hbs
            ├── user
            │   ├── login.hbs
            │   └── signup.hbs
            └── private
                ├── dep.hbs
                ├── blog.hbs
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

    

- GET /news
  - Render the news page









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
      employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
    }
  ```

- Manager

  ```
    {
      name: String,
      email: String,
      password: String,
      img: { type: String, default: '...' },
      departmentId: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
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





## Links

#### GitHub



#### Heroku



#### Trello

https://trello.com/b/awb5ehPF/projecto-m2

#### References

https://wireframepro.mockflow.com/view/proyecto-modulo-2#/page/de687f1d9b3243e59aadc0d59c9756e9