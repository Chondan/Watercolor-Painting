(() => {

    const canvas = document.querySelector("#watercolor-painting-canvas");
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let canvasIsClicked = false;
    let previousPoint = { x: 0, y: 0 };
    function getDistance(point1, point2) {
        return Math.sqrt(((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2));
    }
    function paint(e) {
        if (!canvasIsClicked) {
            return;
        }
        let currentPoint;
        if (!e.clientX) {
            currentPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            currentPoint = { x: e.clientX, y: e.clientY };
        }
        const distance = Math.max(getDistance(previousPoint, currentPoint), 2);
        canvasContext.beginPath();
        canvasContext.lineCap = "round";
        canvasContext.lineWidth = 30 / distance;
        canvasContext.lineJoin = "round";
        const opacity = Math.min(0.5, 1 / distance);
        canvasContext.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
        canvasContext.moveTo(previousPoint.x, previousPoint.y);
        canvasContext.lineTo(currentPoint.x, currentPoint.y);
        canvasContext.stroke();
        previousPoint = { x: currentPoint.x, y: currentPoint.y };
    }
    
    function App() {
        
        canvas.addEventListener('click', (e) => {
            if (canvasIsClicked) {
                canvasIsClicked = false;
            } else {
                canvasIsClicked = true;
                previousPoint = { x: e.clientX, y: e.clientY };
            }
        });
        canvas.addEventListener('mousemove', paint);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            canvasIsClicked = true;
        }) 
        canvas.addEventListener('touchmove', paint);    
    }
    App();
})();