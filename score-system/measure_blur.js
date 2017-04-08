// For each row of pixels
for (y = 0; y < height; y += 1) {
    // Reset edge marker
    edgeStart = -1;

    // For each pixel in the current row of pixels
    for (x = 0; x < width; x += 1) {
        // Intensity value of current center pixel
        value = pixels[y][x];

        // Edge is still open
        if (edgeStart >= 0 && x > edgeStart) {
            // Intensity value of previous pixel
            oldValue = pixels[y][x - 1];

            // Intensity is not increasing anymore, the edge ended
            if (value < oldValue) {
                // Only count edges above a certain intensity
                if (oldValue >= edgeIntensThresh) {
                    // Calculate edge width
                    edgeWidth = x - edgeStart - 1;
                    // Count total number of detected edges
                    numEdges += 1;
                    // Add to sum of all edge widths
                    sumEdgeWidths += edgeWidth;
                }
                // Reset edge marker
                edgeStart = -1;
            }
        }
        // Beginning of a new edge detected
        if (value == 0) {
            // Remember where the edge started
            edgeStart = x;
        }
    }
}


avgEdgeWidth = sumEdgeWidths / numEdges;
blurScore = avgEdgeWidth / width * 100;