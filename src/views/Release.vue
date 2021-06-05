<template>

<div class="main">

  <el-row :gutter="20">
    <el-col :span="18" :push="3">
    <el-card>
      <el-timeline :reverse="false">
        <el-timeline-item
          placement="top"
          v-for="(activity, index) in activities"
          :key="index"
          :type="activity.type"
          :timestamp="activity.timestamp">
          <el-card>
          <h4> {{ activity.title }} </h4>
          <p v-html="activity.content"></p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
    </el-col>
    
  </el-row>
</div><!-- end of template div-->

</template>

<script>
export default {
	name: 'Release',
  title: '发布日志',
  data() {
    return {
      reverse: true,
      activities: [{
        title: "v0.1",
        timestamp: '2020-x-x',
        content: '完成XX功能',
        
        type: 'primary'
      }, {
        title: "v0.0.1",
        timestamp: '2020-05-14',
        content: '完成基础页面'
      }, {
        title: "v0.0",
        timestamp: '2020-04-30',
        content: '构思<br/> \
        前端选型<br/> \
        后台结构<br/>'
      }]
    };
  }
};
</script>

<style scoped>

</style>
