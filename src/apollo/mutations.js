import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(type: $text) {
      id
      type
    }
  }
`;

export const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;
