import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import * as path from 'path';
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // const path = `./public/documents/${file.name}`;
  const paths = path.join(process.cwd(), 'public', 'documents', `${file.name}`);
  await writeFile(paths, buffer);
  console.log(`open ${paths} to see the uploaded file`);
  return NextResponse.json({ success: true });
}