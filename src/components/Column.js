import React from 'react';
import axios from 'axios';

import Card from './Card';

class Column extends React.Component {
    constructor(props) {
        super(props);
        // Bind Methods
        this.createCard = this.createCard.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.uneditColumn = this.uneditColumn.bind(this);
        this.handleNameEdit = this.handleNameEdit.bind(this);
        this.updateColumn = this.updateColumn.bind(this);
        this.cleanList = this.cleanList.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        // State
        this.state = {
            id: this.props.column._id,
            name: this.props.column.name,
            cards: this.props.column.cards || [],
            order: this.props.column.order || 0,
            color: this.props.column.color || '#EAE7DC',
            showNewCardForm: false,
            editable: false
        };
    }

    createCard() {
        this.setState({showNewCardForm: true});
    }

    editColumn() {
        this.setState({editable: true});
    }

    uneditColumn() {
        this.setState({editable: false});
    }

    handleNameEdit(event) {
        const name = event.target.value;
        this.setState(state => ({
            ...state,
            name
        }));
    }

    updateColumn() {
        let column = {
            name: this.state.name,
            order: this.state.order
        };
        if( !this.state.id ) return; // TODO: Handle Error Display

        axios.put(`http://localhost:5000/api/columns/${this.state.id}`, column)
            .then(column => {
                this.setState({editable: false});
            })
            .catch(err => console.log('Failed to update the column.'));
    }

    cleanList() {
        const cleanCards = this.state.cards.filter(card => card._id);console.log('Clean Cards: ', cleanCards);
        this.setState(state => ({
            ...state,
            showNewCardForm: false,
            editable: false,
            cards: cleanCards
        }));
    }

    deleteColumn() {
        const {id: columnId} = this.state;
        if(!columnId) return;
        axios.delete(`http://localhost:5000/api/columns/${columnId}`)
        .then(response => {
            // TODO: Success notif!
        })
        .catch(err => console.log(err));
    }
  
    render() {
        const {id, name, cards, color} = this.state;
        return (
            <div className="column col-2">
                <div className="column__header" style={{backgroundColor: color}}>
                    {
                        !this.state.editable &&
                        <React.Fragment>
                            <span>
                            {name}
                            </span>
                            <i onClick={this.editColumn} className="fa fa-pencil"></i>
                            <i className="fa fa-plus" onClick={this.createCard}></i>
                        </React.Fragment>
                    }
                    {
                        this.state.editable &&
                        <React.Fragment>
                            <input className="form-control" type="text" value={name} onChange={this.handleNameEdit} />
                            <i onClick={this.updateColumn} className="fa fa-save"></i>
                            <i onClick={this.uneditColumn} className="fa fa-close"></i>
                            <i onClick={this.deleteColumn} className="fa fa-trash"></i>
                        </React.Fragment>
                    }
                </div>
                <div className="column__tail">
                    {cards && cards.map((card, c) => <Card key={c} card={card} color={color} order={c+1} removeCard={this.removeCard} />)}
                    {
                        this.state.showNewCardForm &&
                        <Card card={{column: id, editable: true}} color={color} cleanList={this.cleanList} />
                    }
                </div>
            </div>
          );
    }
}

export default Column;
