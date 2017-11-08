export default (fn, freq) => {
    let timer = false;
    freq = freq !== undefined ? freq : 200;

    return (...args) => {
        let that = this;

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = false;
            fn.apply(that, args);
        }, freq);
    };
};
