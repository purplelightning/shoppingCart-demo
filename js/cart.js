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
        }
      )
    }
  },

});
Vue.filter = function (value) {
  return value + " 元";
};