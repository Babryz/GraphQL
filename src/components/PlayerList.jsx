import React from 'react';
import { graphql } from 'react-apollo';
import { getPlayersQuery } from '../queries/queries';
import PlayerDetails from './playerDetails';

class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    displayPlayers() {
        let data = this.props.data;
        if (data.loading === true) {
            return ( <div>Loading players...</div> )
        } else {
            return data.players.map(player => {
                return (
                    <li key={player.id} onClick={(e) => {this.setState({ selected: player.id })}}>{player.name} | {player.team.name}</li>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <ul id="player-list">
                    {this.displayPlayers()}
                </ul>
                <PlayerDetails playerId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getPlayersQuery)(PlayerList); 
