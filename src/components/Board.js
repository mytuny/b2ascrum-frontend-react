import React from 'react';
import Column from './Column';

class Board extends React.Component {
    constructor(props) {
        super(props);
        // State
        this.state = {
            columns: ["Story", "Not Started", "In Progress", "Done"]
        };
    }

    render() {
        const {columns} = this.state;
        return (
            <div className="board row">
              {columns && columns.map(column => <Column key={column} name={column} />)}
            </div>
          );
    }
}

export default Board;
