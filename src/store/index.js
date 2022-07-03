import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 这是文本框的内容
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为 store 中的 inputValue 赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项目
    addItem(state, val) {
      state.list.unshift(val)
      state.nextId += 1
      state.inputValue = ''
    },
    // 根据删除列表中的某一项
    removeItem(state, id) {
      // 根据 id 查找对应项的索引
      const i = state.list.findIndex(item => item.id === id)
      // 根据索引，删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 根据 Id 改变 Item 项的选中状态
    changeDoneById(state, id) {
      state.list.some(item => {
        if (item.id === id) {
          item.done = !item.done
          return true
        }
      })
    },
    // 清楚已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(item => !item.done)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    async getList(context) {
      const { data: res } = await axios.get('/list.json')
      context.commit('initList', res)
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDownLength(state) {
      return state.list.filter(item => !item.done).length
    },
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(item => !item.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(item => item.done)
      }
      return state.list
    }
  }
})
