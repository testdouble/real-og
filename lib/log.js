module.exports = function (...messages) {
  if (process.env.DEBUG) {
    console.log(...messages)
  }
}
