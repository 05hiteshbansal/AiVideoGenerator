import jsPDF from "jspdf";

/**
 * Generate and download PDF for script variations
 */
export function downloadScriptPDF(variations, productInfo) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const lineHeight = 7;
  let y = margin;

  // Helper to add new page if needed
  const checkPageBreak = (neededSpace = 20) => {
    if (y + neededSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Title
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");
  doc.text("UGC Video Script Variations", margin, y);
  y += 12;

  // Product Info
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text(`Product: ${productInfo.productName}`, margin, y);
  y += lineHeight;
  doc.text(`Brand: ${productInfo.brandName}`, margin, y);
  y += lineHeight;

  const descLines = doc.splitTextToSize(
    `Description: ${productInfo.productDescription}`,
    pageWidth - 2 * margin,
  );
  descLines.forEach((line) => {
    checkPageBreak();
    doc.text(line, margin, y);
    y += lineHeight;
  });
  y += 5;

  // Generate date
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
  y += 12;
  doc.setTextColor(0);

  // Iterate through each variation
  const variationOrder = ["fear_based", "relatable", "authority"];

  variationOrder.forEach((varType) => {
    const variation = variations[varType];
    if (!variation) return;

    checkPageBreak(40);

    // Variation Header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 5, pageWidth - 2 * margin, 12, "F");

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    const title = varType.replace(/_/g, " ").toUpperCase();
    doc.text(title, margin + 3, y + 2);
    y += 12;

    // Metadata
    doc.setFontSize(9);
    doc.setFont(undefined, "italic");
    doc.text(`Hook Style: ${variation.metadata.hookStyle}`, margin + 3, y);
    y += lineHeight;
    doc.text(`Tone: ${variation.metadata.tone}`, margin + 3, y);
    y += lineHeight + 3;

    // Emotional Arc
    doc.setFont(undefined, "bold");
    doc.text("EMOTIONAL ARC:", margin + 3, y);
    y += lineHeight;

    doc.setFont(undefined, "normal");
    variation.metadata.emotionalArc.forEach((arc) => {
      checkPageBreak();
      doc.text(`Scene ${arc.scene}: ${arc.emotion}`, margin + 8, y);
      y += lineHeight;
    });
    y += 5;

    // Scenes
    doc.setFont(undefined, "bold");
    doc.text("SCENES:", margin + 3, y);
    y += lineHeight + 2;

    variation.scenes.forEach((scene, index) => {
      checkPageBreak(30);

      // Scene number
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text(`Scene ${index + 1}`, margin + 5, y);
      y += lineHeight;

      // Content text
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      const contentLines = doc.splitTextToSize(
        `"${scene.content_text}"`,
        pageWidth - 2 * margin - 10,
      );
      contentLines.forEach((line) => {
        checkPageBreak();
        doc.text(line, margin + 10, y);
        y += lineHeight;
      });

      // Image prompt
      doc.setFont(undefined, "italic");
      doc.setFontSize(8);
      const promptLines = doc.splitTextToSize(
        `Visual: ${scene.image_prompt}`,
        pageWidth - 2 * margin - 10,
      );
      promptLines.forEach((line) => {
        checkPageBreak();
        doc.text(line, margin + 10, y);
        y += lineHeight - 1;
      });

      if (scene.emotion) {
        doc.setTextColor(100);
        doc.text(`Emotion: ${scene.emotion}`, margin + 10, y);
        doc.setTextColor(0);
        y += lineHeight;
      }

      y += 5;
    });

    y += 10;
  });

  // Save PDF
  const filename = `UGC_Script_${productInfo.productName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
  doc.save(filename);
}
