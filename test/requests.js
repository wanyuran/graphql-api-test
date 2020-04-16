import ApolloClient, {gql} from "apollo-boost";
import fetch from "node-fetch";

export const client = new ApolloClient({
    uri: "https://dev.session.mobi/graphql",
    headers:{
        "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTU4Njg0MTU0OCwiZXhwIjoyMTkxNjQxNTQ4fQ.BuXsQjSO6O2vZ_XaH3SzSShkgpD004jn21-EDMlBq2I"
    },
    fetch: fetch,
    onError: (e) => { console.log(e) }
});

export const ADD_SESSION_VOTE = gql`
mutation ($sessionId: Int!) {
  addApplicationNum(id: $sessionId)
}
`;

export const GET_SESSION = gql`
query ($sessionId: Int!) {
  session(id: $sessionId) {
    id
    title
    createdAt
    description
    voteNum
    creator {
      nickname
      avatarUrl
      openId
    }
    voteInfo {
      voteUsers {
        avatarUrl
      }
      isVote
    }
    permissionInfo {
      isAdmin
      isOwner
    }
  }  
}
`;

export const CANCEL_SESSION_VOTE = gql`
mutation ($sessionId: Int!) {
  deleteApplicationNum(id: $sessionId)
}
`
;