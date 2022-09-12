# Time Ark Backend

Time tracking and user invoicing app for freelancers.

# npm run serve to start server


# Mongo DB connection

To configure MongoDB, in .env file, set MONGO_URI and MONGO_NAME

MONGO_URI refers to the connection string to access MongoDB server

MONGO_NAME is the name of the Mongo database within the server

Example:

```
MONGO_URI=mongodb+srv://{{username}}:{{password}}@{{server_url}}/?retryWrites=true&w=majority
MONGO_NAME=timeoark
```

With mongoDB cloud, `server_url` is of form: xxx.xxx.mongodb.net

If you are using a local mongo database, connectiont string should be:

```
MONGO_URI="mongodb://127.0.0.1:27017"
MONGO_NAME=timeark

```
