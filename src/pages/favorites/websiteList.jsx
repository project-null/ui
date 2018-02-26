import React, {PropTypes} from 'react';

const Index = (props) => {
    const { title, img, desc,label, handleClick } = props;
    return (
        <li className="website-li" onClick={handleClick}>
            <img src={img} className="website-img" />
            <span className="website-span">{title}</span>
            <p className="website-p">{desc}</p>
        </li>
    )
}

Index.propTypes = {
};

export default Index;
