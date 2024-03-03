import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile (
    $nickname: String!
  ){
    getUserProfile(
      nickname: $nickname
    ){
      id
      name
      surname
      nickname
      email
      avatar
    }
  }
`