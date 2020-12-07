import config from '../config';
const colors = config.chartColors;

var generateDayWiseTimeSeries = function (baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
};

function generateHeatMapData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

const actualDate = new Date();
const actualYear = actualDate.getFullYear();

export default {
  line: {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
        style: {
          color: colors.textColor
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: {
            colors: colors.textColor
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: colors.textColor
          }
        }
      },     
      tooltip: {
        theme: 'dark'
      },
      grid: {
        borderColor: colors.gridLineColor
      },
      colors: [colors.blue]
    }
  },
  area: {
    series: [{
      name: 'South',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
      {
        name: 'North',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 20
        })
      },
      {
        name: 'Central',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 15
        })
      }
    ],
    options: {
      chart: {
        stacked: true,
      },
      tooltip: {
        theme: 'dark'
      },
      colors: [colors.blue, colors.green, colors.red],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'solid',
        opacity: 1,
        // gradient: {
        //   opacityFrom: 0.6,
        //   opacityTo: 0.8,
        // }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        labels: {
          colors: [colors.textColor]
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: colors.textColor
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: colors.textColor
          }
        }
      },
      grid: {
        borderColor: colors.gridLineColor
      }
    }
  },
  column: {
    series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
      colors: [colors.blue],
      chart: {
      //  height: 450,
        height: 350,
        type: 'bar',
      },
      tooltip: {
        theme: 'dark'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom,
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [colors.textColor]
        }
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        labels: {
          style: {
            colors: colors.textColor,
            offsetY: -18,
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35,

        }
      },
      fill: {
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }

      },
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        align: 'top',
        style: {
          color: colors.textColor
        }
      },
      grid: {
        borderColor: colors.gridLineColor
      }
    }
  },
  bar: {
    series: [{
      name: 'Males',
      data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
        3.9, 3.5, 3
      ]
    },
      {
        name: 'Females',
        data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,
          -4.1, -4, -4.1, -3.4, -3.1, -2.8
        ]
      }
    ],
    options: {
      chart: {
        stacked: true
      },
      colors: [colors.blue, colors.red],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',

        },
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        labels: {
          colors: [colors.textColor]
        }
      },
      stroke: {
        width: 0,
      },

      grid: {
        borderColor: colors.gridLineColor,
        xaxis: {
          showLines: false
        }
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          style: {
            colors: colors.textColor
          }
        },
        labels: {
          style: {
            colors: colors.textColor
          }
        }
      },
      tooltip: {
        theme: 'dark',
        shared: false,
        x: {
          formatter: function (val) {
            return val
          }
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%"
          }
        }
      },
      title: {
        text: 'Mauritius population pyramid 2011',
        style: {
          color: colors.textColor
        }
      },
      xaxis: {
        categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
          '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
          '0-4'
        ],
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%"
          },
          style: {
            colors: colors.textColor
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
    }
  },
  mixed: {
    series: [{
      name: 'Income',
      type: 'column',
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }, {
      name: 'Cashflow',
      type: 'column',
      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    }, {
      name: 'Revenue',
      type: 'line',
      data: [20, 29, 37, 36, 44, 45, 50, 58]
    }],
    options: {
      dataLabels: {
        enabled: false
      },
      colors: [colors.blue, colors.green, colors.red],
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'XYZ - Stock Analysis (2009 - 2016)',
        align: 'left',
        offsetX: 110,
        style: {
          color: colors.textColor
        }
      },
      xaxis: {
        categories: [actualYear-7, actualYear-6, actualYear-5, actualYear-4, actualYear-3, actualYear-2, actualYear-1, actualYear],
        labels: {
          style: {
            colors: colors.textColor
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: [{
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: colors.blue
        },
        labels: {
          style: {
            colors: colors.blue,
          }
        },
        title: {
          text: "Income (thousand crores)",
          style: {
            color: colors.blue,
          }
        },
        tooltip: {
          enabled: true
        }
      },

        {
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: colors.green
          },
          labels: {
            style: {
              colors: colors.green,
            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: colors.green,
            }
          },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: colors.orange
          },
          labels: {
            style: {
              colors: colors.orange,
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: colors.orange,
            }
          }
        },
      ],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
        labels: {
          colors: [colors.textColor]
        }
      },
      grid: {
        borderColor: colors.gridLineColor
      }
    }
  },
  pie: {
    series: [44, 55, 13, 43, 22],
    options: {
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: [colors.textColor]
        }
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom',
          }
        }
      }],
      stroke: {
        show: false,
        width: 0
      },
      colors: [colors.blue, colors.green, colors.orange, colors.red, colors.purple],
    }
  },
  donut: {
    series: [44, 55, 41, 17, 15],
    options: {
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: [colors.textColor]
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom',
          }
        }
      }],
      stroke: {
        show: false,
        width: 0
      },
      colors: [colors.blue, colors.green, colors.orange, colors.red, colors.purple],
    }
  },
  radial: {
    series: [76, 67, 61, 90],
    options: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      title: {
        text: 'Basic Radial Chart',
        style: {
          color: colors.textColor
        }
      },
      colors: [colors.blue, colors.green, colors.orange, colors.red],
      plotOptions: {
        radialBar: {
          dataLabels: {
            value: {
              color: colors.textColor
            }
          },
          track: {
            background: '#000000',
            opacity: 0.24
          }
        }
      }
    }
  },
  heatmap: {
    series: [{
      name: 'Jan',
      data: generateHeatMapData(20, {
        min: -30,
        max: 55
      })
    },
      {
        name: 'Feb',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Mar',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Apr',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'May',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Jun',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Jul',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Aug',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Sep',
        data: generateHeatMapData(20, {
          min: -30,
          max: 55
        })
      }
    ],
    options: {
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: [colors.textColor]
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: colors.textColor
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            color: colors.textColor
          }
        }
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          colorScale: {
            ranges: [{
              from: -30,
              to: 5,
              name: 'low',
              color: colors.green
            },
              {
                from: 6,
                to: 20,
                name: 'medium',
                color: colors.blue
              },
              {
                from: 21,
                to: 45,
                name: 'high',
                color: colors.orange
              },
              {
                from: 46,
                to: 55,
                name: 'extreme',
                color: colors.red
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },

      title: {
        text: 'HeatMap Chart with Color Range',
        style: {
          color: colors.textColor
        }
      },
      stroke: {
        show: false,
        width: 0
      },
      grid: {
        show: false
      }
    }
  }
}