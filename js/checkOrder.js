new Vue({
  el:'#order',
  data:{
    orderList:[],

  },
  mounted:function () {
    this.$nextTick(function () {
      this.getOrderList();
    })
  },
  methods:{
    getOrderList:function () {
      var _this=this;
      this.$http.get('data/cartData.json').then(function (res) {
        _this.orderList=res.data.result.list;
      })
    }
  },
  computed:{

  }
});