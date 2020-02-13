import React from 'react';
import Http from '../services/Http';

class Card extends React.Component {
    constructor(props) {
        super(props);
        // Load Services
        this.http = new Http();
        // Bind Methods
        this.editCard = this.editCard.bind(this);
        this.uneditCard = this.uneditCard.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.handleTitleEdit = this.handleTitleEdit.bind(this);
        this.handleContentEdit = this.handleContentEdit.bind(this);
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
    }

    saveCard() {
        let card = {
            column: this.state.column,
            title: this.state.title,
            content: this.state.content,
            order: this.state.order
        };console.log(card);
        if( this.state.id ) {
            // Update Card
            this.http.put(`http://localhost:5000/api/cards/${this.state.id}`, card)
                .then(card => console.log('Card Updated!'))
                .catch(err => console.log('Failed to create the card.'));
        } else {
            // Create Card
            this.http.post('http://localhost:5000/api/cards', card)
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
  
    render() {
        const {title, content} = this.state;
        return (
            <div className="card">
                <div className="card__header card-title">
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
                            <button onClick={this.uneditCard} className="btn btn-light">Close</button>
                            <button onClick={this.saveCard} className="btn btn-success">Save</button>
                        </div>
                    }
                </div>
            </div>
          );
    }
}

export default Card;
