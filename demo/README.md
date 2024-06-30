# Demo

## Setup

下記をインストールしておく。

- docker
- node

下記に沿ってAuth0をセットアップする。

https://hasura.io/learn/graphql/hasura-authentication/integrations/auth0/

- `Sync Users Between Auth0 and Hasura` は省略して良い

下記の内容で `docker-compose.override.yaml` を作成する。

- 9行目に `Connect Hasura with Auth0` で生成したJWT Configの `key` を設定する

```yaml
version: '3.6'

services:
  hasura:
    environment: &environment
      HASURA_GRAPHQL_JWT_SECRET: |
        {
          "type": "RS512",
          "key": "",
          "allowed_skew": 86400
        }
```

HasuraとPostgreSQLを起動し、nodeモジュールをインストールする。

```shell
docker compose up -d
npm i
```

[Hasura](http://localhost:8080/)にアクセスし、[hasura_meatadata.json](./hasura_metadata.json)を読み込む。

- admin-secretは `hasura`

## Using without Auth0

主に開発目的でAuth0による認証を省く場合の設定。

下記の `Test the Auth0 Token` を行い、JWTを発行する。

https://hasura.io/learn/graphql/hasura-authentication/integrations/auth0/

`.env` を作成する。

- 3行目にJWTの `access_token` を設定する

```text
VITE_BYPASS_AUTH0=true
VITE_HASURA_URI=http://localhost:8080/v1/graphql
VITE_HASURA_TOKEN=<access_token>
```

viteを起動する。

```shell
npm run dev
```

## Using with Auth0

Auth0を利用する通常の設定。

`.env` を作成する。

- 3～6行目にAuth0アプリケーションの情報を設定する

```text
VITE_BYPASS_AUTH0=false
VITE_HASURA_URI=http://localhost:8080/v1/graphql
VITE_AUTH0_DOMAIN=<auth0_domain>
VITE_AUTH0_CLIENT_ID=<auth0_client_id>
VITE_AUTH0_AUDIENCE=<auth0_audience>
VITE_AUTH0_SCOPE=<auth0_scope>
```

viteを起動する。

```shell
npm run dev
```
