# Node Auth

A simple project with Node.js and Express.js to demonstrate routes with **jwt token** protection.

## Running locally

Install required global dependencies

```bash
  yarn install:required
```

Run in dev mode (nodemon)

```bash
  yarn dev
```

Start server

```bash
  yarn start
```

## API Docs

### Unauthenticated route test

```http
  GET /
```

---

### Return token by email and password authentication

```http
  POST /token
```

| Body       | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. The user email    |
| `password` | `string` | **Required**. The user password |

---

### Return user data by token

Validate token from req.headers.authorization to get user ID and return data

```http
  GET /user
```

## Technologies

Node, Express, Passport | Passport JWT, TypeScript
