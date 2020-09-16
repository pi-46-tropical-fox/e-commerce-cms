const format = (num) => {
    let output = `Rp${new Intl.NumberFormat().format(num)},00`
    return output
}

module.exports = {
    format
}