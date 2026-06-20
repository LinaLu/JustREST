# JustREST

A deliberately simple healthcare scheduling demo built with:

* Express
* React
* REST APIs

No GraphQL. No database. No ORM.

Just REST.

A live version of the application is deployed at:

https://justrest-1.onrender.com/
---

## Overview

This project demonstrates a simple appointment rescheduling flow between a frontend application and an EHR provider.

The backend exposes REST endpoints for:

* Fetching appointments
* Fetching available timeslots
* Looking up a timeslot
* Rescheduling an appointment

Data is stored in memory and resets whenever the server restarts.

---

## Project Structure

```text
JustREST/
├── client/          
├── server/          
├── README.md
```

---

## Requirements

Verify your node version:

```bash
node -v
```
v20.3.0


---

## Running the Backend

Open a terminal:

```bash
cd server
npm install
npm run dev
```

The backend runs on:

```
http://localhost:3001
```

---

## Running the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on:

http://localhost:5173/


## API Examples

### Get Appointments

```
GET /appointments
```

Response:

```json
[
    {
        "title": "General Checkup",
        "doctor": "Dr. Erik Lindqvist",
        "dateTime": "2026-07-10T09:00:00.000Z",
        "status": "scheduled",
        "externalReference": "ZWhyOmFwcHQtMDAx"
    }
]
```

### Get Available Timeslots

```
GET /timeslots
```
```json
[
    {
        "dateTime": "2026-07-11T08:00:00.000Z",
        "doctor": "Dr. Erik Lindqvist",
        "externalReference": "ZWhyOnNsb3QtMDAx"
    },
    {
        "dateTime": "2026-07-12T10:30:00.000Z",
        "doctor": "Dr. Anna Bergström",
        "externalReference": "ZWhyOnNsb3QtMDAy"
    },
    {
        "dateTime": "2026-07-14T13:00:00.000Z",
        "doctor": "Dr. Maria Söderberg",
        "externalReference": "ZWhyOnNsb3QtMDAz"
    },
    {
        "dateTime": "2026-07-16T09:30:00.000Z",
        "doctor": "Dr. Erik Lindqvist",
        "externalReference": "ZWhyOnNsb3QtMDA0"
    },
    {
        "dateTime": "2026-07-18T15:00:00.000Z",
        "doctor": "Dr. Anna Bergström",
        "externalReference": "ZWhyOnNsb3QtMDA1"
    }
]
```

### Reschedule Appointment

```
POST /appointments/:id/reschedule
```

Request:

```json
{"success":true,"newDateTime":"2026-07-11T08:00:00.000Z"}
```

---
## Non-Goals

This project intentionally does not include:

* GraphQL
* Databases
* Authentication
* ORMs
* Message brokers
* Event sourcing

It's just REST.
