var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false,

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
    },
    selectedProduct: function (item) {
      if (typeof item.checked == 'undefined') {
        //1.全局注册
        // Vue.set(item,'checked',true);
        // 2.局部注册
        this.$set(item, 'checked', true);
      } else {
        item.checked = !item.checked;
      }
    },

    checkAll: function (flag) {
      this.checkAllFlag = flag;
      var _this=this;
      this.productList.forEach(function (item,index) {
          if (typeof item.checked == 'undefined') {
            _this.$set(item, 'checked', _this.checkAllFlag);
          } else {
            item.checked = _this.checkAllFlag;
          }
        }
      );
    },
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








