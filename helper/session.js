import { gql } from "apollo-boost";

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
`;

export const PUBLISH_SESSION = gql`
mutation ($title: String!, $description: String!, $teamId: Int!) {
  createSession(input: {title: $title, description: $description, teamId: $teamId}) {
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

export const SEARCH_SESSION = gql`query ($keyword: String!, $first: Int!, $cursor: String) {
  searchSessionPresentation(keyword: $keyword, first: $first, cursor: $cursor) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
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
          team {
            name
          }
          claimInfo {
            isClaimed
          }
        }
        ... on Presentation {
          id
          presenter
          title
          createdAt
          applyInfo {
            isApply
          }
          offlineApplyNum
          onlineApplyNum
          presentationStartDate
          hero
          isHistory
          documentUrl
          team {
            name
          }
        }
      }
    }
  }
}
`
;

export const EDIT_SESSION = gql`
mutation ($title: String!, $description: String!, $teamId: Int!, $id: ID!) {
  updateSession(id: $id, input: {title: $title, description: $description, teamId: $teamId}) {
    id
  }
}
`;