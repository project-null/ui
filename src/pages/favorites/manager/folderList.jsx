import React, {PropTypes} from 'react';

const Index = (props) => {
    const { title, img, desc, handleClick } = props;
    return (
        <li className="folder-li" onClick={handleClick}>
            <img src="/src/static/images/timg.jpeg" className="folder-img" />
            <span className="folder-span">{title}</span>
        </li>
    )
}

Index.propTypes = {
};

export default Index;
