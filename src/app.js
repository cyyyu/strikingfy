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

  progressLoading(url) {
    let loadBar = $('.progress-radial').last()

    let timer = setInterval(() => {
      let currentClass = loadBar.attr('class').split(' ')[1]
      let currentPercentage = currentClass.substring(9,12)
      let newPercentage = Math.min((parseInt(currentPercentage) + 1), 100)
      let newClass = 'progress-' + newPercentage
      loadBar.removeClass(currentClass).addClass(newClass)
      if (newPercentage > 100) {
        clearInterval(timer)
        this.redirectToResult(url)
      }
    }, 100)
  }

  redirectToResult(url) {
    $.get(`/score/${url}`, (json) => {
      
    })
  }

  showEvaluationResult(url) {
    if(!this.urlValidator(url)) {
      $('.email-fail').toggle()
      return
    }

    $('.container-index').toggle()
    $('.progress-section').toggle()

    this.progressLoading(url)
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