## Prerequisite

1. ngrok or localtunnel (installed locally) which will proxy connec to

## Set up

```
npm init -y
```

## To start the app

```
node index.js
```

## To run using the docker

```
docker build -t simple-webhook:latest .
docker run -it -p 3000:3000 --name simple-webhook simple-webhook

```

## To set up ngrok

ngrok http 3000

or

## To set up local tunnel (recommended)

`lt --port 3000 --subdomain=subu`

https://subu.loca.lt
