import React from 'react';
import Card from './Card';

class Column extends React.Component {
    constructor(props) {
        super(props);
        // Bind Methods
        this.createCard = this.createCard.bind(this);
        // State
        this.state = {
            id: this.props.column._id,
            name: this.props.column.name,
            cards: this.props.column.cards || [],
            showNewCardForm: false
        };
    }

    createCard() {
        this.setState({showNewCardForm: true});
    }
  
    render() {
        const {id, name, cards} = this.state;
        return (
            <div className="column col-2">
                <div className="column__header">
                    {name}
                    <button onClick={this.createCard}>+</button>
                </div>
                <div className="column__tail">
                    {cards && cards.map((card, c) => <Card key={c} card={card} order={c+1} />)}
                    {
                        this.state.showNewCardForm &&
                        <Card card={{column: id, editable: true}} />
                    }
                </div>
            </div>
          );
    }
}

export default Column;
