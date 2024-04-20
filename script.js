async function displayChart() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('JSON not found');
    }
    const data = await response.json();
    const canvas = $('#myCanvas').get(0);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    const barWidth = 40;
    const spacing = 20;
    let x = 0;
    let y = 0;
    data.forEach((e) => {
        ctx.fillRect(x, (canvas.height - e.amount - 90), barWidth, e.amount+80);
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(e.day, x + 10, canvas.height);
        x += barWidth + spacing;
    })
}

displayChart();
