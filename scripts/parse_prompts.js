const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const DOCX_PATH = path.join(__dirname, '../data/prompts.docx');
const JSON_OUTPUT_PATH = path.join(__dirname, '../data/prompts.json');

async function parseDocxToJSON() {
  try {
    console.log('⚡ Starting Cybernetic extraction of Data Vault... ⚡');
    
    // Ensure data directory exists
    const dataDir = path.dirname(DOCX_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log(`Created DATA directory at: ${dataDir}`);
      console.log(`=> Please place your 'prompts.docx' inside ${dataDir} and re-run this script.`);
      return;
    }

    if (!fs.existsSync(DOCX_PATH)) {
      console.error(`❌ ERROR: Could not find ${DOCX_PATH}`);
      return;
    }

    // Extract raw text from docx
    const result = await mammoth.extractRawText({ path: DOCX_PATH });
    const rawText = result.value;

    // Segment text by double-line breaks
    const rawBlocks = rawText.split(/\n\s*\n/);
    
    const formattedPrompts = [];
    let currentCategory = 'General';
    let hasSeenFirstCategory = false;

    // Heuristics Processor
    rawBlocks.forEach((block) => {
      let text = block.trim();
      if (!text) return;

      // Extract Category using regex for "KATEGORI 1: Name"
      const categoryMatch = text.match(/KATEGORI\s*\d+:\s*(.*)/i);
      if (categoryMatch) {
        currentCategory = categoryMatch[1].trim();
        hasSeenFirstCategory = true;
        return;
      }
      
      // If we haven't reached the first category yet, skip all intro text
      if (!hasSeenFirstCategory) return;
      
      // Ignore intro text / instructions / empty headers
      if (text.match(/1\.000\+ VIRAL/i) || text.match(/Harga:/i) || text.match(/Langkah/i)) return;
      if (text.length < 30) return; 
      
      // Ignore category descriptive subtext
      if (text.toLowerCase().includes('prompt siap pakai') || text.toLowerCase().includes('kategori')) return;

      const content = text;
      
      // Auto-generate title from first sentence
      let title = content.substring(0, 60);
      const firstPeriodMatch = content.match(/^([^.?!\n]{10,60})[.?!]/);
      if (firstPeriodMatch) {
         title = firstPeriodMatch[1];
      }
      title = title.replace(/\n/g, ' ').trim();
      if (content.length > title.length) title += '...';

      formattedPrompts.push({
        category: currentCategory,
        title: title,
        content: content,
        isPremium: true
      });
    });

    // Synthesize final output
    fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(formattedPrompts, null, 2));
    console.log(`✅ SUCCESS: ${formattedPrompts.length} Prompts compiled to JSON.`);
    console.log(`💾 File saved to: ${JSON_OUTPUT_PATH}`);
    
  } catch (error) {
    console.error('❌ FATAL: Error parsing DOCX structure:', error);
  }
}

parseDocxToJSON();
