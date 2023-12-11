import { NextResponse } from "next/server";
import fs from 'fs';
import * as path from 'path';

type Params = {
  fileName: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const requestedFileName = params.fileName;
  const documentsDir = path.join(process.cwd(), 'public', 'documents');

  try {
    const files = fs.readdirSync(documentsDir);
    const matchingFile = files.find(file => file.startsWith(requestedFileName));

    if (!matchingFile) {
      throw new Error('File not found');
    }

    const filePath = path.join(documentsDir, matchingFile);
    const fileStream = fs.readFileSync(filePath);
    const headers = {
      'Content-Disposition': `attachment; filename=${matchingFile}`,
      'Content-Type': 'application/octet-stream',
    };

    return new NextResponse(fileStream, { status: 200, headers });
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return NextResponse.json({ status: 500, error: 'Error reading file.' });
  }
}
