const vgLogos = document.querySelectorAll('#home svg')

window.addEventListener('load', loadingTitle)

function loadingTitle() {
  for (let vgLogo of vgLogos) {
    setInterval(() => {
      vgLogo.style.opacity = '1'  
      setTimeout(() => {
        vgLogo.style.opacity = '0.2'
        setTimeout(() => {
          vgLogo.style.opacity = '1'
          setTimeout(() => {
            vgLogo.style.opacity = ''
          },200)
        },200)
      },200)
    },1500)
  }
}
