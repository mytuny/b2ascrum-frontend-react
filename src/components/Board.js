import React from 'react';
import axios from 'axios';

import Column from './Column';
import Http from '../services/Http';

class Board extends React.Component {
    constructor(props) {
        super(props);
        // Bind Methods
        this.handleNewListChange = this.handleNewListChange.bind(this);
        this.createColumn = this.createColumn.bind(this);
        // Load Services
        this.http = new Http();
        // State
        this.state = {
            columns: [],
            showFormNewList: false,
            newListName: ""
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

    handleNewListChange(event) {
        const name = event.target.value;
        this.setState(state => ({
            ...state,
            newListName: name
        }));
    }

    createColumn() {
        let column = {
            name: this.state.newListName
        };
        axios.post('http://localhost:5000/api/columns', column)
            .then(response => {
                const {data: column} = response;
                this.setState(state => ({
                    showFormNewList: false,
                    newListName: "",
                    columns: [
                        ...state.columns,
                        column
                    ]
                }));
            })
            .catch(err => console.log('Failed to create the column.'));
    }

    render() {
        const {columns} = this.state;
        return (
            <div className="board row">
              {columns && columns.map(column => <Column key={column._id} column={column} />)}
              <div className="col-2 board__add-list">
                  {
                      !this.state.showFormNewList &&
                      <button 
                        className="btn btn-primary"
                        onClick={() => this.setState({showFormNewList: true})}
                    >Add New List</button>
                  }
                  {
                    this.state.showFormNewList &&
                    <div className="add-list__form">
                        <input 
                        type="text" 
                        className="form-control"
                        value={this.state.newListName} 
                        onChange={this.handleNewListChange} />
                        <button 
                            className="btn btn-success"
                            onClick={this.createColumn}
                        >Create</button>
                        <button 
                            className="btn btn-light"
                            onClick={() => this.setState({showFormNewList: false})}
                        >Close</button>
                    </div>
                  }
              </div>
            </div>
          );
    }
}

export default Board;
