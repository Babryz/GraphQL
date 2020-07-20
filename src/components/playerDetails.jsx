import React from 'react';
import { graphql } from 'react-apollo';
import { getPlayerQuery } from '../queries/queries';

class PlayerDetails extends React.Component {
    displayPlayerDetails() {
        const { player } = this.props.data;
        if (player) {
            return (
                <div>
                    <h2>{player.name}</h2>
                    <p>Playstyle: {player.playstyle}</p>
                    <p>Team: {player.team.name}</p>
                    <p>All players on {player.team.name}: </p>
                    <ul className="other-players">
                        {player.team.players.map(player => {
                            return <li key="player.id">{player.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No player selected</div>
            )
        }
    }
    
    render() {
        return (
        <div id="player-details">{this.displayPlayerDetails()}</div>
        )
    }
}

export default graphql(getPlayerQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.playerId
            }
        }
    }
})(PlayerDetails);