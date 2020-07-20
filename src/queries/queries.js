import { gql } from 'apollo-boost';

const getTeamsQuery = gql`
    {
        teams {
            name
            id
        }
    }
`;

const getPlayersQuery = gql`
    {
        players{
            id
            name
            playstyle
            team{
                name
            }
        }
    }
`;

const addPlayerMutation = gql`
    mutation($name: String!, $playstyle: String!, $teamId: ID!){
        addPlayer(name: $name, playstyle: $playstyle, teamId: $teamId){
            name
            id
        }
    }
`;

const getPlayerQuery = gql`
    query($id: ID){
        player(id: $id){
            id
            name
            playstyle
            team {
                id
                name
                joinDate
                players {
                    name
                    playstyle
                    id
                }
            }
        }
    }
`

export { getPlayersQuery, getTeamsQuery, addPlayerMutation, getPlayerQuery };