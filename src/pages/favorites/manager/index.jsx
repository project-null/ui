import React, {PropTypes} from 'react';
import FavoritesModel from '$models/favorites';
import FolderLi from './folderList';
import FolderModal from './folderModal';
import ImportModal from './importModal';
import WebsiteModal from './websiteModal';
import ContentMenu from './contentMenu';
import { notification } from 'antd';
import './index.less';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder:[],
      visible:false,
      is_menu_show:false,
      style:{},
      folderInfo:{},
      flag:false,
      is_import_show:false,
      is_create_show:false
    }
  }

  componentDidMount(){
      this.getFolder();
      // this.getImg();
      document.addEventListener('click', this._handleClick.bind(this));
      document.addEventListener('scroll', this._handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClick.bind(this));
    document.removeEventListener('scroll', this._handleScroll.bind(this));
  }
  // getFavorites(){
  //   const query = {
  //     query:`query{favoritesFolder {_id, name,desc,order,parentID }}`
  //   };
  //   FavoritesModel.getFavorites(query).then(response=>{
  //     this.setState({folder:response.data.data.favoritesFolder});
  //   })
  // }

  getFolder(){
    FavoritesModel.getFolder().then(response=>{
      const data = response.data;
      this.setState({folder:data});
    })
  }

  createModal(){
    this.setState({
      visible: true
    });
    const body = {
      parentID:'root',
      name:'default',
      desc:'无'
    }
    this.form.setFieldsValue(body);
  }

  createFolder(){
    const { flag ,folderInfo} = this.state;
    this.form.validateFields((err, values) => {
      if (!err) {
        const body = {
          name: values.name,
          desc: values.desc,
          order: 0,
          parentID: values.parentID
        };
        if(!flag){
          FavoritesModel.createFolder(body).then(response =>{
            setTimeout(() => {
              this.setState({
                visible: false
              });
              this.getFolder();
            }, 500);
          }).catch(e=>{
            notification.error({
              message:e.response.data.code,
              description:e.response.data.message
            });
          })
        }else {
          const id = folderInfo._id;
          FavoritesModel.editFolder(id,body).then(response =>{
            setTimeout(() => {
              this.setState({
                visible: false
              });
              this.getFolder();
            }, 500);
          }).catch(e=>{
            notification.error({
              message:e.response.data.code,
              description:e.response.data.message
            });
          })
        }
      }
    });
  }

  handleCancel(){
    this.setState({
     visible: false,
     flag:false
    });
  }

   onContextMenu(ele,e){
      e.preventDefault();
      const clickX = e.clientX;
      const clickY = e.clientY;
      this.setState({
        is_menu_show:true,
        style:{
          left:`${clickX - 230}px`,
          top: `${clickY - 100}px`
        },
        folderInfo:ele,
        flag:true
      });
      console.log(ele)
   }

   _handleClick(event) {
       const { is_menu_show } = this.state;
       const wasOutside = !(event.target.contains === this.contentmenu);
       if (wasOutside && is_menu_show) {this.setState({ is_menu_show: false})};
   };

   _handleScroll () {
       const { is_menu_show } = this.state;
       if (is_menu_show) {this.setState({ is_menu_show: false })};
   };

   deleteFolder(){
     const { folderInfo } = this.state;
     console.log(folderInfo)
     FavoritesModel.deleteFolder(folderInfo._id).then(response=>{
      setTimeout(() => {
       this.setState({ is_menu_show: false })
        this.getFolder();
      }, 500);
     }).catch(e=>{
       notification.error({
         message:e.response.data.code,
         description:e.response.data.message
       });
     })
   }
   editFolder(){
      const { folderInfo } = this.state;
      const body = {
        parentID:folderInfo.parentID,
        name:folderInfo.name,
        desc:folderInfo.desc
      }
     this.form.setFieldsValue(body);
     this.setState({visible:true})
   }
   importSite(){
     this.setState({is_import_show:true});
   }
   handleImportCancel(){
     this.setState({is_import_show:false});
   }

   onImport(filename){
     console.log(filename);
     const { folderInfo } = this.state;
     filename.map(ele=>{
       const body = {
          filename: ele,
          folderID: folderInfo._id
       }
       FavoritesModel.importWebsite(body).then(response=>{
         setTimeout(() => {
           this.setState({ is_import_show: false })
           this.getFolder();
         }, 500);
       }).catch(e=>{
         notification.error({
           message:e.response.data.code,
           description:e.response.data.message
         });
       })
     })
   }

   createSite(){
     this.setState({is_create_show:true});
   }

    createWebsite(){
        const { folderInfo } = this.state;
        this.siteform.validateFields((err, values) => {
          if(!err){
            const body = {
              name: values.name,
              desc: values.desc,
              label: [
                null
              ],
              iconURL: "",
              url: values.url,
              folderID:  folderInfo._id
            }
            FavoritesModel.createWebsite(body).then(response=>{
              setTimeout(() => {
                this.setState({ is_create_show: false });
                this.getFolder();
              }, 500);
            }).catch(e=>{
              notification.error({
                message:e.response.data.code,
                description:e.response.data.message
              });
            })
          }
        })
    }

   handleWebsiteCancel(filename){
     this.setState({is_create_show:false});
   }

  render() {
    const {folder,visible,is_menu_show,style,folderInfo,flag,is_import_show,is_create_show} = this.state;
    if(folder && folder.length){
      return (
        <div className="folder-wrap">
          <ul className="folder-ul">
            {
              folder.map((ele,index)=>{
                return <FolderLi key={ele._id} title={ele.name}  handleClick={()=>{this.handleClick(ele.url)}} onContextMenu={(e)=> {this.onContextMenu(ele,e)}}/>
              })
            }
            <li className="folder-li folder-li-puls" onClick={this.createModal.bind(this)}>
              +
            </li>
          </ul>
          <ContentMenu
             ref={ref => {this.contentmenu = ref}}
             visible={is_menu_show}
             style={style}
             importSite={this.importSite.bind(this)}
             createSite={this.createSite.bind(this)}
             editFolder={this.editFolder.bind(this)}
             deleteFolder={this.deleteFolder.bind(this)}
          />
        <FolderModal title={flag ? '编辑文件夹' : '新建文件夹'}
           ref={ref => {this.form = ref}}
           visible={visible}
           onOk={this.createFolder.bind(this)}
           onCancel={this.handleCancel.bind(this)}
        />
        <ImportModal
            title="导入站点"
            visible={is_import_show}
            onOk={this.onImport.bind(this)}
            onCancel={this.handleImportCancel.bind(this)}
        />
      <WebsiteModal
        title="添加站点"
        ref={ref => {this.siteform = ref}}
        visible={is_create_show}
        onOk={this.createWebsite.bind(this)}
        onCancel={this.handleWebsiteCancel.bind(this)}
      />
        </div>
      )
    }else {
      return (
        <div className="folder-null-wrap">
          <div className="folder-null-content">
            <i className="fa fa-inbox fa-5x"></i>
            <p>
              <a onClick={this.createModal.bind(this)}>
                暂无数据,添加文件夹
              </a>
            </p>
          </div>
          <FolderModal title="添加文件夹"
             ref={ref => {this.form = ref}}
             visible={visible}
             onOk={this.createFolder.bind(this)}
             onCancel={this.handleCancel.bind(this)}
          />
        </div>
      );
    }
  }
}

Index.propTypes = {
};
