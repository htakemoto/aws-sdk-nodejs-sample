# AWS SDK NodeJS Sample

## Requirements

* [AWS CLI](https://aws.amazon.com/cli/)
* [Node.js](http://nodejs.org/)
* [Docker](https://www.docker.com/) (used only for DynamoDB)

## Local Env Setup

### AWS Setup

1. Obtain an appropriate AWS **access/secret key** which has an appropriate priviledge for Read/Write

2. Set the key in your local machine as follows:

    ```bash
    aws configure --profile YOUR_PROFILE
    ```

### Environment Configs

1. Create `.env` file under the root folder of this project

    ```bash
    # AWS
    REGION = "us-east-1"

    # DATABASE
    DB_NAME = "sample"
    DB_HOST = "http://localhost:8000"
    ```

2. Update config values in `src/index.js`


## Quick Start

1. Set AWS_PROFILE for **AWS CLI**

    ```bash
    export AWS_PROFILE="YOUR_PROFILE"
    ```

2. Set up DynamoDB Local (only for sample-repository)

    Open a new terminal window and execute the following

    ```bash
    # start DynamoDB Local in a Docker container
    docker run --name dynamodb \
    --rm \
    -p 8000:8000 \
    amazon/dynamodb-local
    # note: `-rm` option will delete container (DB data) once stopped
    ```

    come back to original terminal where you executed `export AWS_PROFILE="YOUR_PROFILE"`

    ```bash
    # make sure you set AWS_PROFILE
    echo $AWS_PROFILE
    ```

    - AWS_PROFILE is required even on local env.
    - It can be anything, but it is less comlex to use the same credential above because the same AWS_PROFILE is required till stopping the docker container

    ```bash
    # create table
    aws dynamodb create-table \
    --table-name sample \
    --attribute-definitions AttributeName=Id,AttributeType=S \
    --key-schema AttributeName=Id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000
    # check table
    aws dynamodb list-tables --endpoint-url http://localhost:8000
    # check all items
    aws dynamodb scan --table-name sample --endpoint-url http://localhost:8000
    ```

    **Javascript Shel** is available at http://localhost:8000/shell/

3. Install dependency files

    ```bash
    npm install
    ```

4. Execute

    ```bash
    npm start
    ```

## Test

```bash
npm run lint
```
configuration file: `.eslintrc.json`
