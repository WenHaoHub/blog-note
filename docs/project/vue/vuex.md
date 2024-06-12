```js
import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    project,
  },
})

export default store
```

```js
export default {
  namespaced: true,
  state: {
    id: 0,
  },
  getters: {
    year: (state) => state.tabsData[state.id].year,
  },
  mutations: {
    SET_id: (state, val) => {
      state.id = val
    },
  },
  actions : {
    async getDetail({ commit }, data) {
      //发起有ids 审核有businessId
      let results= await ajax();

        commit('SET_id', results);

    }
  };
}
```

```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('dialog')

export default {
  computed: {
    ...mapGetters(['watchTime']),

    ...mapState(['showDialog1']),
  },
  mounted() {
    this.$store.dispatch('income/getDetail', this.$route)
    let id = this.$store.state.income.id
  },
  methods: {
    ...mapMutations(['OPEN_dialog1', 'CLOSE_dialog1', 'CLOSE_dialog2', 'CLOSE_date_dialog']),
  },
}
```
