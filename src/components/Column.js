import React from 'react';
import Card from './Card';

class Column extends React.Component {
    constructor(props) {
        super(props);
        // State
        this.state = {
            name: props.name,
            cards: [
                {title: "Card #1", content: ""},
                {title: "Card #2", content: ""}
            ]
        };
    }
  
    render() {
        const {name, cards} = this.state;
        return (
            <div className="column col-2">
                <div className="column__header">{name}</div>
                <div className="column__tail">
                    {cards && cards.map((card, c) => <Card key={c} title={card.title} content={card.content} />)}
                </div>
            </div>
          );
    }
}

export default Column;
