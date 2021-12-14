import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;
