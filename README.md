# Article Gateway

The article gateway is used to limit the number of articles a user can access.
This gateway would be used as a service in front of an actual article delivery service, effectively as an authorization service.

The user must make a request for an article, including their client_id in a query parameter, and the Article Gateway will check if that client_id exists in storage.
- If it exists, the number of accesses will be incremented and assessed against a limit value and if not more than the limit value a HTTP 200 code will be returned
- If the number of accesses exceeds the limit value, a 429 code will be returned
- If it does not exist, the client_id will be created in the database, number of accesses set to 1 and a 200 code returned


## Use
To use the gateway locally, run `docker-compose up --build`.
This will run the gateway on port 3000 as configured in the docker-compose file

Make a GET request to `localhost:3000?client_id=12345` from a browser or a tool like Postman.
Make the same GET request multiple times and when the number of accesses is exceeded the response will change from a 200 (OK) to a 429 (Too Many Requests)

Edit the `12345` to any string to try as a different client

## Test
To test, ensure a redis container is running locally using: `docker run -p6379:6379 redis`
Then run `npm test`. This will run a linter over the code before running automated tests and providing a summary output.


## Solution Explanation
The solution uses a redis in-memory key-value database to store a value of accesses against a client_id.
Redis can handle ~75k RPS so is a good option to begin with. If further scaling is required, client_id's could be sharded across multiple redis instances.
The application is kept stateless to enable horizontal scaling on a platform such as kubernetes or Google Cloud Run

## Deployment
This application could be deployed to Google Cloud Run or Kubernetes, with a redis cache also deployed to GCR, alternatively Google MemoryStore could be used which is a managed Redis instance.

## Monitoring
To monitor this solution, I would observe response times for the application, as well as RPS on the Redis instance. If either begun to rise I would look to scale the applicaiton and also potentially shard the cliend_id's across redis instances.

## Logging
For logging, I would look to pipe the logs to a centralised tool to be able to aggregate all logs and find issues more easily, rather than assessing each individual container separately