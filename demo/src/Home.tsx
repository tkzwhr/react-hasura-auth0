import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import { AuthContext } from "@tkzwhr/react-hasura-auth0";
import type { Result } from "@tkzwhr/react-hasura-auth0";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";

const INSERT_USER = gql`
mutation InsertUser($email: String!, $name: String!) {
  insert_users_one(object: {email: $email, name: $name}) {
    id
  }
}
`;

const FETCH_LIST = gql`
query FetchList {
  list {
    id
    description
  }
}
`;

const INSERT_LIST = gql`
mutation InsertList($text: String!) {
  insert_list_one(object: {description: $text}) {
    id
  }
}
`;

const DELETE_LIST = gql`
mutation DeleteList($id: Int!) {
  delete_list_by_pk(id: $id) {
    id
  }
}
`;

export default function Home() {
  const state = useContext(AuthContext);

  const login = useCallback(() => {
    state.mode === "auth0" &&
      state.auth0?.client?.loginWithPopup().then(() => {
        window.location.reload();
      });
  }, [state]);

  if (state.mode === "jwt") {
    return <HomePage auth0={null} />;
  }

  if (!state.auth0.isAuthenticated) {
    return (
      <button type="button" onClick={login}>
        ログイン
      </button>
    );
  }

  return <HomePage auth0={state.auth0} />;
}

function HomePage(props: { auth0: Result | null }) {
  const [text, setText] = useState("");

  const [insertUserFn] = useMutation(INSERT_USER, {
    variables: {
      name: props.auth0?.user?.name ?? "Test User",
      email: props.auth0?.user?.email ?? "test@example.com",
    },
  });
  const [insertListFn] = useMutation(INSERT_LIST, {
    variables: { text },
    refetchQueries: [FETCH_LIST],
  });

  useEffect(() => {
    insertUserFn()
      .then()
      .catch(() => {});
  }, [insertUserFn]);

  const insertListAction = () => {
    insertListFn().then(() => {
      setText("");
    });
  };

  return (
    <div>
      <p>Hello, {props.auth0?.user?.name ?? "Test User"}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="button" onClick={insertListAction}>
          送信
        </button>
      </div>
      <button type="button" onClick={() => props.auth0?.client?.logout()}>
        ログアウト
      </button>
    </div>
  );
}

function List() {
  const data = useSuspenseQuery<{
    list: { id: number; description: string }[];
  }>(FETCH_LIST);

  const [deleteId, setDeleteId] = useState(0);

  const [deleteFn] = useMutation(DELETE_LIST, {
    variables: { id: deleteId },
    refetchQueries: [FETCH_LIST],
  });

  const deleteAction = (id: number) => {
    setDeleteId(id);
    setTimeout(() => {
      deleteFn().then(() => {
        setDeleteId(0);
      });
    }, 10);
  };

  return (
    <ul>
      {data.data.list.map((i) => (
        <li key={i.id}>
          {i.description}{" "}
          <button type="button" onClick={() => deleteAction(i.id)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
