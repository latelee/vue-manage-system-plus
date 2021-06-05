参考 https://github.com/liyu022/vue-manage-system-plus  
 其参考 https://github.com/lss5270/vue-manage-system-plus  
   其参考：https://github.com/lin-xin/vue-manage-system  
   

## 修改点
去掉eslint检查。  
左侧菜单栏默认折叠。  

## 笔记
需配置后台使用，mock还不懂用

### 菜单权限
按用户名，返回不同的权限等级，显示不同菜单。完成  
通过权限等级判断，即每个页面有等级，与返回的用户权限对比。数字越小，权限越大。  
权限0可访问权限1、2、3的页面，反之提示403。  

### 配置
标题配置、端口配置，统一放到src/settings.js（参考vue-elemnet-admin）中。  


## 功能
调试通过 OK
动态菜单 OK  
背景图片 OK
不同用户，头像不同。完成。  
密码显示小眼睛
用户名token/uid等

## 小问题
登录界面输入用户名按Tab没有定位到密码行。  
打包后的dist，放到gin中，直接输入URL，无法加载页面，如果是站内跳转，则可以。URL完全相同。  
