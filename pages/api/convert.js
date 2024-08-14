import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

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

    const file = files.file[0]; // 単一ファイルを処理
    const filePath = file.filepath;
    const fileExt = path.extname(file.originalFilename).toLowerCase();

    const outputExt = '.jpg'; // 出力ファイル形式
    const outputFilePath = `${filePath}${outputExt}`;

    let convertCommand;

    // ファイル形式に応じたコマンドを構築
    if (fileExt === '.tif' || fileExt === '.tiff') {
      convertCommand = `magick convert "${filePath}[0]" -density 300 -flatten "${outputFilePath}"`;
    } else if (fileExt === '.eps') {
      convertCommand = `magick convert "${filePath}[0]" -density 300 -flatten "${outputFilePath}"`;
    } else {
      convertCommand = `magick convert "${filePath}" "${outputFilePath}"`;
    }

    exec(convertCommand, async (error) => {
      if (error) {
        console.error('Conversion error:', error);
        return res.status(500).json({ error: 'File conversion failed' });
      }

      try {
        // 生成された出力ファイルが存在するか確認
        const fileExists = await fs.access(outputFilePath).then(() => true).catch(() => false);

        if (!fileExists) {
          throw new Error(`Output file not found: ${outputFilePath}`);
        }

        const data = await fs.readFile(outputFilePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
      } catch (readError) {
        console.error('File read error:', readError);
        res.status(500).json({ error: 'Error reading the output file' });
      }
    });
  });
};

export default handler;
