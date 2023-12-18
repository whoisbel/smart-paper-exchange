import { NextResponse } from "next/server";
import { storage } from "@/firebase.config";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

type Params = {
  fileName: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const requestedFileName = params.fileName;
  const documentsRef = ref(storage, 'documents/' + requestedFileName);

  try {
    const downloadURL = await getDownloadURL(documentsRef);
    const metadata = await getMetadata(documentsRef);

    const headers = {
      'Content-Disposition': `attachment; filename=${requestedFileName}`,
      'Content-Type': metadata.contentType || 'application/octet-stream',
    };
    const fileContent = await fetch(downloadURL).then((res) => res.arrayBuffer());
    return new NextResponse(fileContent, { status: 200, headers });
  } catch (error) {
    console.error(`Error fetching file from Firebase Storage: ${error}`);
    return NextResponse.json({ status: 500, error: 'Error fetching file.' });
  }
}