import React from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { DragDropContext } from 'react-beautiful-dnd';

import config from '../config/config';
import Column from './Column';
import Http from '../services/Http';

class Board extends React.Component {
    constructor(props) {
        super(props);
        // Bind Methods
        this.handleNewListChange = this.handleNewListChange.bind(this);
        this.createColumn = this.createColumn.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.removeColumn = this.removeColumn.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        // Load Services
        this.http = new Http();
        // State
        this.state = {
            columns: [],
            showFormNewList: false,
            newListName: "",
            newListColor: ""
        };
    }

    componentDidMount() {
        // Load Scrum Columns
        this.http.get(`${config('API_BASE_URL')}/columns`)
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
            name: this.state.newListName,
            color: this.state.newListColor
        };
        axios.post(`${config('API_BASE_URL')}/columns`, column)
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

    onColorChange(color) {
        this.setState({
            newListColor: color.hex
        })
    }

    removeColumn(id) {
        const columns = this.state.columns.filter(column => column._id !== id);
        this.setState({columns});
    }

    onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            console.log('Dropped at the same column');
        } else {
            console.log('Dropped at new column');
        }
    }

    render() {
        const {columns} = this.state;
        return (
            <div className="board row">
                {columns && columns.map(column => <Column key={column._id} column={column} onColumnDeleted={this.removeColumn} />)}
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
                        <div className="add-list__color-picker">
                            <SketchPicker color={this.state.newListColor} onChangeComplete={this.onColorChange} />
                        </div>
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
