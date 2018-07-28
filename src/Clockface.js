class Clockface {
  constructor(canvas, width, height, ratio) {
    this.canvas = canvas.current;
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.ratio = ratio;
    this.context = this.canvas.getContext('2d');
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.maxCount = 1200;
    this.radius = this.canvas.width / 4;
    this.counterClockwise = false;
    this.color = {
      bright: '#E9EDF8',
      dark: '#ABB3BF',
    };
  }

  init() {
    this.start = 1.5;
    this.count = 1;
    this.currentColor = this.color.bright;
    const startAngle = this.start * Math.PI;
    const endAngle = (this.start + 2) * Math.PI;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, startAngle, endAngle, this.counterClockwise);

    this.context.lineWidth = this.canvas.width / 2;

    this.context.strokeStyle = this.color.dark;
    this.context.stroke();

    this.context.closePath();
  }

  drawClockProgress() {
    if (this.count > this.maxCount) {
      this.count = 1;
      const { bright, dark } = this.color;
      this.currentColor = this.currentColor === bright ? dark : bright;
    }
    const lineEnd = this.start + this.count / 600;
    const startAngle = this.start * Math.PI;
    const endAngle = lineEnd * Math.PI;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, startAngle, endAngle, this.counterClockwise);
    this.context.strokeStyle = this.currentColor;
    this.context.stroke();
    this.context.closePath();
    this.count += 1;
  }
}

export default Clockface;
