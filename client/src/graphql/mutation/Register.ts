import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register(
    $name: String!
    $surname: String!
    $nickname: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      registerInput: {
        name: $name
        surname: $surname
        nickname: $nickname
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    )
  }
`