'use strict'

function renderGallery() {
  const imgs = getImgs()
  const strHTMLs = imgs.map((img) => {
    return `
    <article>
    <img onclick="onImgSelect(${img.id})"
    src="imgs/memes-square/${img.url}" />
    </article>`
  })

  const elGalleryContainer = document.querySelector('.gallery-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
  // * Hide Gallery
  document.querySelector('.gallery-page').style.display = 'none'
  // * Show Meme Editor
  document.querySelector('.editor-page-container').style.display = 'block'
}

function onGenerateRandomMeme() {
  console.log('Generate Random Meme')
  const randomId = getRandomImgId()
  onImgSelect(imgId)
}

function onAboutClick() {
  alert(`Hey There! I'm Ido! I have no time to write a fancy modal:)`)
}

function openAboutModal() {
  document.querySelector('.about-modal').hidden = false
}
function closeAboutModal() {
  document.querySelector('.about-modal').hidden = true
}
