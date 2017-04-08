// owner: chuangyu

const _ = require('lodash')
const imageChecker = require('./inspector-bokeh/measure_blur_node')

const checkTitle = title => {
  if (!title) {
    return {
      name: 'title',
      score: 10,
      tip: 'Please complete basic website information 请将您网站的基本资料填写完整。',
      pass: 404
    }
  } else {
    return {
      name: 'title',
      score: 0,
      tip: 'Congratulations',
      pass: 200
    }
  }
}

const checkKeywords = keywords => {
  if (!keywords) {
    return {
      name: 'keywords',
      score: 20,
      tip: 'Please complete basic website information 请将您网站的基本资料填写完整。',
      pass: 404
    }
  } else if (keywords.indexOf('，') > -1) {
    return {
      name: 'keywords',
      score: 10,
      tip: 'Please use comma to segregate website keywords 请用英文逗号“,”分隔您的网站关键词',
      pass: 404
    }
  }

  return {
    name: 'keywords',
    score: 0,
    tip: 'Congratulation',
    pass: 200
  }
}


const checkDescription = description => {
  if (!description) {
    return {
      name: 'description',
      score: 10,
      tip: 'Please complete basic website information 请将您网站的基本资料填写完整。',
      pass: 404
    }
  } else {
    return {
      name: 'description',
      score: 0,
      tip: 'Congratulations',
      pass: 200
    }
  }
}

const checkFavicon = icon => {
  if (!icon) {
    return {
      name: 'favicon',
      score: 10,
      tip: 'Please upload website icon, this will make your website standout 请在网站设置中上传网站图标。这样回让您的网站更有特色哦。',
      pass: 404
    }
  } else {
    return {
      name: 'favicon',
      score: 0,
      tip: 'Congratulation',
      pass: 200
    }
  }
}

const checkShareIcon = icon => {
  if (icon === 'https://static-assets.sxlcdn.com/images/fb_images/default-sxl.jpg' || icon === 'https://static-assets.strikingly.com/images/fb_images/default.png') {
    return {
      name: 'shareicon',
      score: 0,
      tip: 'Congratulation',
      pass: 200
    }
  } else {
    return {
      name: 'shareicon',
      score: 10,
      tip: 'Please upload your website share icon, posts in social network with images attract more click 请在网站设置中上传网站分享图片。这样您将网站分享到社交媒体时，被打开的机会更大哦。',
      pass: 404
    }
  }
}

const checkBaidu = (baidu) => {
  if (!baidu) {
    return {
      name: 'baidu',
      score: 10,
      tip: 'To be searched by Baidu, please complete HTML tag verification code, for more info please go to online knowledge database 想让您的网站尽快被搜索引擎收入，请尽快完成百度或谷歌的站长工具验证。具体流程可参考上线了知识库。',
      pass: 404
    }
  } else {
    return {
      name: 'baidu',
      score: 0,
      tip: 'Congratulation',
      pass: 200
    }
  }
}

const checkGoogle = (google) => {
  if (!google) {
    return {
      name: 'google',
      score: 10,
      tip: 'To be searched by Google, please complete HTML tag verification code, for more info please go to online knowledge database 想让您的网站尽快被搜索引擎收入，请尽快完成百度或谷歌的站长工具验证。具体流程可参考上线了知识库。',
      pass: 404
    }
  } else {
    return {
      name: 'google',
      score: 0,
      tip: 'Congratulation',
      pass: 200
    }
  }
}

function calculate(title, keywords, description, favicon, shareicon, baidu, google) {
  let score = 100,
    passed = 0,
    failed = 0

  let results = [
    checkTitle(title),
    checkKeywords(keywords),
    checkDescription(description),
    checkFavicon(favicon),
    checkShareIcon(shareicon),
    checkBaidu(baidu),
    checkGoogle(google),
  ]

  results.map((result) => {
    score -= result.score
    if (result.pass === 200) {
      passed++
    } else {
      failed++
    }
  })

  return {
    totalScore: score,
    count: {
      passed: passed,
      failed: failed
    },
    aspects: results,
  }
}

function checkImages(imgUrls) {
  let tmp = []

  imgUrls.map((url) => {
    tmp.push(imageChecker(url))
  })

  return Promise.all(tmp)
}

module.exports = {
  calculate,
  checkImages
}