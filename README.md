# DashLink

A customizable, self hostable API for link shortening.

## Features

- Realtime view analytics for admins [[Planned](./TODO)]
- Inbuilt QR generator
- Secure Hashing Algorithm for Password Storage

## Prerequisites

This section goes over some of the technologies that might be helpful in hosting and maintaining this API.

- Basic interactions with RESTful APIs.
- Knowledge on how to host your own MySQL server.

## Steps to Host

The Steps to get this API up and running is underlined below

- Step 1: Edit the environment variables in .env (for Docker deployment) or setup your system environment with the given variables. `PORT`, `SESSION_SECRET` 
- Step 2: <br>
```bash
npm install
```
- Step 3: <br>
```bash
npm run serve
```
And by now your server should be running at your specified `PORT`.


You can try using cURL or a similar service to ping the root of the server to check it's availability.

```bash
curl -X GET <your-server-ip>:<your-port>/
```

and you should get this result.

```json
{
    "status": 200,
    "message": "Hey There Human, this is DashLink."
}
```

## Usage

For detailed API reference, refer to [USAGE.md](./USAGE.md)