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
    const barWidth = 40;
    const spacing = 20;
    let x = 0;
    let y = 0;
    jsonData.forEach((e) => {
        ctx.fillRect(x, (canvas.height - e.amount - 100), barWidth, e.amount + 80);
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(e.day, x + 10, canvas.height);
        x += barWidth + spacing;
    })
}

async function handleMouseMove(canvas, event) {
    if (!event) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    console.log(`${mouseX}, ${mouseY}`);
    const jsonData = await getData();
    const barWidth = 40;
    const spacing = 20;
    let x = 0;
    const ctx = canvas.getContext("2d");
    jsonData.forEach((e) => {
        let rectX = x;
        let rectY = canvas.height - e.amount - 100;
        let rectWidth = barWidth;
        let rectHeight = e.amount + 80;
        if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
            ctx.fillStyle = "blue";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(x, (canvas.height - e.amount - 100), barWidth, e.amount + 80);
        ctx.textBaseline = 'alphabetic';
        x += barWidth + spacing;
    })

}

const canvas = $('#myCanvas').get(0);
window.addEventListener('load', () => displayChart(canvas));
canvas.addEventListener('mousemove', (event) => handleMouseMove(canvas, event));
