![react-hasura-auth0](https://placehold.jp/a63063/ffffff/500x80.png?text=react-hasura-auth0)

ReactでHasuraとAuth0を組み合わせて使うためのユーティリティコンポーネントです。

## Demo

[demo](./demo)をご確認ください。

## Requirements

- react v18
- @apollo/client v3

# Installation

```bash
npm i git+https://github.com/tkzwhr/react-hasura-auth0
```

## Usage

通常モードと、開発用モードがあります。開発用モードではAuth0認証をスキップし、常にログイン状態になります。

```tsx
<!-- 通常モード -->
<HasuraWithAuth0
    bypassAuth0={false}
    hasuraUri="https://your-hasura-url.example.com/v1/graphql"
    auth0Domain="your auth0 domain"
    auth0ClientId="your auth0 client id"
    auth0RedirectUri="your auth0 redirect uri"
    auth0Audience="your auth0 audience"
    auth0Scope="your auth0 scope"
>
    <YourComponent/>
</HasuraWithAuth0>

<!-- 開発用モード -->
<HasuraWithAuth0
    bypassAuth0={true}
    hasuraUri="https://your-hasura-url.example.com/v1/graphql"
    token="your hasura jwt token"
>
    <YourComponent/>
</HasuraWithAuth0>
```

#### Parameters

通常モード

| name             | type    | required | description            |
|:-----------------|:--------|:--------:|:-----------------------|
| bypassAuth0      | boolean |    o     | falseを指定します。           |
| hasuraUri        | string  |    o     | Hasuraのエンドポイントを指定します。  |
| auth0Domain      | string  |    o     | Auth0のドメインを指定します。      |
| auth0ClientId    | string  |    o     | Auth0のクライアントIDを指定します。  |
| auth0RedirectUri | string  |    o     | Auth0のリダイレクトURIを指定します。 |
| auth0Audience    | string  |    o     | Auth0のオーディエンスを指定します。   |
| auth0Scope       | string  |    o     | Auth0のスコープを指定します。      |

開発用モード

| name        | type    | required | description                                               |
|:------------|:--------|:--------:|:----------------------------------------------------------|
| bypassAuth0 | boolean |    o     | trueを指定します。                                               |
| hasuraUri   | string  |    o     | Hasuraのエンドポイントを指定します。                                     |
| token       | string  |    o     | Auth0 Authentication Debugger API等で取得したHasura用のJWTを指定します。 |

#### Context

`useContext` でログイン状態やユーザー情報等を取得できます。

| name                  | type             | description                                                                            |
|:----------------------|:-----------------|:---------------------------------------------------------------------------------------|
| mode                  | `jwt` \| `auth0` | bypassAuth0がtrueの場合は `jwt` に、falseの場合は `auth0` になります。                                  |
| auth0                 | object           | modeが `auth0` の場合のみ設定されます。                                                             |
| auth0.isAuthenticated | boolean          | ログイン状態の場合はtrueになります。                                                                   |
| auth0.user            | object           | [User](https://auth0.github.io/auth0-spa-js/classes/User.html)を参照してください。               |
| auth0.client          | object           | [Auth0Client](https://auth0.github.io/auth0-spa-js/classes/Auth0Client.html)を参照してください。 |

```tsx
import {AuthContext} from "@tkzwhr/react-hasura-auth0";
import {useContext} from "react";

function MyComponent() {
    const state = useContext(AuthContext);

    // bypassAuth0がtrueの場合の処理
    if (state.mode === "jwt") {
        return <div>Authorized (jwt): Dev User</div>;
    }

    // ユーザー情報の取得
    if (!state.auth0.isAuthenticated) {
        return <div>Unauthorized (jwt)</div>;
    }

    return <div>Authorized (Auth0): ${state.auth0.user?.name}</div>;
}
```

# Note

- なし

# License

- [MIT](https://en.wikipedia.org/wiki/MIT_License)
