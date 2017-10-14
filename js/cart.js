var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
  },
  mounted: function () {//2.0使用,不使用ready
    this.$nextTick(function () {
      // vm.cartView();
      this.cartView();
    })
  },
  methods: {
    cartView: function () {
      var _this = this;
      // ES6写法:
      // this.$http.get('data/cartData.json', {'id': 123}).then(res => {
      //   _this.productList = res.data.result.list;
      //   _this.totalMoney = res.data.result.totalMoney;
      // });
      this.$http.get('data/cartData.json', {'id': 123}).then(function (res) {
        _this.productList = res.data.result.list;
        _this.totalMoney = res.data.result.totalMoney;
      })
    },
    changeMoney: function (pro, way) {
      if (way < 0) {
        pro.productQuantity--;
      } else {
        pro.productQuantity++;
      }
      if (pro.productQuantity < 1) {
        pro.productQuantity = 1;
      }
    }
  },
  //局部过滤器
  filters: {
    formatMoney: function (value) {
      return '￥ ' + value.toFixed(2);
    }
  }
});
//全局过滤器
Vue.filter('money', function (value, type) {
  return value.toFixed(2) + type;
});








