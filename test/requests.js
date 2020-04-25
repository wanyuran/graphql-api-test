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

export const GET_PRESENTATION = gql`
query ($sessionId: Int!) {
  presentation(id: $sessionId) {
    id
    title
    description
    presentationStartDate
    presentationEndDate
    presenter
    offlinePresentation
    onlinePresentation
    documentUrl
    feedbackUrl
    permissionInfo {
      isAdmin
      isOwner
    }
    applyInfo {
      isApply
      onlineUsers {
        avatarUrl
      }
    }
  }
}
`;

export const CANCEL_SESSION_VOTE = gql`
mutation ($sessionId: Int!) {
  deleteApplicationNum(id: $sessionId)
}
`;

export const ADD_PRESENTATION_VOTE = gql`
mutation ($sessionId: Int!) {
  addApplicationNum(id: $sessionId)
}
`;

export const CANCEL_PRESENTATION_VOTE = gql`
mutation ($sessionId: Int!) {
  deleteApplicationNum(id: $sessionId)
}
`;
export const PUBLISH_SESSION = gql`
mutation ($title: String!, $description: String!, $teamId: Int!) {
  createSession(input: {title: $title, description: $description, teamId: $teamId}) {
    id
  }
}
`;

export const PUBLISH_PRESENTATION = gql`
mutation ($sessionId: Int, $title: String!, $description: String!, $presenter: String!, $presentationStartDate: String, $presentationEndDate: String, $offlinePresentation: String, $onlinePresentation: String, $teamId: Int!) {
  createPresentation(input: {sessionId: $sessionId, title: $title, description: $description, presenter: $presenter, presentationStartDate: $presentationStartDate, presentationEndDate: $presentationEndDate, offlinePresentation: $offlinePresentation, onlinePresentation: $onlinePresentation, teamId: $teamId}) {
    id
  }
}
`;

export const DELETE_SESSION = gql`
mutation ($sessionId: Int!) {
  deleteSession(id: $sessionId)
}
`;

export const GET_SESSIONS = gql`
query ($teamId: Int!, $first: Int!, $cursor: String) {
  getSessionsByTeamId(teamId: $teamId, first: $first, cursor: $cursor) {
    totalCount
    edges {
      node {
        ... on Session {
          id
          title
          voteNum
          hero
          voteInfo {
            isVote
          }
          creator {
            nickname
          }
          claimInfo {
            isClaimed
          }
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;