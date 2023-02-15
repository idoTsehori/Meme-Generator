'use strict'
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: '1.jpg', keywords: ['Trump', 'Angry'] },
  { id: 2, url: '2.jpg', keywords: ['Dog', 'Cute'] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      align: 'center',
      color: 'white',
    },
  ],
}

function getMeme() {
  //*Get Meme Img by ID
  const memeImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
  //*Get Meme text
  const memeTxt = gMeme.lines[gMeme.selectedLineIdx]
  return { memeImg, memeTxt }
}

function setLineTxt(userTxt) {
  const { memeTxt } = getMeme()
  memeTxt.txt = userTxt
}

function getImgs() {
  return gImgs
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setMemeColor(userColor) {
  const { memeTxt } = getMeme()
  memeTxt.color = userColor
}
