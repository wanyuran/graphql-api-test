import {gql} from "apollo-boost";

export const GET_MY_SUBSCRIPTIONS = gql`
query ($role: String) {
  teams(input: {role: $role}) {
    id
    name
    userRole
  }
}
`;

export const CREATE_SUBSCRIPTION = gql`
mutation ($teamName: String!) {
  createTeam(name: $teamName) {
    id
    name
  }
}
`;

export const EDIT_MY_INFO = gql`
mutation ($nickname: String!, $avatarUrl: String!, $email: String, $phone: String, $wechatId: String) {
  updateUser(userInfo: {nickname: $nickname, avatarUrl: $avatarUrl, email: $email, phone: $phone, wechatId: $wechatId}) {
    id
    nickname
    avatarUrl
    openId
    email
    phone
    wechatId
    isRealName
  }
}
`;



