import $ from 'jquery'
import echarts from 'echarts'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.css'

import './styles.less'

class Evaluation {
  constructor() {
    this.PARSE_URL = ''
  }

  urlValidator(url) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)

    return !!url.match(regex)
  }

  showEvaluationResult(url) {
    if(!this.urlValidator(url)) {
      $('.email-fail').toggle()
      return
    }

    $('.container-index').toggle()
    $('.progress-section').toggle()
  }

  submitHandler() {
    let _this = this
    $('.submit').click((e) => {
      e.preventDefault()
      const url = document.querySelector('.input-url').value
      debugger
      _this.showEvaluationResult(url)
    })
  }
}

$(document).ready(() => {
  const evalInstance = new Evaluation()
  evalInstance.submitHandler()
})