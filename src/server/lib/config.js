const path = require('path');

function rswitch(primary, fallback) {
    try {
        return require(path.join(__dirname,"..","..","..",primary));
    } catch (e) {
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
            return require(path.join(__dirname,"..","..","..",fallback));
        else
            throw e;
    }
}

module.exports = rswitch("config.json", "config.sample.json");