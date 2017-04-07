// owner: chuangyu

const Calculate = (url) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      _checkTitle(url),
      _check
    ]).then(res => {

    }, err => {

    })
  })
}