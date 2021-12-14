import { gql, useMutation } from "@apollo/client";
import React from "react";
import { ADD_TODO } from "../apollo/mutations";
import { GET_TODOS } from "../apollo/queries";

export const AddTodo = () => {
  let input;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { text: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
