new Vue({
  el: '#order',
  data: {
    orderList: [],
    totalOrder: 0,
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getOrderList();
    })
  },
  methods: {
    getOrderList: function () {
      var _this = this;
      this.$http.get('data/cartData.json').then(function (res) {
        _this.orderList = res.data.result.list;
        _this.calcOrderMoney();
      })
    },
    calcOrderMoney: function () {
      var _this = this;
      _this.totalOrder = 0;
      this.orderList.forEach(function (item, index) {
        _this.totalOrder += item.productQuantity * item.productPrice;
      })
    }
  },
  computed: {}
});