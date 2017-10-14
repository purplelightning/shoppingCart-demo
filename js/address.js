new Vue({
  el: '.container',
  data: {
    addressList: [],
    showSize: 3,
    count: 0,
    shippingMethod: 1,
    currentIndex: 0,
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
    })
  },
  methods: {
    //获取地址
    getAddressList: function () {
      var _this = this;
      this.$http.get('data/address.json').then(function (response) {
        var res = response.data;
        if (res.status == '0') {
          _this.addressList = res.result;
        }

      })
    },
    //显示/收起更多地址
    showMoreItem: function () {
      if (this.count % 2 == 0) {//判断显示还是收起,与jquery中的toggle一样
        this.showSize = this.addressList.length;
      } else {
        this.showSize = 3;
      }
      this.count++;
      this.getAddressList();
    },
    //设置默认地址
    setDefault: function (addressId) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId == addressId) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      })
    }
  },
  computed: {
    //展示一定数目的地址
    filterAddress: function () {
      return this.addressList.slice(0, this.showSize);
    }
  },

});