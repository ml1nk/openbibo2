export default (fn, freq) => {
    let call = false;
    let timer = false;
    freq = freq !== undefined ? freq : 200;
    return (...args) => {
        let that = this;
        function timeout() {
          fn.apply(that, call);
          call = false;
          timer = setTimeout(() => {
                timer = false;
                if (call) {
                  timeout();
                }
          }, freq);
        }
        call = args;
        if (!timer) {
          timeout();
        }
    };
};
