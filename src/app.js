import $ from 'jquery'
import echarts from 'echarts'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.css'

import './styles.less'


const response = {
  "status":200,
  "totalScore":100,
  "count": {
    "passed": 3,
    "failed": 4
  },
  "aspects":[
  ]
}

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
      if (newPercentage >= 100) {
        clearInterval(timer)
        this.redirectToResult(url)
        $('.progress-section').toggle()
      }
    }, 20)
  }

  redirectToResult(url) {
    $.get(`/score?url=${url}`, (json) => {
      console.log('url', url)
      this.renderCountDiagram(json.count)
    })
  }

  renderCountDiagram(count) {
    const myChart = echarts.init(document.querySelector('.bar-diagram'))

    const option = {
        color: ['#6b4e95'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Passed', 'Failed'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Count',
                type:'bar',
                barWidth: '60%',
                data:[count.passed, count.failed]
            }
        ]
    }

     myChart.setOption(option);

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
      _this.showEvaluationResult(url)
    })
  }
}

$(document).ready(() => {
  const evalInstance = new Evaluation()
  evalInstance.submitHandler()
})