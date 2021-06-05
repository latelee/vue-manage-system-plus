<template>
    <div class = "animated fadeIn">

                <h3>要做的事，备忘</h3>
                <p>
                    后台连接，使用golang实现。
                    登录，权限，先简单的
                    输入文本框，匹配。
                    穿梭框，即将左边值移到右边
                    上传功能

<el-divider></el-divider>

布局知识点：
某元素，通过 style="margin-left: -15px;" 靠左靠右（微调）
表单对齐，设置样式，如
.el-input {</p>
                
    width: 160px;
}
.el-select {
    width: 160px;
}
<div class="headContainer">
    
</div>
<el-divider><i class="el-icon-mobile-phone"></i></el-divider>
使用自定义的iconfont图标
<i class="iconfont icon-lujing1"></i>
<el-divider></el-divider>

    开发备注：
    图标：登录 https://www.iconfont.cn/，搜索，添加项目，下载本地。解压放到src/asserts/icon目录中。
    在main.js中引用 import './assets/icon/iconfont.css'
    使用：<i class="iconfont icon-xxx"></i>
    </div>
    
    <Table :columns="columns1" :data="data1"></Table>

<el-divider></el-divider>

    表格：
    在el-table中添加 stripe 即为斑马纹显示，指定 height 的值，即固定头部（表格数量多时才有效果）
    在某列中指定 fixed，即固定列
    可设置筛选，有些地方有用
    数值表尾合计
        有对话框，对于表格删除，可以双重提示。
        <el-table
          :data="tableData"
          stripe
          max-height="250"
          style="width: 100%">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
          fixed
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
                prop="province"
                label="省份"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="120">
              </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="600">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
        </el-table>


    
    <h2>抽屉测试</h2>
    
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
    
    
    <el-div></el-div>
    
    <h2>回到顶部测试</h2>
    <el-backtop target=".headContainer" :bottom="100">
        <div
          style="{
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0,0,0, .12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }"
        >
          UP
        </div>
      </el-backtop>
      
</template>

<script>
    export default {
        data () {
            return {
                // 抽屉测试
                drawer: false,
                
                // 下面是表格的数据
                tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        }
    }
</script>