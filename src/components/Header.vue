<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div
			class="collapse-btn"
			@click="collapseChage"
		>
			<i
				v-if="!collapse"
				class="el-icon-s-fold"
			/>
			<i
				v-else
				class="el-icon-s-unfold"
			/>
		</div>
		<div class="logo">
			{{ logo_title }}
		</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 消息中心
				<div class="btn-bell">
					<el-tooltip
						effect="dark"
						:content="message?`有${message}条未读消息`:`消息中心`"
						placement="bottom"
					>
						<router-link to="/tabs">
							<i class="el-icon-bell" />
						</router-link>
					</el-tooltip>
					<span
						v-if="message"
						class="btn-bell-badge"
					/>
				</div> -->
				<!-- 用户头像 固定几种权限头像-->
				<div class="user-avator">
					<img :src="imgurl">
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown
					class="user-name"
					trigger="click"
					@command="handleCommand"
				>
					<span class="el-dropdown-link">
						{{ userInfo.username }}
						<i class="el-icon-caret-bottom" />
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								divided
								command="loginout"
							>
								退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>
<script>
import { reactive, onMounted, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { webtitle } from '@/settings'

export default {
	computed: {
		imgurl: function () {
			var level = JSON.parse(sessionStorage.getItem('userInfo')).level;
			if (level == "admin") {
				return require("@/assets/img/admin.jpg")
			} else if (level == "super_admin") {
				return require("@/assets/img/super.jpg")
			} else if (level == "verysuper_admin") {
				return require("@/assets/img/verysuper.jpg")
			} else {
				return require("@/assets/img/normal.jpg")
			}
		},
		logo_title: function() {
			return webtitle; // 与页面标题一致
		},
	},
	setup() {
	    const router = useRouter()
	    const store = useStore()
	    const state = reactive({
			fullscreen: false,
			message: 2,
		})
		
		const userInfo = computed(() => {
			return JSON.parse(sessionStorage.getItem('userInfo'));
		})
		const collapse = computed(() => {
			return store.state.system.collapse;
		})
			
		onMounted(() => {
			init()
		})
		
		const init = () => {
			// 小窗口默认折叠菜单
			if (document.body.clientWidth < 1280) {
				store.commit('system/hadndleCollapse', true);
			}
			window.onresize = () => {
				if (document.body.clientWidth < 1280) {
					store.commit('system/hadndleCollapse', true);
				} else {
					store.commit('system/hadndleCollapse', false);
				}
			}
		}
		
		// 用户名下拉菜单选择事件
		const handleCommand = async (command) => {
			if (command === 'loginout') {
				const res = await store.dispatch('user/logout', {})
				if (res){
					router.push('/login');
				}
			}
		}
		
		// 侧边栏折叠
		const collapseChage = () => {
			store.commit('system/hadndleCollapse', !collapse.value);
		}
		
		return {
		    ...toRefs(state),
			userInfo,
			collapse,
		    handleCommand,
			collapseChage
		}
	}
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
	margin-right: 5px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
