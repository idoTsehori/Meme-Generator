'use strict'
let gCanvas
let gCtx
let nextLineDiff = 0
let LinesXY = []
let y = 30

function onInit() {
  gCanvas = document.querySelector('#canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
}

function renderMeme(downBtnClicked) {
  const meme = getMeme()
  const memeLines = meme.lines
  const memeImg = getImgById(meme.selectedImgId)
  const font = getSelectedFont()
  const img = new Image()
  img.src = `imgs/memes-square/${memeImg}`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    LinesXY = []

    memeLines.forEach((memeLine, idx) => {
      //* Text Lines Draw:
      const memeIsSelected = idx === meme.selectedLineIdx
      if (memeIsSelected && downBtnClicked) {
        drawTxt(
          memeLine,
          memeLine.txt,
          font,
          memeLine.size,
          memeLine.color,
          memeLine.align,
          110,
          (memeLine.y += y),
          memeIsSelected
        )
        return
      }

      drawTxt(
        memeLine,
        memeLine.txt,
        font,
        memeLine.size,
        memeLine.color,
        memeLine.align,
        110,
        idx * 50 + 30,
        memeIsSelected
      )
    })
  }
}

function drawTxt(memeLine, text, font, size, color, align, x, y, isSelected) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  var textWidth = gCtx.measureText(text).width
  var lineHeight = size * 1.286
  gCtx.textBaseline = 'top'

  gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

  //* If the Text Line is Selected- focus it:
  if (isSelected) {
    gCtx.strokeStyle = 'blue'
    gCtx.strokeRect(x, y, textWidth, lineHeight)
  }
  saveLineXY(memeLine, x, y)
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
  renderMeme(true)
}

function saveLineXY(mimeLine, x, y) {
  mimeLine.x = x
  mimeLine.y = y
  LinesXY.push(mimeLine)
}
