import PDFDocument from 'pdfkit';

export const generateInvoicePDF = (invoice) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    // Invoice Header
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();

    // Client Details
    doc.fontSize(12).text(`Client: ${invoice.client.name}`);
    doc.text(`Email: ${invoice.client.email}`);
    if(invoice.client.address) doc.text(`Address: ${invoice.client.address}`);
    doc.moveDown();

    // Invoice Items Table
    doc.font('Helvetica-Bold');
    doc.text('Description', 50, 200);
    doc.text('Quantity', 250, 200);
    doc.text('Rate', 350, 200);
    doc.text('Amount', 450, 200);
    doc.font('Helvetica');

    let y = 220;
    invoice.items.forEach(item => {
      doc.text(item.description, 50, y);
      doc.text(item.quantity.toString(), 250, y);
      doc.text(`$${item.rate.toFixed(2)}`, 350, y);
      doc.text(`$${(item.quantity * item.rate).toFixed(2)}`, 450, y);
      y += 20;
    });

    // Total
    doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
    doc.font('Helvetica-Bold').text(`Total: $${invoice.total.toFixed(2)}`, 450, y + 30);

    doc.end();
  });
};