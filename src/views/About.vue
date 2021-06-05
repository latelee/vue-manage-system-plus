<template>
    <div class="home-container">
        <div class="about">
            <h1>本系统要实现的功能</h1>
        </div>
        
        布局相关的：
        tab切换，不重新加载数据。
        权限管理，动态路由，不同用户。
        
        其它：
        记录重要的操作日志（特别是涉及写数据库的，高级权限查看）  


    </div>
</template>

<script>
  export default {
    name: 'About',
    title: '关于',
    level: 3,
  };
</script>