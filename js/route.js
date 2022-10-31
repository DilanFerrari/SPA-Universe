const homeNav = document.querySelector("#homeNav")
const aboutNav = document.querySelector("#aboutNav")
const explorationNav = document.querySelector("#explorationNav")
const body = document.querySelector('body')

export class Router {
    routes = {} 
  
    add(routeName, page) {
      this.routes[routeName] = page
    }
    
    route(event) {
      event = event || window.event
      event.preventDefault()
  
      window.history.pushState({}, "", event.target.href)
      this.handle()
    }
  
    handle() {
      const { pathname }  = window.location
      const route = this.routes[pathname] || this.routes[404]
      fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('.showPage').innerHTML = html
      })
      this.addSelected()
    }
    addSelected() {
        if (window.location.pathname.indexOf("/about") != -1) {
          this.clearSelectedNav()
          body.style.backgroundImage = "url('../img/bg-about.png')"
          aboutNav.classList.add('selected')
        } else if (window.location.pathname.indexOf("/exploration") != -1) {
          this.clearSelectedNav()
          body.style.backgroundImage = "url('../img/bg-exploration.png')"
          explorationNav.classList.add('selected')
        } else {
          this.clearSelectedNav()
          body.style.backgroundImage = "url('../img/bg-home.png')"
          homeNav.classList.add('selected')
        }
    }
    clearSelectedNav() {
      homeNav.classList.remove('selected')
      aboutNav.classList.remove('selected')
      explorationNav.classList.remove('selected')
  }
  }