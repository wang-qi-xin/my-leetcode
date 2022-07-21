class Watcher {
  watchers: any[] = []
  
  /**
   * 处理数据
   * @param watcherFn 监听函数
   * @param key 监听对象的key
   */
  addWatcher(watcherFn, key) {
    this._addWatcherProp({
      fn: watcherFn,
      key
    })
  }
  
  /**
   * 运行监听对象key的监听函数。(供外部使用)
   * @param key 监听对象的key
   * @param newValue 监听对象的新值
   * @param oldValue 监听对象的旧值
   */
  invoke(key, newValue, oldValue) {
    this.watchers.forEach(item => {
      if (item.key === key) {
        item.fn(newValue, oldValue)
      }
    })
  }
  private _addWatcherProp(watchProp) {
    this.watchers.push(watchProp)
  }
}

class Vue{
  $watch: any
  $data: any
  constructor(option){
    const {data, computed, watch} = option
    // 将数据对象挂载到vue实例的$data中。
    this.$data = data()
    this.init(this, computed, watch)
  }
  
  /**
   * 初始化响应式数据
   * @param vm vue实例
   * @param computed 计算属性方法对象
   * @param watch 监听方法对象
   */
  init(vm, computed, watch) {
    this.initData(vm)
    const watcherIns = this.initWatcher(vm, watch)
    this.$watch = watcherIns.invoke.bind(watcherIns)
    
  }
  
  /**
   * 初始化响应式属性
   * @param vm vue实例
   */
  initData(vm){
    /**
     * 修改key值时,运行对应的监听方法。
     * @param key 
     * @param newValue 
     * @param oldValue 
     */
    const __set__ = (key, newValue, oldValue) => {
      this.$watch(key, newValue, oldValue)
    }
    this.reactive(vm, __set__)
  }
  
  /**
   * 数据劫持，响应式数据
   * @param vm vue实例
   * @param __set__ 响应方法
   */
  reactive(vm, __set__){
    const _data = vm.$data
    for(let key in _data){
      // 把vm.$data上的属性，全部挂载到vm上。并且在修改时触发监听函数。
      Object.defineProperty(vm, key, {
        get() {
          return _data[key]
        },
        set(newValue) {
          const oldValue = _data[key]
          _data[key] = newValue
          __set__(key, newValue, oldValue)
        }
      })
    }
  }
  
  /**
   * 初始化监听器
   * @param vm vue实例
   * @param watch 监听函数对象
   * @returns 
   */
  initWatcher(vm, watch){
    const watcherIns = new Watcher()
    for(let key in watch){
      watcherIns.addWatcher(watch[key].bind(vm), key)
    }
    return watcherIns
  }
}
const vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2,
    }
  },
  computed: {
    total() {
      console.log('Computed')
      return this.a + this.b
    },
  },
  watch: {
    total(newValue, oldValue) {
      console.log('total', newValue, oldValue)
    },
    a(newValue, oldValue) {
      console.log('a', newValue, oldValue)
    },
    b(newValue, oldValue) {
      console.log('b', newValue, oldValue)
    },
  },
})
// console.log(vm['a'])
vm['a'] = 22

