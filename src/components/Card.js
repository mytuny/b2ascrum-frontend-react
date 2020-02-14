import React from 'react';
import axios from 'axios';

import config from '../config/config';

class Card extends React.Component {
    constructor(props) {
        super(props);
        // Load Services
        // this.http = new Http();
        // Bind Methods
        this.editCard = this.editCard.bind(this);
        this.uneditCard = this.uneditCard.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.handleTitleEdit = this.handleTitleEdit.bind(this);
        this.handleContentEdit = this.handleContentEdit.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        // State
        this.state = {
            id: this.props.card._id || "",
            column: this.props.card.column || "",
            title: this.props.card.title || "",
            content: this.props.card.content || "",
            order: this.props.order || 0,
            editable: this.props.card.editable || false
        };
    }

    editCard() {
        this.setState({editable: true});
    }

    uneditCard() {
        this.setState({editable: false});
        if( !this.state.id ) {
            this.props.cleanList();
        }
    }

    saveCard() {
        let card = {
            column: this.state.column,
            title: this.state.title,
            content: this.state.content,
            order: this.state.order
        };
        if( this.state.id ) {
            // Update Card
            axios.put(`${config('API_BASE_URL')}/cards/${this.state.id}`, card)
                .then(card => {
                    this.setState({editable: false});
                })
                .catch(err => console.log('Failed to create the card.'));
        } else {
            // Create Card
            axios.post(`${config('API_BASE_URL')}/cards`, card)
                .then(card => {
                    this.setState({id: card._id, editable: false});
                })
                .catch(err => console.log('Failed to create the card.'));
        }
    }

    handleTitleEdit(event) {
        const title = event.target.value;
        this.setState(state => ({
            ...state,
            title
        }));
    }

    handleContentEdit(event) {
        const content = event.target.value;
        this.setState(state => ({
            ...state,
            content
        }));
    }

    onDragStart(event) {
        event.dataTransfer.setData('text/plain', JSON.stringify(this.state));
    }

    onDragEnd(event) {
        console.log('onDragEnd');
        this.props.removeCard(this.state.id);
    }
  
    render() {
        const {title, content} = this.state;
        return (
            <div className={"card "} draggable onDragStart={(e) => this.onDragStart(e)} onDragEnd={(e) => this.onDragEnd(e)}>
                <div className="card__header card-title" style={{borderTop: `3px solid ${this.props.color}`}}>
                    {
                        !this.state.editable &&
                        <h4>{title} <i onClick={this.editCard} className="fa fa-pencil"></i></h4>
                    }
                    {
                        this.state.editable &&
                        <div className="card__form">
                            <input type="text" className="form-control" value={title} onChange={this.handleTitleEdit} />
                        </div>
                    }
                </div>
                <div className="card__body card-body">
                    {!this.state.editable && content && content}
                    {
                        this.state.editable &&
                        <div className="card__form">
                            <textarea 
                                className="form-control" 
                                value={content} 
                                onChange={this.handleContentEdit}
                            ></textarea>
                            <button onClick={this.uneditCard} className="btn btn-light">
                                <i className="fa fa-close"></i>
                            </button>
                            <button onClick={this.saveCard} className="btn btn-success">
                                <i className="fa fa-save"></i>
                            </button>
                        </div>
                    }
                </div>
            </div>
          );
    }
}

export default Card;
