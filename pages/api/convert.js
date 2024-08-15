import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    const file = files.file[0];
    const filePath = file.filepath;
    const fileExt = path.extname(file.originalFilename).toLowerCase();

    const outputExt = '.jpg'; // 出力ファイル形式
    const outputFilePath = `${filePath}${outputExt}`;

    try {
      if (fileExt === '.tif' || fileExt === '.tiff' || fileExt === '.eps' || fileExt === '.psd') {
        await sharp(filePath)
          .toFormat('jpeg')
          .toFile(outputFilePath);
      } else {
        await sharp(filePath).toFile(outputFilePath);
      }

      const data = await fs.readFile(outputFilePath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(data);
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ error: 'File conversion failed' });
    }
  });
};

export default handler;
