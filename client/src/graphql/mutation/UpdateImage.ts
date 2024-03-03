import { gql } from "@apollo/client";

export const UPDATE_IMAGE = gql`
  mutation UpdateImage(
    $image: Upload!
  ){
    updateImage(
      image: $image
    )
  }
`