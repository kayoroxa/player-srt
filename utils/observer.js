function Observer() {
  let nameObserver = ''

  const esperando = []

  function addEventListener(evento, func) {
    esperando.push({ evento, func: func, nameObserver })
  }

  async function notify(evento, params) {
    let result
    esperando.forEach(e => {
      if (e.evento === evento && e.nameObserver === nameObserver) {
        result = e.func(params)
      }
    })
    return result
  }

  function especifiqueObserver(name) {
    nameObserver = name
    return {
      addEventListener,
      on: addEventListener,
      notify,
    }
  }

  return especifiqueObserver
}
const obs = Observer()

module.exports = obs

//obs('video').notify('srcChange')
