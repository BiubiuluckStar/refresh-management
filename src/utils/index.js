// 公共的方法文件

// 处理html标签显示界面
export function removeHTMLTag(htmlStr) {
  let html = htmlStr
    .replace(/<img.*?>/g, "[图片]")
    .replaceAll(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "");
  return html;
}
import {cloneDeep}from "lodash";
// 定义菜单匹配规则  beforMenu前端路由文件,lastMenu后端路由文件
export function rulesMenu(beforMenu,lastMenu){
  // 定义匹配好的菜单路由容器
  let menuArr=[]
  // 深拷贝：JOSN.parse(JSON.stringify()) 不能适于路由，会破坏函数
  //  使用Loadsh中的cloneDeep进行深拷贝
  let upMenu = cloneDeep(beforMenu)
  upMenu.forEach(item => {
  lastMenu.forEach(ele=>{
    // 处理第一层的数据
    if(ele.name == item.meta.title){
      // menuArr.push(item)
    //  判断下一级菜单，是否有children
    if(ele.children && ele.children.length>0){
      // 重写前端children路由文件
      item.children = rulesMenu(item.children,ele.children)
    }
      menuArr.push(item)
    }
  })
});
return menuArr
}