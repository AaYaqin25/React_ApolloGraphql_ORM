
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`

query getAllUsers($name: String, $phone: String, $page: Int, $totalPage: Int) {
  getAllUsers(name: $name, phone: $phone, page: $page, totalPage: $totalPage) {
    data {
      user {
        id
        name 
        phone
      }
      page
      totalPage
    }
  }
}
  
`;

export const CREATE_USER = gql`
mutation createUser($name: String!, $phone: String!) {
    createUser(input: {name: $name, phone: $phone}) {
      id
      name
      phone
    }
  }
  
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    phone
  }
}
  
`;

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String!, $phone: String!) {
  updateUser(id: $id, input: {name: $name, phone: $phone}) {
    id
    name
    phone
  }
}
  
`;