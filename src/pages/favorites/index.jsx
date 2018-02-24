import React, {PropTypes} from 'react';
// import { Button,Icon} from 'antd';
import FavoritesModel from '$models/favorites';
import WebsiteLi from './websiteList';
import './index.less';

export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      website:[],
      img:[],
    }
  }

  componentDidMount(){
      // this.getAllWebsite();
      this.getImg();
      this.test();
  }

  getAllWebsite(){
    FavoritesModel.getAllWebsite().then(response=>{
      console.log(response.data,'resss');
      this.setState({website:response.data.message});
    })
  }

  test(){
    FavoritesModel.test().then(response=>{
      console.log(response.data.data.favorites,'1111111111111111');
      this.setState({website:response.data.data.favorites});
    })
  }

  getImg(){
    FavoritesModel.getImg().then(response=>{
      const data = response.data.data;
      let img = [];
      data.map(ele=>{
        img.push(ele.image_url);
      })
      this.setState({img});
    })
  }

  handleClick(url){
    console.log(url.includes('http'),'asdasdasds')
    if(url.includes('http') || url.includes('https')){
      const otherWindow = window.open(url);
      otherWindow.opener = null;
    }else {
      alert('地址错误')
    }
  }

  render() {
    const {website,img} = this.state;
    console.log(img.length)
    if(!!website.length){
      return (
        <div className="website-wrap">
          <ul className="website-ul">
            {
              website.map((ele,index)=>{
                return <WebsiteLi key={ele._id} title={ele.name} img={img[index]} desc={ele.desc} label={ele.label} handleClick={()=>{this.handleClick(ele.url)}}/>
              })
            }
          </ul>
        </div>
      )
    }else {
      return (
        <div className="website-null-wrap">
          <div className="website-null-content">
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

index.propTypes = {
};
