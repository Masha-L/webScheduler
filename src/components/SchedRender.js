import React from 'react'

class SchedRender extends React.Component {

    componentDidMount() {
      //  this.updateCanvas();
        //console.log("mount");
    }


    render() {

      const times = [];
      this.setUpTimes(times);
      const classes = [];
      this.setUpClasses(classes, this.props.schedule);
        return (
            <div className="schedulePic">
            {classes}
              <label className="mon"> Mon </label>
              <label className="tue"> Tue </label>
              <label className="wed"> Wed </label>
              <label className="thu"> Thu </label>
              <label className="fri"> Fri </label>
              {times}
            </div>
        );
    }

    setUpTimes(times){
      for (var i = 0; i<16; i++)
      {
        times.push(<label className = "time" style = {{gridRow: i+3}}> {i+7}:00 </label>);
      }
    }


    componentDidUpdate(){
    }

    setUpClasses(classes, schedule){
      schedule.forEach((node, numNode) => {
        if(node.lecture){
          node.lecture.timePeriods.forEach((lecTP, numLecTP) => {

            const estHeight = this.findHeight(lecTP);

            //if height < 16 -> 16
            const height = estHeight < 16 ? 16 : estHeight;
            //34, because 1 row + weekDay row height + gap - as a baseline
            //calculations of the distance from the top
            const y = 34 + (this.findY(lecTP, height));

            //calculations of height   height: 40px; line-height: 40px;
            classes.push(<div className = "class" style = {{gridColumn: lecTP.weekDay+3, top: y, height: height, lineHeight:height/10}}> {node.subject.id} </div>);
          })
        }
        if(node.lab) {
          console.log("Hiya!");
          node.lab.timePeriods.forEach((labTP, numLabTP) => {
            const estHeight = this.findHeight(labTP);
            //if height < 16 -> 16
            const height = estHeight < 16 ? 16 : estHeight;
            console.log("Hi" + height);
            //34, because 1 row + weekDay row height + gap - as a baseline
            //calculations of the distance from the top
            const y = 34 + (this.findY(labTP, height));

            classes.push(<div className = "class" style = {{gridColumn: labTP.weekDay+3,top: y, height: height, lineHeight:height/10}}> {node.subject.id} </div>);
          })
        }

      })


  }

  findY(timeP, height){
    const startH = parseInt(timeP.startTime, 10);
    const decMinStart = (timeP.startTime - startH)*100/60;
    //hours + intervals between them + half of height
    const y = (startH-7+decMinStart)*24 + height/2;
    return y;
  }

  findHeight(timeP){
    const startH = parseInt(timeP.startTime, 10);
    const decMinStart = (timeP.startTime - startH)*100/60;
    const endH = parseInt(timeP.endTime, 10);
    const decMinEnd = (timeP.endTime - endH)*100/60;

    const length = (endH+decMinEnd) - (startH+decMinStart);
    const height = length * 25;
    return height;
  }

  /*  updateCanvas() {
      // Colors for lectures are even, colors for labs - are odd
      const colors =[
      '#7FFFD4', '#66CDAA',
      '#C1FFC1', '#9BCD9B',
      '#54FF9F', '#43CD80',
      '#FFC125', '#CD9B1D',
      '#FF6A6A', '#CD5555',
      '#FF7256', '#CD5B45',
      '#FFAEB9', '#8B5F65'
     ];

      const context = this.refs.canvas.getContext('2d');
      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;
      const columnWidth = (width)/6;

      //set the color to white
      context.fillStyle = "#fff";
      //create the base for the schedules
      this.roundRect(context,0,0,width,height,10,true, false);
      console.log(height);

      //set the color to dark Green
      context.fillStyle = "#10BC10";
      console.log(width);
      //draw weekdays
      for(var i = this.converter(context,106,"x"); i <= (width-10); i = i+this.converter(context,67+10,"x"))
      {
        this.roundRect(context,i,this.converter(context,11,"y"),this.converter(context,72,"x"),this.converter(context,26,"y"),3,true, false);
      }
*/


/*       context.fillStyle = "#fff";
//       context.fillRect(0, 0, width, height);
//       context.strokeRect(0, 0, width, height);
//
//       for(var i = 0; i < width; i = i + columnWidth)
//         context.strokeRect(i, 0, (i + columnWidth), height);
//
//       context.strokeRect(0, 0, width, 25);
//       context.fillStyle = "#000";
//
//       this.writeHeader(context, "14px Times", columnWidth, 20);
//
//       //console.log(columnWidth);
//       context.font="14px Times";
//       context.fillText("Mon", columnWidth + 5, 20);
//
//       context.font="14px Times";
//       context.fillText("Tue", columnWidth * 2 + 10, 20);
//
//       context.font="14px Times";
//       context.fillText("Wed", columnWidth * 3 + 10, 20);
//
//       context.font="14px Times";
//       context.fillText("Thu", columnWidth * 4 + 10, 20);
//
//       context.font="14px Times";
//       context.fillText("Fri", columnWidth * 5 + 10, 20);
//
//       let earliest = 30;
//       let latest = 1;
//
//       //console.log(this.props.schedule);
//*/

/*
//       this.props.schedule.forEach((node, numNode) => {
//         if(node.lecture)
//           node.lecture.timePeriods.forEach((lecTP, numLecTP)=>{
//             if(parseInt(lecTP.startTime, 10)<earliest) //ЕТОТ КОД НАДО В ОТДЕЛЬНУЮ КУЙНЮ! ОН ПОТОМ ПОВТОРЯЕТСЯ
//               earliest = parseInt(lecTP.startTime, 10);
//
//           if(parseInt(lecTP.endTime, 10)>latest)
//             latest = parseInt(lecTP.endTime, 10);
//         });
//           if(node.lab)
//           node.lab.timePeriods.forEach((labTP, numlabTP)=>{
//             if(parseInt(labTP.startTime, 10)<earliest) //ЕТОТ КОД НАДО В ОТДЕЛЬНУЮ КУЙНЮ! ОН УЖЕ БЫЛ - ПОВТОРЯЕТСЯ
//               earliest = parseInt(labTP.startTime, 10);
//             if(parseInt(labTP.endTime, 10)>latest)
//               latest = parseInt(labTP.endTime, 10);
//           });
//
//       });
//       latest = latest+2; //in case class ends later than 00
//       earliest = earliest-1;
//       const hours = latest-earliest;
//
//       const hourHeight = (height - 30)/hours;
//
//       for(i = 0; i<=hours; i++)
//         {
// //          if(i!==hours)
// //            this.drawLine(context, 0, 25+hourHeight*i, width, 25+hourHeight*i);
//
//           context.fillStyle = '#000000';
//           context.font="14px Times";
//           var time = earliest +i
//           context.fillText(  time+":00", 5, 40+hourHeight*i);
//         }
//*/

/*
//       this.props.schedule.forEach((node, numNode) => {
//         if(node.lecture)
//           node.lecture.timePeriods.forEach((lecTP, numLecTP)=>{
//           const startH = parseInt(lecTP.startTime, 10);
//           const endH = parseInt(lecTP.endTime, 10);
//
//           const x = lecTP.weekDay*columnWidth + 1;
//
//           const decMinStart = (lecTP.startTime - startH)*100/60;
//
//           const decMinEnd = (lecTP.endTime - endH)*100/60;
//
//           const y = (startH + decMinStart - earliest)*hourHeight + 30;
//
//           const classHeight = (endH + decMinEnd - startH - decMinStart)*hourHeight;
//
//           context.fillStyle = colors[numNode];
//           context.fillRect(x, y, columnWidth-2, classHeight);
//
//           context.fillStyle = "#000000";
//           context.font="10px Times";
//           const yId= y - 8 + classHeight/2
//           context.fillText(node.subject.id, x+2, yId);
//           context.font="10px Times";
//           const yTime = y + 8 + classHeight/2;
//           //time of a class
//           //context.fillText((lecTP.startTime) + "-" + (lecTP.endTime), x+6, yTime);
//           });
//
//           if (node.lab)
//           node.lab.timePeriods.forEach((labTP, numlabTP)=>{
//             const startH = parseInt(labTP.startTime, 10);
//             const endH = parseInt(labTP.endTime, 10);
//
//             const x = labTP.weekDay*columnWidth + 1;
//
//             const decMinStart = (labTP.startTime - startH)*100/60;
//
//             const decMinEnd = (labTP.endTime - endH)*100/60;
//
//             const y = (startH + decMinStart - earliest)*hourHeight + 30;
//
//             const classHeight = (endH + decMinEnd - startH - decMinStart)*hourHeight;
//
//             context.fillStyle = colors[numNode];
//             context.fillRect(x, y, columnWidth-2, classHeight);
//
//
//             context.fillStyle = "#000000";
//             context.font="10px Times";
//
//             const yId= y - 8 + classHeight/2
//             context.fillText(node.subject.id, x+2, yId);
//             context.font="10px Times";
//             const yTime = y + 8 + classHeight/2;
//             //time of class
//           //  context.fillText((labTP.startTime) + "-" + (labTP.endTime), x+6, yTime);
//
//           });
      });
    }


  /*  drawLine(context, xInit, yInit, xFin, yFin){
      context.strokeStyle = "#C0C0F0";
      context.beginPath();
      context.moveTo(xInit, yInit);
      context.lineTo(xFin, yFin);
      context.stroke();
    }

    write(context, font, text, width, height) {
      context.font = font;
      context.fillText(text, width, height);
    }

    writeHeader(context, font, text, width, height) {
      //console.log(width);
      const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      for (var i = 0; i < 5; i++) {
        let start = (i == 0) ? width + 5 : width * (i + 1) + 10;
        //console.log(start);
        this.write(context, font, weekdays[i], start, height);
      }
    }
    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} radius The corner radius. Defaults to 5;
     * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
     * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
     */
  /*   roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke == "undefined" ) {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (stroke) {
        ctx.stroke();
      }
      if (fill) {
        ctx.fill();
      }       
    }

    converter(context, px, direction){
      return direction==="x"? px*0.6 : px*0.3;
    }*/
}


export default SchedRender;
