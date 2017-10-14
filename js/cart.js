var vm = new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    totalPrice: 0,
    checkAllFlag: false,
    showAlert:false,
    curProduct:'',

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
        // _this.totalMoney = res.data.result.totalMoney;
      })
    },
    //改变商品数量
    changeMoney: function (pro, way) {
      if (way < 0) {
        pro.productQuantity--;
      } else {
        pro.productQuantity++;
      }
      if (pro.productQuantity < 1) {
        pro.productQuantity = 1;
      }
      this.calcTotalMoney();
    },
    //单选
    selectedProduct: function (item) {
      if (typeof item.checked == 'undefined') {
        //1.全局注册
        // Vue.set(item,'checked',true);
        // 2.局部注册
        this.$set(item, 'checked', true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalMoney();
    },

    //全选
    checkAll: function (flag) {
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function (item, index) {
        if (typeof item.checked == 'undefined') {
          _this.$set(item, 'checked', _this.checkAllFlag);
        } else {
          item.checked = _this.checkAllFlag;
        }
      });
      this.calcTotalMoney();
    },
    //计算选中商品的总金额
    calcTotalMoney: function () {
      var _this=this;
      this.totalPrice = 0;
      this.productList.forEach(function (item, index) {
        if (item.checked) {
          _this.totalPrice += item.productPrice * item.productQuantity;
        }
      })
    },
    delConfirm:function (item) {
      this.curProduct=item;
      this.showAlert=true;
    },
    delProduct:function () {
      var index=this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.showAlert=false;
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








