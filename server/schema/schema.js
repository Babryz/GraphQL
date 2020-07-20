const graphql = require('graphql');
const _ = require('lodash');

const Player = require('../models/player');
const Team = require('../models/team');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull } = graphql;


const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        playstyle: { type: GraphQLString },
        team: {
            type: TeamType,
            resolve(parent, args) {
                return Team.findById(parent.teamId)
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        joinDate: { type: GraphQLInt },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({
                    teamId: parent.id
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB or other source
                return Player.findById(args.id)
            }
        },
        team: {
            type: TeamType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                return Team.findById(args.id)
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({})
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args) {
                return Team.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTeam: {
            type: TeamType,
            args: {
                name:  { type: new GraphQLNonNull(GraphQLString) },
                joinDate: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let team = new Team({
                    name: args.name,
                    joinDate: args.joinDate
                })
                return team.save()
            }
        },
        addPlayer: {
            type: PlayerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                playstyle: { type: new GraphQLNonNull(GraphQLString) },
                teamId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                    let player = new Player({
                    name: args.name,
                    playstyle: args.playstyle,
                    teamId: args.teamId
                })

                return await player.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})