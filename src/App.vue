<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkedChangeById(item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDownLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    // 展开运算符
    ...mapState(['list', 'inputValue', 'nextId', 'viewKey']),
    ...mapGetters(['unDownLength', 'infoList'])
  },
  data() {
    return {}
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['getList']),
    ...mapMutations([
      'setInputValue',
      'addItem',
      'removeItem',
      'changeDoneById',
      'cleanDone',
      'changeViewKey'
    ]),
    // 监听文本框内容变化
    handleInputChange(e) {
      this.setInputValue(e.target.value)
    },
    // 像列表中新增 item 项
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      const item = {
        id: this.nextId,
        info: this.inputValue.trim(),
        done: false
      }
      this.addItem(item)
    },
    // 根据删除列表中的某一项
    deleteItem(id) {
      this.removeItem(id)
    },
    checkedChangeById(id) {
      this.changeDoneById(id)
    },
    // 清楚列表中已完成的项
    clean() {
      this.cleanDone()
    },
    // 修改页面上展示的列表数据
    changeList(key) {
      this.changeViewKey(key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
