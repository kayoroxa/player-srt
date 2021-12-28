function Observer() {
  let nameObserver = ''

  const esperando = []

  function addEventListener(evento, func) {
    esperando.push({ evento, func, nameObserver })
  }

  function notificar(evento, params) {
    esperando.forEach(e => {
      if (e.evento === evento && e.nameObserver === nameObserver) {
        e.func(params)
      }
    })
  }

  function especifiqueObserver(name) {
    nameObserver = name
    return {
      addEventListener,
      on: addEventListener,
      notificar,
    }
  }

  return especifiqueObserver
}
const obs = Observer()
