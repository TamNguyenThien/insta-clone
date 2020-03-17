import gql from 'graphql-tag'

const UPDATE_NODE = gql`mutation updateNode($_id: ID!, $input: NodeInput!){
  updateNode(_id: $_id, input: $input){
    _id
    parent{
     _id
     name
     category
     createdAt
     updatedAt
   }
     name
     category
     createdAt
     updatedAt
  }
}`
const DELETE_NODE = gql`mutation deleteNode($_id: ID!){
  deleteNode(_id: $_id)
}`
const CREATE_NODE = gql`mutation createNode($input: NodeInput!){
  createNode(input: $input){
    _id
    parent{
     _id
     name
     category
     createdAt
     updatedAt
   }
     name
     category
     createdAt
     updatedAt
  }
}`

export { CREATE_NODE, UPDATE_NODE, DELETE_NODE }
