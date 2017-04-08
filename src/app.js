import $ from 'jquery'
import echarts from 'echarts'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.css'

import './styles.less'

class Evaluation {
  constructor() {
  }

  urlValidator(url) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)

    return !!url.match(regex)
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  progressLoading(url) {
    let loadBar = $('.progress-radial').last()

    const randomInterval = [10, 30, 50, 60, 100]

    let timer = setInterval(() => {
      let currentClass = loadBar.attr('class').split(' ')[1]
      let currentPercentage = currentClass.substring(9,12)
      let newPercentage = Math.min((parseInt(currentPercentage) + 1), 100)
      let newClass = 'progress-' + newPercentage
      loadBar.removeClass(currentClass).addClass(newClass)
      if (newPercentage >= 100) {
        clearInterval(timer)
        this.redirectToResult(url)
        $('.progress-section').hide()
        $('.container-detail').show()
      }
    }, randomInterval[this.getRandomArbitrary(0, 4)])
  }

  renderDetailTable(json) {
    let listDom = $('#tips')

    const greenIcon = `<i class="fa fa-check" aria-hidden="true" style="color:green;"></i>`
    const redIcon = `<i class="fa fa-times" aria-hidden="true" style="color:red;"></i>`

    json.aspects.map(item => {
      listDom.append($(`
        <tr colspan="2" class="row">
          <td class="detail-item-name col-md-3">
            ${item.name}
            ${item.pass===200 ? greenIcon : redIcon}
          </td>
          <td class="detail-item-detail col-md-8">
            <div class="detail-item-score">Score: -${item.score}</div>
            <div class="detail-item-tips">Tips: ${item.tip}</div>
          </td>
        </tr>`))
    })

    this.renderImageDetail()
  }

  renderImageDetail(imgArr) {
    
  }

  redirectToResult(url) {
    $.get(`/score?url=${url}`, (json) => {
      console.log('')
      this.renderCountDiagram(json.count)
      this.renderDetailTable(json)
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

    $('.container-index').hide()
    $('.progress-section').show()

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
  $('.input-url').focus()
  evalInstance.submitHandler()
})