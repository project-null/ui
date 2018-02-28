import React, {PropTypes} from 'react';

export default class Index extends React.Component {
    render() {
        const { visible,style,folderInfo,importSite,createSite,editFolder,deleteFolder} = this.props;
        return(visible || null) &&
            <ul className="context-menu" style={style}>
                <li className="context-menu--option" onClick={importSite}>导入站点</li>
                <li className="context-menu--option" onClick={createSite}>添加站点</li>
                <li className="context-menu--option" onClick={editFolder}>编辑文件夹</li>
                <li className="context-menu--option" onClick={deleteFolder}>删除文件夹</li>
            </ul>
    };
}

Index.propTypes = {
};
