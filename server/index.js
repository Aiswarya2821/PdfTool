// server/index.js
const express = require('express');
const multer = require('multer');
const PDFMerger = require('pdf-merger-js');
const path = require('path');
const app = express();
const port = 5000;

// Setup multer for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/api/merge', upload.array('pdfs'), async (req, res) => {
  try {
    const pdfMerger = new PDFMerger();

    // Add uploaded PDFs to the merger
    req.files.forEach((file) => {
      pdfMerger.add(path.join(__dirname, file.path));
    });

    // Merge PDFs and send the merged PDF as a response
    const mergedPDF = await pdfMerger.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(mergedPDF);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error merging PDFs');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
