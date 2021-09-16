import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX',
		/* 登陆的状态 */
		LoginOrNot:uni.getStorageSync('storage_key')||false,
		/* token值 */
		token: uni.getStorageSync('token') || '',
		/* 用户的基本信息 */
		list:JSON.parse(uni.getStorageSync('list') || '{}'),
		/* 购物车 */
		 // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]'),
		tocart:'',
		/* 收货地址 */
		Address: JSON.parse(uni.getStorageSync('Address') || '[]'),
		/* 添加收货地址 */
		harvest: JSON.parse(uni.getStorageSync('address') || '[]'),
    },
	mutations:{
		/* 添加收货地址 */
		/* Addharvest(state,harl){
		  state.harvest.push(harl)
			
			console.log(state.harvest)
			this.commit("openharvest")
		},
		openharvest(){
			uni.setStorageSync('harvest', JSON.stringify(state.harvest))
		}, */
		/* 收货地址 */
		Addressopen(state, add){
			 state.Address = add
			this.commit("saveAddressopen")
		},
		saveAddressopen(state){
			uni.setStorageSync('Address', JSON.stringify(state.Address))
		},
		/* 直接购买 */
		addCart(state, goods) {
		    state.tocart = [goods]
		},
		/* 添加购物车 */
		addToCart(state, goods) {
		   // 根据提交的商品的Id，查询购物车中是否存在这件商品
		   // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
		   const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		   if (!findResult) {
		      // 如果购物车中没有这件商品，则直接 push
		      state.cart.push(goods)
		   } else {
		      // 如果购物车中有这件商品，则只更新数量即可
		      findResult.goods_count++
		   }
		   // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
		   this.commit('saveToStorage')
		   /* console.log(state.cart) */
		   
		},
		saveToStorage(state){
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		saveToStoragopen(state){
			uni.removeStorageSync('cart');
			uni.removeStorage({ key: 'cart',});
			state.cart = []
		},
			// 更新购物车中商品的数量
			updateGoodsCount(state, goods) {
			  // 根据 goods_id 查询购物车中对应商品的信息对象
			  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			  if(findResult) {
			    // 更新对应商品的数量
			    findResult.goods_count = goods.goods_count
			    // 持久化存储到本地
			    this.commit('saveToStorage')
			  }
			},
			// 根据 Id 从购物车中删除对应的商品信息
			removeGoodsById(state, goods_id) {
			  // 调用数组的 filter 方法进行过滤
			  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			  // 持久化存储到本地
			  this.commit('saveToStorage')
			},
		/* 登陆是否 */
		logionyes(state,loign){
			state.LoginOrNot = loign
			this.commit("saveLoginOrNot")
		},
		saveLoginOrNot(state) {
		    uni.setStorageSync('storage_key', state.LoginOrNot)
		  },
		   /* 用户基本信息储存 */
		  icn(state,kk){
		  	state.list = kk
		  	console.log(state.list)
		  	this.commit("saveUserInfoToStorage")
		  },
		saveUserInfoToStorage(state) {
		    uni.setStorageSync('list', JSON.stringify(state.list))
		  },
		  /* token */
		  updateToken(state, token) {
		      state.token = token
		      // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
		      this.commit('saveTokenToStorage')
		    },
		  saveTokenToStorage(state) {
		      uni.setStorageSync('token', state.token)
		    },
			 /* 加减购物车数量 */
			 /* 地址 */
			updateAddress(state, Address) {
			    state.Address = Address
			    // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			    this.commit('saveAddressToStorage')
			  },
			saveAddressToStorage(state) {
			    uni.setStorageSync('Address', state.Address)
						   console.log(state.Address)
			  },
	},
	
	checkedGoodsAmount(state){
		return state.cart.filter(x => x.goods_state)
		                 .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
	}
})

export default store