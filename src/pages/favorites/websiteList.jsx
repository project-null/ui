import React, {PropTypes} from 'react';
import LazyLoad from 'react-lazyload';

const Index = (props) => {
    const { title, img, desc,label, handleClick } = props;
    return (
        <li className="website-li" onClick={handleClick}>
           <LazyLoad height={200} once={true} offset={100}>
             <img src={img} className="website-img" />
           </LazyLoad>

            <span className="website-span">{title}</span>
            <p className="website-p">{desc}</p>
        </li>
    )
}

Index.propTypes = {
};

export default Index;
