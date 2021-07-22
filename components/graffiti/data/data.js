const data = {
  width: "320px",
  height: "375px",
  background: "#eeeeee",
  radius: "0px 0px 0px 0px",
  views: [{
    type: 'rect',
    style: {
      left: "50px",
      top: "50px",
      width: "200px",
      height: "200px",
      background: "red",
      radius: "5px",
      border: "10px",
      borderColor: "#ffffff",
      boxShadow: "0px 0px 10px #000000",
      rotate: "45deg",
      rotateOrigin: "center center"
    }
  }, {
    type: "line",
    style: {
      lineWidth: 2,
      left: "0px",
      top: "150px",
      toLeft: "320px",
      toTop: "150px",
      color: "#cccccc",
      lineType: 'line',
      lineCap: "butt",
      lineJoin: "miter",
      lineDash: [5, 15],
      lineDashOffset: 10
    }
  }, {
    type: "line",
    style: {
      lineWidth: 2,
      left: "150px",
      top: "0px",
      toLeft: "150px",
      toTop: "375px",
      color: "#cccccc",
      lineType: 'line',
      lineCap: "butt",
      lineJoin: "miter",
      lineDash: [5, 15],
      lineDashOffset: 10
    }
  }]
}
export default data