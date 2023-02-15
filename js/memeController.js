'use strict'
let gCanvas
let gCtx
let nextLineDiff = 0

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  // renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  const memeLines = meme.lines
  const memeImg = getImgById(meme.selectedImgId)
  const img = new Image()
  img.src = `imgs/memes-square/${memeImg}`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    memeLines.forEach((memeLine, idx) => {
      const memeIsSelected = idx === meme.selectedLineIdx
      drawTxt(
        memeLine.txt,
        memeLine.size,
        memeLine.color,
        memeLine.align,
        230,
        idx * 50 + 30,
        memeIsSelected
      )
    })
  }
}

function drawTxt(text, size, color, align, x, y, isSelected) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Impact`
  gCtx.textAlign = align
  gCtx.textBaseline = 'middle'
  gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

  //* If the Text Line is Selected- focus it:
  if (isSelected) {
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x + 50, y, x + 50, y)
  }
}

function onTextInput(userTxt) {
  setLineTxt(userTxt)
  renderMeme()
}

function changeTxtColor(color) {
  setMemeColor(color)
  renderMeme()
}

function changeFontSize(increaseClicked) {
  const selectedLine = getSelectedLine()
  console.log('selectedLine', selectedLine)
  const diff = increaseClicked ? 7 : -7
  selectedLine.size += diff
  //
  renderMeme()
}

function onAddLine() {
  addNewLine()
  renderMeme()
}

function onRemoveLine() {
  RemoveLastLine()
  renderMeme()
}

function onSwitchLine() {
  changeSelectedLine()
}
