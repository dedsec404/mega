(function () {
  var header = document.createElement('h1')
  header.textContent = 'Direct MEGA'
  document.body.appendChild(header)

  var installingMessage = document.createElement('p')
  installingMessage.textContent = 'Please wait...'
  window.installingMessage = installingMessage
  document.body.appendChild(installingMessage)

  var location = window.location
  var identifier = (location.hash.length > 2 ? location.hash : location.search || '').substr(1)
  var hasFile = identifier.startsWith('!') || identifier.startsWith('F!')

  var compatible = typeof ReadableStream === 'function'
  if (compatible) {
    try {
      ;(new window.ReadableStream()).getReader().read()
    } catch (e) {
      compatible = false
    }
  }

  if (navigator.serviceWorker && compatible) {
    navigator.serviceWorker.register('sw.js', {scope: '.'})
    .then(navigator.serviceWorker.ready)
    .then(function () {
      if (hasFile) {
        location.href = location.pathname + '?' + identifier
      } else {
        location.href = 'https://github.com/qgustavor/direct-mega#direct-mega'
      }
    }, fallback)
  } else if (hasFile) {
    fallback()
  } else {
    location.href = 'https://github.com/qgustavor/direct-mega#direct-mega'
  }
  function fallback () {
    var script = document.createElement('script')
    script.src = 'fallback.js'
    document.head.appendChild(script)
  }
}())
