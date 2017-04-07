import $ from 'jquery'

class Evaluation {
  constructor() {
    this.PARSE_URL = ''
  }
  showEvaluationResult(data) {

  }

  submitHandler = () => {
    $('.submit').click((e) => {
      e.preventDefault()
      const jqxhr = $.post(PARSE_URL, showEvaluationResult)
        .fail(err => alert('ERROR:', err))
    })
  }
}

$(document).ready(() => {
  const evalInstance = new Evaluation()
  evalInstance.submitHandler()
})