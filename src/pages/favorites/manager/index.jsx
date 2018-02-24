import React, {PropTypes} from 'react';
import FavoritesModel from '$models/favorites';
import FolderLi from './folderList';
import './index.less';

export default class AA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder:[]
    }
  }

  componentDidMount(){
      this.getAllFolder();
      // this.getImg();
  }

  getAllFolder(){
    FavoritesModel.getAllFolder().then(response=>{
      console.log(response.data,'resss');
      this.setState({folder:response.data});
    })
  }

  render() {
    const {folder} = this.state;
    if(!!folder.length){
      return (
        <div className="folder-wrap">
          <ul className="folder-ul">
            {
              folder.map((ele,index)=>{
                return <FolderLi key={ele._id} title={ele.name}  handleClick={()=>{this.handleClick(ele.url)}}/>
              })
            }
          </ul>
        </div>
      )
    }else {
      return (
        <div className="folder-null-wrap">
          <div className="folder-null-content">
            <i className="fa fa-inbox fa-5x"></i>
            <p>
              <a onClick={()=>{this.props.history.push('/pages/favorites/manager');}}>
                暂无数据,添加网址
              </a>
            </p>
          </div>
        </div>
      );
    }
  }
}

AA.propTypes = {
};
