import React from 'react';
import Column from './Column';
import Http from '../services/Http';

class Board extends React.Component {
    constructor(props) {
        super(props);
        // Load Services
        this.http = new Http();
        // State
        this.state = {
            columns: []
        };
    }

    componentDidMount() {
        // Load Scrum Columns
        this.http.get('http://localhost:5000/api/columns')
            .then(columns => {
                console.log(columns);
                this.setState({columns: [...columns]});
            })
            .catch(err => console.log('Failed to load columns ', err));
    }

    render() {
        const {columns} = this.state;
        return (
            <div className="board row">
              {columns && columns.map(column => <Column key={column._id} column={column} />)}
            </div>
          );
    }
}

export default Board;
