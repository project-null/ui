import React, {PropTypes} from 'react';
// import { Button,Icon} from 'antd';
import FavoritesModel from '$models/favorites';
import WebsiteLi from './websiteList';
import MyJRoll from 'react-roll-container'
import './index.less';

export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      website:[],
      img:[],
      height:'100vh'
    }
  }

  componentDidMount(){
      // this.getAllWebsite();
      this.getFavorites().then(response=>{
        // console.log(response,'resss');
        if(response.length){
          this.setState({website:response});
          const params = {
            rn:response.length,
            tag1:'宠物',
            tag2:'全部',
            ftags:'气质'
          };
          // this.getImg(params);
        }
      })
  }



  getFavorites(){
    const query = {
      query:`query{favorites {_id, name,desc,iconURL,url,folderID }}`
    };
    return FavoritesModel.getFavorites(query).then(response=>{
        return response.data.data.favorites;
    })
  }

  getImg(params){
    FavoritesModel.getImg(params).then(response=>{
      const data = response.data.data;
      let img = [];
      data.map(ele=>{
        img.push(ele.image_url);
      })
      this.setState({img});
    })
  }

  handleClick(url){
    if(url.includes('http') || url.includes('https')){
      const otherWindow = window.open(url);
      otherWindow.opener = null;
    }else {
      const otherWindow = window.open(`http://${url}`);
      otherWindow.opener = null;
    }
  }

  render() {
    const {website,img,height} = this.state;
    console.log(img.length)
    if(!!website.length){
      return (
        <MyJRoll height={height + 'px'} bgColor={'#fff'}>
          <div className="website-wrap">
            <ul className="website-ul">
              {
                website.map((ele,index)=>{
                  return <WebsiteLi key={ele._id} title={ele.name} img={img[index]} desc={ele.desc} label={ele.label} handleClick={()=>{this.handleClick(ele.url)}}/>
                })
              }
            </ul>
          </div>
        </MyJRoll>
      )
    }else {
      return (
        <div className="website-null-wrap">
          <div className="website-null-content">
            <i className="fa fa-inbox fa-5x"></i>
            <p>
              <a onClick={()=>{this.props.history.push('/pages/favorites/manager');}}>
                暂无数据,添加站点
              </a>
            </p>
          </div>
        </div>
      );
    }
  }
}

index.propTypes = {
};
