var { buildSchema, Kind } = require('graphql');
var models = require('../models/index.js')
const { Op } = require('sequelize');
const { Response } = require('../helpers/util')

var schema = buildSchema(`
input UserInput {
    name: String
    phone: String
  }
  
  type User {
    id: ID
    name: String
    phone: String
  }

type Value {
    user: [User]
    totalPage: Int
    page: Int
}
 
 
  type Response {
    data: Value
    success: Boolean
  }
  
  type Query {
    getAllUsers(name: String, phone: String, page: Int, totalPage: Int): Response
    getUser(id: ID!): User  
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }
  
`);

var root = {


  getAllUsers: async ({ name, phone, page = 1, totalPage }) => {
    try {

      const limit = 3
      const offset = (page - 1) * limit

      if (name && phone) {
        const { count, rows } = await models.User.findAndCountAll({
          where: {
            [Op.and]: [
              {
                name: {
                  [Op.iLike]: '%' + name + '%'
                }
              },
              {
                phone: {
                  [Op.iLike]: '%' + phone + '%'
                }
              }
            ]
          },
          limit: limit,
          offset: offset
        })
        totalPage = Math.ceil(count / limit)
        return new Response({ user: rows, totalPage, page })
      } else if (name) {
        const { count, rows } = await models.User.findAndCountAll({
          where: {
            name: {
              [Op.iLike]: '%' + name + '%'
            }
          },
          limit: limit,
          offset: offset
        })
        totalPage = Math.ceil(count / limit)
        return new Response({ user: rows, totalPage, page })
      } else if (phone) {
        const { count, rows } = await models.User.findAndCountAll({
          where: {
            phone: {
              [Op.iLike]: '%' + phone + '%'
            }
          },
          limit: limit,
          offset: offset
        })
        totalPage = Math.ceil(count / limit)
        return new Response({ user: rows, totalPage, page })
      } else {
        const { count, rows } = await models.User.findAndCountAll({
          order: [
            ["id", "DESC"]
          ],
          limit: limit,
          offset: offset
        })
        totalPage = Math.ceil(count / limit)
        return new Response({ user: rows, totalPage, page })
      }
    } catch (error) {
      return error
    }
  },

  getUser: async ({ id }) => {
    return await models.User.findOne({
      where: {
        id: id
      }
    })
  },
  createUser: async ({ input }) => {
    return await models.User.create(input)
  },
  updateUser: async ({ id, input }) => {
    const update = await models.User.update(input, {
      where: {
        id: id
      },
      returning: true,
      plain: true
    })
    return update[1]
  },
  deleteUser: async ({ id }) => {
    const deleteUser = await models.User.destroy({
      where: {
        id: id
      }
    })
    return deleteUser
  }
}

/*
create

mutation createUser($name: String!, $phone: String!) {
  createUser(input: {name: $name, phone: $phone}) {
    id
    name
    phone
  }
}

update

mutation updateUser($id: ID!, $name: String!, $phone: String!) {
  updateUser(id: $id, input: {name: $name, phone: $phone}) {
    id
    name
    phone
  }
}

delete

mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    phone
  }
}

search

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


 */

module.exports = { schema, root }