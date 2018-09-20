import React from 'react'

class SchedRender extends React.Component {
    componentDidMount() {
        this.updateCanvas();
        console.log("mount");
    }

    componentDidUpdate(){
      this.updateCanvas();
    }


    updateCanvas() {
      //colors for lectures are even, colors for labs - are odd
      const colors =[
      '#00F5FF', '#00C5CD',
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

      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);


      context.strokeRect(0, 0, width, height);

      const columnWidth = (width)/6;

      for(var i = 0; i < width; i = i + columnWidth)
        context.strokeRect(i, 0, (i+columnWidth), height);

      context.strokeRect(0, 0, width, 25);
      context.fillStyle = "#000";

      context.font="14px Times";
      context.fillText("Mon", columnWidth + 5, 20);

      context.font="14px Times";
      context.fillText("Tue", columnWidth * 2 + 10, 20);

      context.font="14px Times";
      context.fillText("Wed", columnWidth * 3 + 10, 20);

      context.font="14px Times";
      context.fillText("Thu", columnWidth * 4 + 10, 20);

      context.font="14px Times";
      context.fillText("Fri", columnWidth * 5 + 10, 20);

      let earliest = 30;
      let latest = 1;

      this.props.schedule.forEach((node, numNode) => {
        if(node.lecture)
          node.lecture.timePeriods.forEach((lecTP, numLecTP)=>{
            if(parseInt(lecTP.startTime, 10)<earliest) //ЕТОТ КОД НАДО В ОТДЕЛЬНУЮ КУЙНЮ! ОН ПОТОМ ПОВТОРЯЕТСЯ
              earliest = parseInt(lecTP.startTime, 10);

          if(parseInt(lecTP.endTime, 10)>latest)
            latest = parseInt(lecTP.endTime, 10);
        });
          if(node.lab)
          node.lab.timePeriods.forEach((labTP, numlabTP)=>{
            if(parseInt(labTP.startTime, 10)<earliest) //ЕТОТ КОД НАДО В ОТДЕЛЬНУЮ КУЙНЮ! ОН УЖЕ БЫЛ - ПОВТОРЯЕТСЯ
              earliest = parseInt(labTP.startTime, 10);
            if(parseInt(labTP.endTime, 10)>latest)
              latest = parseInt(labTP.endTime, 10);
          });

      });
      latest = latest+2; //in case class ends later than 00
      earliest = earliest-1;
      const hours = latest-earliest;

      const hourHeight = (height - 30)/hours;

      for(i = 0; i<=hours; i++)
        {
//          if(i!==hours)
//            this.drawLine(context, 0, 25+hourHeight*i, width, 25+hourHeight*i);

          context.fillStyle = '#000000';
          context.font="14px Times";
          var time = earliest +i
          context.fillText(  time+":00", 5, 40+hourHeight*i);
        }

      this.props.schedule.forEach((node, numNode) => {
        if(node.lecture)
          node.lecture.timePeriods.forEach((lecTP, numLecTP)=>{
          const startH = parseInt(lecTP.startTime, 10);
          const endH = parseInt(lecTP.endTime, 10);

          const x = lecTP.weekDay*columnWidth + 1;

          const decMinStart = (lecTP.startTime - startH)*100/60;

          const decMinEnd = (lecTP.endTime - endH)*100/60;

          const y = (startH + decMinStart - earliest)*hourHeight + 30;

          const classHeight = (endH + decMinEnd - startH - decMinStart)*hourHeight;

          context.fillStyle = colors[numNode];
          context.fillRect(x, y, columnWidth-2, classHeight);

          context.fillStyle = "#000000";
          context.font="10px Times";
          const yId= y - 8 + classHeight/2
          context.fillText(node.subject.id, x+2, yId);
          context.font="10px Times";
          const yTime = y + 8 + classHeight/2;
          context.fillText((lecTP.startTime) + "-" + (lecTP.endTime), x+6, yTime);
          });

          if(node.lab)
          node.lab.timePeriods.forEach((labTP, numlabTP)=>{
            const startH = parseInt(labTP.startTime, 10);
            const endH = parseInt(labTP.endTime, 10);

            const x = labTP.weekDay*columnWidth + 1;

            const decMinStart = (labTP.startTime - startH)*100/60;

            const decMinEnd = (labTP.endTime - endH)*100/60;

            const y = (startH + decMinStart - earliest)*hourHeight + 30;

            const classHeight = (endH + decMinEnd - startH - decMinStart)*hourHeight;

            context.fillStyle = colors[numNode];
            context.fillRect(x, y, columnWidth-2, classHeight);


            context.fillStyle = "#000000";
            context.font="10px Times";

            const yId= y - 8 + classHeight/2
            context.fillText(node.subject.id, x+2, yId);
            context.font="10px Times";
            const yTime = y + 8 + classHeight/2;
            context.fillText((labTP.startTime) + "-" + (labTP.endTime), x+6, yTime);

          });
      });

    }
    render() {
        return (
            <canvas ref = "canvas" width = {350} height = {450}/>
        );
    }

    drawLine(context, xInit, yInit, xFin, yFin){
      context.strokeStyle = "#C0C0F0";
      context.beginPath();
      context.moveTo(xInit, yInit);
      context.lineTo(xFin, yFin);
      context.stroke();
    }


}


export default SchedRender;
