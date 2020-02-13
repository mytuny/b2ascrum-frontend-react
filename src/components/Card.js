import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        // State
        this.state = {
            title: props.title,
            content: props.content
        };
    }
  
    render() {
        const {title, content} = this.state;
        return (
            <div className="card">
                <div className="card__header">{title}</div>
                <div className="card__body">
                    {content && content}
                </div>
            </div>
          );
    }
}

export default Card;
