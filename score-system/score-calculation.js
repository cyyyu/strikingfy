// owner: chuangyu

const checkTitle = title => title ? 0 : 10

const checkKeywords = keywords => {
  if (!keywords) {
    return 20
  } else if (keywords.indexOf('，') > -1) {
    return 10
  }

  return 0
}


const checkDescription = description => description ? 0 : 10

const checkFavicon = icon => icon ? 0 : 10

module.exports = {
  checkTitle,
  checkKeywords,
  checkDescription,
  checkFavicon,
}