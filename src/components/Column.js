import React from 'react';
import Card from './Card';

class Column extends React.Component {
    constructor(props) {
        super(props);
        // State
        this.state = {
            name: this.props.column.name,
            cards: this.props.column.cards || []
        };
    }
  
    render() {
        const {name, cards} = this.state;
        return (
            <div className="column col-2">
                <div className="column__header">{name}</div>
                <div className="column__tail">
                    {cards && cards.map((card, c) => <Card key={c} card={card} />)}
                </div>
            </div>
          );
    }
}

export default Column;
