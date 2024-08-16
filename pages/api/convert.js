import formidable from 'formidable';
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    const file = files.file;
    if (!file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath;
    const outputFormat = fields.format || 'jpg'; // デフォルトの出力形式をjpgに設定

    // Vercel上で書き込み可能な一時ディレクトリにファイルを保存
    const outputFilePath = path.join('/tmp', `output.${outputFormat}`);

    try {
      // Sharpを使用して画像を変換する
      await sharp(filePath)
        .toFormat(outputFormat)
        .toFile(outputFilePath);

      const data = await fs.readFile(outputFilePath);
      res.setHeader('Content-Type', `image/${outputFormat}`);
      res.send(data);

      // 変換後のファイルを削除（不要であればコメントアウトしてください）
      await fs.unlink(outputFilePath);
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ error: 'Conversion failed' });
    }
  });
}
