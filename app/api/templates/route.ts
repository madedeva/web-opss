import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const serveTemplate = async (req: NextApiRequest, res: NextApiResponse) => {
  const paperTemplate = req.query.paper_template as string;
  if (!paperTemplate) {
    return res.status(400).json({ error: 'Paper template name is required' });
  }

  const filePath = path.resolve(process.cwd(), 'public/uploads/paper_template', paperTemplate);

  try {
    const fileBuffer = await fs.readFile(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${paperTemplate}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBuffer);
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      res.status(404).json({ error: 'File not found' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default serveTemplate;
