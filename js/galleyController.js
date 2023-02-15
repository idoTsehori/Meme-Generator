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
}
