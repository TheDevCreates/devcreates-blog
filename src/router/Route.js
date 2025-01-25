async function Route(view) {
  // update the hash in the url
  window.location.hash = view
  Unload("Section")
  ProgressBar(25)

  // remove trailing slash if present
  if (view.endsWith('/')) {
    view = view.slice(0, -1)
  }

  // map the views to their sections
  const routes = {
    "": "./src/components/sections/RootSection.js",
    "#": "./src/components/sections/RootSection.js",
    "#blog": "./src/components/sections/BlogSection.js",
    "#about": "./src/components/sections/AboutSection.js",
    "#read": "./src/components/sections/ReadSection.js",
    "#read/": "./src/components/sections/ReadSection.js"
  }

  // define what happens after each section is loaded
  const routeHandler = {
    "": () => {
      App.innerHTML = `${RootSection()}`
      ModifyAppTitle("home")
      Effects()
      ProgressBar(100)
    },
    "#": () => {
      App.innerHTML = `${RootSection()}`
      ModifyAppTitle("home")
      Effects()
      ProgressBar(100)
    },
    "#blog": () => {
      App.innerHTML = `${BlogSection()}`
      ModifyAppTitle("posts")
      Effects()
      ProgressBar(100)
    },
    "#about": () => {
      App.innerHTML = `${AboutSection()}`
      ModifyAppTitle("about")
      Effects()
      ProgressBar(100)
    },
    "#read": async () => {
      ProgressBar(65)
      App.innerHTML = `${await ReadSection()}`
      Effects()
    },
    "#read/": async () => {
      ProgressBar(65)
      App.innerHTML = `${await ReadSection()}`
      Effects()
    }
  }

  // if the view matches, load the section
  if (routes[view]) {
    return Import(routes[view], "Section", routeHandler[view])
  }

  // if not found, show 404 page
  console.warn(`404: ${view} not found.`)
  return Import("./src/components/sections/NotfoundSection.js", "Section", function() {
    App.innerHTML = `${NotfoundSection()}`
    ModifyAppTitle("404")
    Effects()
    ProgressBar(100)
  })
}

// listen for changes in the url hash
window.addEventListener("hashchange", function() {
  Route(window.location.hash)
})

// add ripple effect to elements
function Effects() {
  const rippleSurface = Array.from(document.querySelectorAll('.ripple-surface'))
  rippleSurface.forEach(s => new mdc.ripple.MDCRipple(s))
}
