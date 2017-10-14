new Vue({
  el: '.container',
  data: {
    addressList: [],
    showSize: 3,

  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
    })
  },
  methods: {
    getAddressList: function () {
      var _this = this;
      this.$http.get('data/address.json').then(function (response) {
        var res = response.data;
        if (res.status == '0') {
          _this.addressList = res.result;
        }

      })
    }
  },
  computed: {},
  filter: {
    showAmount: function (nums, showSize) {
      return nums.slice(0, showSize);
    }
  }
});