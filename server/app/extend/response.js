'use strict';

module.exports = {
  set result(val) {
    if (val.hasOwnProperty('code') && val.hasOwnProperty('success')) {
      this.body = val;
    } else {
      const code = this.status === 404 ? 200 : this.status;
      this.body = {
        code,
        success: true,
        info: val,
      };
    }
  },
};
