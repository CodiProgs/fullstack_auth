import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String!
    $surname: String!
  ){
    updateUser(
      updateUserInput: {
        name: $name
        surname: $surname
      }
    )
  }
`