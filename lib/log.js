export default function (...messages) {
  if (process.env.DEBUG) {
    console.log(...messages)
  }
}
