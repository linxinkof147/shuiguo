
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/Home/Home","pages/Cart/Cart","pages/My/My","pages/search/search","pages/Details/Details","pages/buy/buy","pages/login/login","pages/register/register","pages/order/order","pages/hot/hot","pages/Dddress/Dddress","pages/Setup/Setup","pages/Dddress/Addaddress/Addaddress","pages/Setup/personal/personal","pages/payment/payment"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#ff6a6c","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/Home/Home","iconPath":"static/images/tabbar/home.png","selectedIconPath":"static/images/tabbar/home-active.png","text":"首页"},{"pagePath":"pages/Cart/Cart","iconPath":"static/images/tabbar/cart.png","selectedIconPath":"static/images/tabbar/cart-active.png","text":"购物车"},{"pagePath":"pages/My/My","iconPath":"static/images/tabbar/user.png","selectedIconPath":"static/images/tabbar/user-active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Jiaoyun-mall","compilerVersion":"3.1.18","entryPagePath":"pages/Home/Home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/Home/Home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商城首页","navigationBarBackgroundColor":"#ffffff"}},{"path":"/pages/Cart/Cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/My/My","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#f4f4f4"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Details/Details","meta":{},"window":{"navigationBarTitleText":"商品详情页","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/buy/buy","meta":{},"window":{"navigationBarTitleText":"订单支付页面","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#f4f4f4"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登陆","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#f4f4f4"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"全部订单","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/hot/hot","meta":{},"window":{"navigationBarTitleText":"热门推荐","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Dddress/Dddress","meta":{},"window":{"navigationBarTitleText":"收获地址","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Setup/Setup","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Dddress/Addaddress/Addaddress","meta":{},"window":{"navigationBarTitleText":"增加地址","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Setup/personal/personal","meta":{},"window":{"navigationBarTitleText":"个人资料","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/payment/payment","meta":{},"window":{"navigationBarTitleText":"支付","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
