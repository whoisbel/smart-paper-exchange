import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase.config';
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const storageRef = ref(storage, 'documents/' + file.name);
  const bytes = await file.arrayBuffer();
  await uploadBytes(storageRef, bytes);

  return NextResponse.json({ success: true });
}