'use strict'
let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
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
      //* Text Lines Draw:
      const memeIsSelected = idx === meme.selectedLineIdx
      drawTxt(memeLine, memeIsSelected)
    })
  }
}

function drawTxt(memeLine, isSelected) {
  const { txt, font, size, color, align, x, y } = memeLine

  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.align = align
  gCtx.font = `${size}px ${font}`
  var textWidth = gCtx.measureText(txt).width
  var lineHeight = size * 1.286
  gCtx.textBaseline = 'top'

  gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.

  //* If the Text Line is Selected- focus it:
  if (isSelected) {
    gCtx.strokeStyle = 'blue'
    gCtx.strokeRect(x, y, textWidth, lineHeight)
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
  // Change Input Text to Selelcted Line:
  const { txt: lineTxt } = getSelectedLine()
  document.querySelector('.editor #txt').value = lineTxt
  renderMeme()
}

function onFontSelect(font) {
  setSelectedFont(font)
  renderMeme()
}

function onMoveTxtDown() {
  const selectedLine = getSelectedLine()
  selectedLine.y += 30
  renderMeme()
}

function onMoveTxtUp() {
  const selectedLine = getSelectedLine()
  selectedLine.y -= 30
  renderMeme()
}

function onMoveTxtRight() {
  const selectedLine = getSelectedLine()
  selectedLine.x += 30
  renderMeme()
}

function onMoveTxtLeft() {
  const selectedLine = getSelectedLine()
  selectedLine.x -= 30
  renderMeme()
}

function saveLineXY(mimeLine, x, y) {
  mimeLine.x = x
  mimeLine.y = y
  LinesXY.push(mimeLine)
}
