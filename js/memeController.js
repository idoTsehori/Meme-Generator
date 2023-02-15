'use strict'
let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  //   renderMeme()
}

function renderMeme() {
  const { memeImg, memeTxt } = getMeme()

  const img = new Image()
  img.src = `imgs/memes-square/${memeImg.url}`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawTxt(memeTxt.txt, memeTxt.size, memeTxt.color, memeTxt.align, 200, 50)
  }
}

function drawTxt(text, size, color, align, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Impact`
  gCtx.textAlign = align
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function onTextInput(userTxt) {
  setLineTxt(userTxt)
  const { memeTxt } = getMeme()
  renderMeme()
}

function changeTxtColor(color) {
  setMemeColor(color)
  renderMeme()
}

function changeFontSize(increaseClicked) {
  const { memeTxt } = getMeme()
  const diff = increaseClicked ? 7 : -7
  memeTxt.size += diff
  //
  renderMeme()
}
