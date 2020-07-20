import React from 'react';
import { graphql } from 'react-apollo';
import  * as compose from 'lodash.flowright';
import { getTeamsQuery, addPlayerMutation, getPlayersQuery } from '../queries/queries';

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            playstyle: '',
            teamId: ''
        }
    }

    displayTeams() {
        let data = this.props.getTeamsQuery;
        if (data.loading === true) {
            return (
                <option disabled>Loading teams...</option>
            )
        } else {
            return data.teams.map(team => {
                return (
                <option key={team.id} value={team.id}>{team.name}</option>
                )
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.addPlayerMutation({
            variables: {
                name: this.state.name,
                playstyle: this.state.playstyle,
                teamId: this.state.teamId
            },
            refetchQueries: [{
                query: getPlayersQuery
            }]
        });
    }

    render() {
        return (
            <form id="add-player" onSubmit={this.submitForm}>
                <div className="field">
                    <label htmlFor="name">Player name:</label>
                    <input type="text" name="name" id="name" onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label htmlFor="playstyle">Playstyle:</label>
                    <input type="text" name="playstyle" id="playstyle" onChange={(e) => this.setState({playstyle: e.target.value})}/>
                </div>
                <div className="field">
                    <label htmlFor="team">Team:</label>
                    <select name="team" id="team" onChange={(e) => this.setState({teamId: e.target.value})}>
                        <option value="">- Select a team -</option>
                        {this.displayTeams()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getTeamsQuery, {name: "getTeamsQuery"}),
    graphql(addPlayerMutation, {name: "addPlayerMutation"})
)(AddPlayer);