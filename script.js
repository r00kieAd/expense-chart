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
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    const barWidth = 40;
    const spacing = 20;
    let x = 10;
    let y = 0;
    jsonData.forEach((e) => {
        ctx.beginPath();
        ctx.roundRect(x, (canvas.height - e.amount - 100), barWidth, e.amount + 80, [3]);
        ctx.fill()
        ctx.stroke();
        ctx.font = "12px Sans-Serif";
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(e.day, x + 7, canvas.height);
        x += barWidth + spacing;
    })
}

async function handleMouseMove(canvas, event) {
    if (!event) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    // console.log(`${mouseX}, ${mouseY}`);
    const jsonData = await getData();
    const barWidth = 40;
    const spacing = 20;
    let x = 10;
    const ctx = canvas.getContext("2d");
    jsonData.forEach((e) => {
        let rectX = x;
        let rectY = canvas.height - e.amount - 100;
        let rectWidth = barWidth;
        let rectHeight = e.amount + 80;
        if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.roundRect(x - 5, canvas.height - e.amount - 150, barWidth + 10, 30, [3]);
            ctx.fill();
            ctx.stroke();
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = "black";
            ctx.fillText(e.amount, x + 4, canvas.height - e.amount - 127);
        } else {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            // extra dimensions to ensure stroke borders are also wiped out
            ctx.clearRect(x - 6, canvas.height - e.amount - 151, barWidth + 12, 32);
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
