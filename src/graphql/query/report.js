import gql from 'graphql-tag'

const REPORT_ORDER = gql`
  query {
  reportOrder {
    dishes{
      name
      count
    }
  }
}
`
const ORDER_FOR_USER = gql`
  query {
    users {
    _id
    fullName
  }
}
`
const MENU_PUBLISH = gql`
  query {
  menuPublished{
    _id
    dishes {
      _id
      name
    }
  }
}
`
export { REPORT_ORDER, ORDER_FOR_USER, MENU_PUBLISH }
