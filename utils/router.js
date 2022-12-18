const joinPath = require('path').join

function Route() {
  const currentRoute = window.location.hash.slice(1)

  return {
    currentRoute,
    goTo: (route, absolute = false) => {
      console.log('goTo', route)
      absolute
      const path = absolute
        ? `file://${joinPath(__dirname, '../pages', `${route}/index.html`)}`
        : `file://${joinPath(route)}`

      window.location.href = path
    },
  }
}

const route = Route()

module.exports = route
