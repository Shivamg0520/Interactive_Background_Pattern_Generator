document.addEventListener('DOMContentLoaded', function() {
    // --- Get DOM Elements ---
    const canvas = document.getElementById('patternCanvas');
    const ctx = canvas.getContext('2d');
    
    const shapeColorInput = document.getElementById('shapeColor');
    const shapeSizeInput = document.getElementById('shapeSize');
    const shapeSizeValueSpan = document.getElementById('shapeSizeValue');
    const patternDensityInput = document.getElementById('patternDensity');
    const patternDensityValueSpan = document.getElementById('patternDensityValue');
    const generateButton = document.getElementById('generateButton');
    const downloadButton = document.getElementById('downloadButton');

    // --- Pattern Parameters (Default Values) ---
    let patternParams = {
        shapeColor: shapeColorInput.value,
        shapeSize: parseInt(shapeSizeInput.value),
        patternDensity: parseInt(patternDensityInput.value)
    };

    // --- Function to Draw the Pattern ---
    function drawPattern() {
        // Clear the entire canvas before drawing a new pattern
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the fill color for our shapes
        ctx.fillStyle = patternParams.shapeColor;

        // Calculate density: More shapes for higher density
        // For simplicity, we'll draw patternParams.patternDensity number of shapes
        for (let i = 0; i < patternParams.patternDensity; i++) {
            // Random position for each shape
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            // Draw a square (for now)
            ctx.fillRect(x, y, patternParams.shapeSize, patternParams.shapeSize);

            // You could also draw circles:
            /*
            ctx.beginPath();
            ctx.arc(x, y, patternParams.shapeSize / 2, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
            ctx.fill();
            */
        }
    }

    // --- Update Slider Value Displays ---
    function updateSliderValues() {
        shapeSizeValueSpan.textContent = `${shapeSizeInput.value}px`;
        patternDensityValueSpan.textContent = `${patternDensityInput.value} shapes`;
    }

    // --- Event Handlers ---

    // Update parameters and redraw on control change
    shapeColorInput.addEventListener('input', (e) => {
        patternParams.shapeColor = e.target.value;
        drawPattern();
    });

    shapeSizeInput.addEventListener('input', (e) => {
        patternParams.shapeSize = parseInt(e.target.value);
        updateSliderValues(); // Update display
        drawPattern();
    });

    patternDensityInput.addEventListener('input', (e) => {
        patternParams.patternDensity = parseInt(e.target.value);
        updateSliderValues(); // Update display
        drawPattern();
    });

    // Generate Button: Just redraws the pattern (useful if we add more complex generation logic)
    generateButton.addEventListener('click', drawPattern);

    // Download Button: Save canvas as PNG
    downloadButton.addEventListener('click', () => {
        // Create a temporary link element
        const link = document.createElement('a');
        // Set the download filename
        link.download = 'generated_pattern.png';
        // Convert canvas content to a data URL (PNG format by default)
        link.href = canvas.toDataURL('image/png');
        // Programmatically click the link to trigger download
        document.body.appendChild(link); // Append to body (required for Firefox)
        link.click();
        document.body.removeChild(link); // Remove after click
        console.log('Pattern downloaded.');
    });

    // --- Initial Setup ---
    updateSliderValues(); // Set initial slider value displays
    drawPattern(); // Draw the initial pattern
});