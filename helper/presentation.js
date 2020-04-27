import {gql} from "apollo-boost";

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

export const PUBLISH_PRESENTATION = gql`
mutation ($sessionId: Int, $title: String!, $description: String!, $presenter: String!, $presentationStartDate: String, $presentationEndDate: String, $offlinePresentation: String, $onlinePresentation: String, $teamId: Int!, $orderMealDeadline: String) {
  createPresentation(input: {sessionId: $sessionId, title: $title, description: $description, presenter: $presenter, presentationStartDate: $presentationStartDate, presentationEndDate: $presentationEndDate, offlinePresentation: $offlinePresentation, onlinePresentation: $onlinePresentation, teamId: $teamId, orderMealDeadline: $orderMealDeadline}) {
    id
  }
}
`;

export const DELETE_PRESENTATION = gql`
mutation ($sessionId: Int!) {
  deletePresentation(id: $sessionId)
}
`;

export const GET_PRESENTATIONS = gql`
query ($teamId: Int!, $first: Int!, $cursor: String) {
  getPresentationsByTeamId(teamId: $teamId, first: $first, cursor: $cursor, isHistory: false) {
    totalCount
    edges {
      node {
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

export const GET_HISTORY_PRESENTATIONS = gql`
query ($teamId: Int!, $first: Int!, $cursor: String) {
  getPresentationsByTeamId(teamId: $teamId, first: $first, cursor: $cursor, isHistory: true) {
    totalCount
    edges {
      node {
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

export const EDIT_PRESENTATION = gql`
mutation ($sessionId: Int, $title: String!, $description: String!, $presenter: String!, $presentationStartDate: String, $presentationEndDate: String, $offlinePresentation: String, $onlinePresentation: String, $teamId: Int!, $id: ID!, $orderMealDeadline: String) {
  updatePresentation(id: $id, input: {sessionId: $sessionId, title: $title, description: $description, presenter: $presenter, presentationStartDate: $presentationStartDate, presentationEndDate: $presentationEndDate, offlinePresentation: $offlinePresentation, onlinePresentation: $onlinePresentation, orderMealDeadline: $orderMealDeadline, teamId: $teamId}) {
    id
  }
}
`;