import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser(
    $id: String!
  ){
    deleteUser(
      id: $id
    )
  }
`