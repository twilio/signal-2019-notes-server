# Notes Server

This is a demo API server built for the Masterclass in Flex Frontend Development workshop, presented at SIGNAL 2019.

This app is paired with a plugin: https://github.com/twilio/signal-2019-flex-notes

## Project Structure

This project is based on a standard Express app, generated using

```
npx express-generator signal-2019-flex-notes
```

Each commit represents a milestone during the presentation, and they demonstrate an iterative build of a working Notes component that interacts with a backend database.

## Setup

Make sure you have [Node.js](https://nodejs.org/) as well as [`npm`](https://npmjs.com/) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

You should also copy the `.env.example` file, and rename it `.env`. Then update the AccountSid and AuthToken environment variables based on a [Twilio project](https://twilio.com/console) you will be using.

The server can be started by running:

```
npm start
```

Or for the purposes of the workshop demo:

```
PORT=3001 npm start
```

## API

Two endpoints are exposed:

```
GET /notes
POST /notes
```

The `GET` returns a JSON object with structure `{notes: "your notes"}`. The `POST` expects JSON with the same structure. 

