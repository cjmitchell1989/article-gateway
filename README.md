# Article Gateway

The article gateway is used to limit the number of articles a user can access.
This gateway would be used as a service in front of an actual article delivery service as an authorization service.

The user must make a request for an article, including their client_id, and the Article Gateway will check if that client_id exists in storage.
- If it exists, the number of accesses will be incremented and assessed against a limit value (3) and if not more than the limit value a HTTP 200 code will be returned
- If the number of accesses exceeds the limit value, a 429 code will be returned
- If it does not exist, the client_id will be created, number of accesses set to 1 and a 200 code returned


## Use
To use the gateway locally, run `docker-compose up --duild`.
This will run the gateway on port 3000

Make a GET request to `localhost:3000`
