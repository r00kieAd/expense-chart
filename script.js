const barWidth = 40;
const spacing = 20;

async function getData() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('JSON not found');
    }
    const data = await response.json();
    return data;
}

async function displayChart(canvas) {
    const jsonData = await getData();
    const ctx = canvas.getContext("2d");
    let x = 10;
    let y = 0;
    jsonData.forEach((e) => {
        ctx.fillStyle = e.day == 'wed' ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)";
        ctx.strokeStyle = e.day == 'wed' ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)";
        ctx.beginPath();
        ctx.roundRect(x, (canvas.height - e.amount - 100), barWidth, e.amount + 80, [3]);
        ctx.fill()
        ctx.stroke();
        ctx.fillStyle = "hsl(28, 10%, 53%)";
        ctx.font = "12px Sans-Serif";
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(e.day, e.day == 'fri' ? x + 13 : x + 8, canvas.height);
        x += barWidth + spacing;
    })
}

async function handleMouseMove(canvas, event) {
    if (!event) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const jsonData = await getData();
    let x = 10;
    const ctx = canvas.getContext("2d");
    jsonData.forEach((e) => {
        let rectX = x;
        let rectY = canvas.height - e.amount - 100;
        let rectWidth = barWidth;
        let rectHeight = e.amount + 80;
        // alert(`mouseX: ${mouseX} vs rectX: ${rectX} vs rectX + rectWidth: ${rectX + rectWidth}`);
        // alert(`mouseY: ${mouseY} vs rectY: ${rectY} vs rectY + rectHeight: ${rectY + rectHeight}`);
        if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
            ctx.fillStyle = "hsl(25, 47%, 15%)";
            ctx.strokeStyle = "hsl(25, 47%, 15%)";
            ctx.beginPath();
            ctx.roundRect(x - 4, canvas.height - e.amount - 150, barWidth + 8, 30, [3]);
            ctx.fill();
            ctx.stroke();
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = "hsl(27, 66%, 92%)";
            ctx.fillText(`$${e.amount}`, x + 2, canvas.height - e.amount - 127);
            ctx.fillStyle = e.day == 'wed' ? "hsl(186, 34%, 60%)" : "hsl(10, 70%, 77%)";
            ctx.strokeStyle = e.day == 'wed' ? "hsl(186, 34%, 60%)" : "hsl(10, 70%, 77%)";
        } else {
            ctx.fillStyle = "hsl(10, 79%, 65%)";
            ctx.strokeStyle = "hsl(10, 79%, 65%)";
            // extra dimensions to ensure stroke borders are also wiped out
            ctx.clearRect(x - 5, canvas.height - e.amount - 151, barWidth + 10, 32);
        }
        ctx.beginPath();
        ctx.roundRect(x, (canvas.height - e.amount - 100), barWidth, e.amount + 80, [3]);
        ctx.fill();
        ctx.stroke();
        x += barWidth + spacing;
        ctx.stroke();
    })

}

const canvas = $('#myCanvas').get(0);
window.addEventListener('load', () => displayChart(canvas));
canvas.addEventListener('mousemove', (event) => handleMouseMove(canvas, event));
