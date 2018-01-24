import React from 'react';

import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";


export default class Index extends React.Component {
    constructor() {
        super();
        
        let encrypted = SHA256('hello world');        
    }
    render() {
        return (
            <div>p1</div>
        );
    }
}