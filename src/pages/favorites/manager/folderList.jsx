import React, {PropTypes} from 'react';

const Index = (props) => {
    const { title, img, desc, handleClick,onContextMenu } = props;
    return (
        <li className="folder-li" onClick={handleClick} onContextMenu={onContextMenu}>
            <img src="/static/images/timg.jpeg" className="folder-img" />
            <span className="folder-span">{title}</span>
        </li>
    )
}

Index.propTypes = {
};

export default Index;
