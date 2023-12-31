'use client'
import React, { useEffect, useRef, useState } from "react";
import { AnchorProvider, BN, Program, getProvider, web3 } from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction, clusterApiUrl, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";
import idl from "../idl.json";
import crypto from 'crypto'
import Link from 'next/link'
import Image from "next/image";
import docx from '../public/docx.png'
import pdf from '../public/pdf.png'
import sol from '../public/solana-sol-logo.png'
export default function Home() {
  const [walletKey, setWalletKey] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();
  const [userCategory, setUserCategory] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);

  function getFileExtension(fileName: any) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
      return '';
    }
    return fileName.substring(lastDotIndex + 1).toLowerCase();
  }
  const handleAddFileClick = () => {
    setShowAddDocumentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddDocumentModal(false);
  };
  const hashAndUploadFile = async () => {
    if (!file) {
      alert("Upload a file first!");
      return;
    }
    if(!walletKey){
      alert("Connect wallet first!")
      return
    }
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const hashSum = crypto.createHash('sha256');
      const extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (extension !== 'pdf' && extension !== 'docx') {
        alert("Please upload only pdf or docx file.");
        return
      }      
      hashSum.update(buffer);
      const hex = hashSum.digest('hex');
      const data = new FormData();
      data.set('file', file, `${hex}.${extension}`);
      await addDocument(hex);
      const res = await fetch('api/documents', {
        method: 'POST',
        body: data,
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      ref.current && (ref.current.value = '');
      handleCloseModal()
    } catch (e) {
      console.error(e);
    }
  };
  
  
  
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await hashAndUploadFile();
  };

  const connectWallet = async () => {
    const { solana } = window as any;
    setWalletKey((await solana.connect()).publicKey);
  };
  
  const initialize = async () => {
    const { solana } = window as any;
    const connection = new Connection(clusterApiUrl("devnet"));
    const anchor_provider = new AnchorProvider(connection, solana, {
      commitment: "processed",
    });
    const PROGRAM_SOLANA = new Program(
      JSON.parse(JSON.stringify(idl)),
      new PublicKey("6DBdtVknkP5qE4jYSBdhrnUjZchpXJMNJhk2DeR7Rwvb"),
      anchor_provider
    );
    const allDocuments = await PROGRAM_SOLANA.account.document.all();
    setDocuments(allDocuments);
  };
  useEffect(() => {
    initialize();
  }, []);
  const addDocument = async (hex: string) => {
    const {solana} = window as any;
    const connection = new Connection(clusterApiUrl("devnet"));
    const anchor_provider = new AnchorProvider(connection, solana, {
      commitment: "processed",
    });
    const PROGRAM_SOLANA = new Program(
      JSON.parse(JSON.stringify(idl)),
      new PublicKey("6DBdtVknkP5qE4jYSBdhrnUjZchpXJMNJhk2DeR7Rwvb"),
      anchor_provider
    );
    const keyPair = web3.Keypair.generate();
    const tx = await PROGRAM_SOLANA.methods.addDocument(new PublicKey(walletKey), title, hex, category, description, getFileExtension(file?.name)).accounts({
      document: keyPair.publicKey.toString(),
      signer: anchor_provider.publicKey.toString(),
      systemProgram: web3.SystemProgram.programId.toString(), 
    }).signers([keyPair]).rpc();
    initialize()
  }

  const transferSol = async (recipientAddress: string, fileName: string) => {

    if(!walletKey){
      alert("Connect wallet first")
      return
    }
    const { solana } = window as any;
    const connection = new Connection(clusterApiUrl("devnet"));
    const anchor_provider = new AnchorProvider(connection, solana, {
      commitment: "processed",
    });
  
    if (!anchor_provider.wallet) {
      alert('Please connect your wallet first.');
      return;
    }

    const toRecipient = new PublicKey(recipientAddress);
    const lamportsToSend = LAMPORTS_PER_SOL * 0.008;
    const recentBlockhash = await connection.getRecentBlockhash();

    const feePayer = anchor_provider.wallet.publicKey;

    const transferTransaction = new Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: feePayer,
    }).add(
      SystemProgram.transfer({
        fromPubkey: anchor_provider.wallet.publicKey, 
        toPubkey: toRecipient,
        lamports: lamportsToSend,
      })
    );
  
    const signedTransaction = await solana.signTransaction(transferTransaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
      skipPreflight: false,
    });
    await getFile(fileName)
  };

  const getFile = async (fileName: string) => {
    const response = await fetch(`/api/documents/${fileName}`);
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    
    if (!contentDispositionHeader) {
      console.error('Content-Disposition header not found in the response.');
      return;
    }

    const filenameMatch = /filename=(.+\.(\w+))/.exec(contentDispositionHeader);
    if (!filenameMatch) {
      console.error('Unable to extract filename and extension from Content-Disposition header.');
      return;
    }

    const fullFilename = filenameMatch[1];

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fullFilename;
    link.click();
    initialize();
  }

  const categories = [
    "Science",
    "Math",
    "History",
    "English",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Geography",
    "Social Studies",
    "Foreign Language",
    "Economics",
    "Psychology",
    "Philosophy",
    "Political Science",
    "Health",
    "Technology",
  ];
  
  return (
    <main className="container mx-auto p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-500">Smart Paper Exchange (SPEX)</h1>
        <div className="flex items-center">
          <Link href="/terms-and-conditions" className="text-lg text-blue-500 mr-4">
            Terms and Conditions
          </Link>
          <Link href="/about-us" className="text-lg text-blue-500 mr-4">
            About Us
          </Link>
          <button
            onClick={connectWallet}
            className={`text-xl p-2 rounded ${walletKey ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
            style={{ width: '200px', height: '60px', padding: '8px 16px' }}
          >
            {walletKey ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </header>


      <div className="mb-4">
        <button
          onClick={handleAddFileClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Have your own document? Add here
        </button>
      </div>

      {showAddDocumentModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add Your Document</h2>
              <form onSubmit={submit} className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  maxLength={20}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Description (Max 100 characters)"
                  maxLength={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2 h-40"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((categoryOption) => (
                    <option
                      key={categoryOption.toLowerCase()}
                      value={categoryOption.toLowerCase()}
                    >
                      {categoryOption.charAt(0).toUpperCase() + categoryOption.slice(1)}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  ref={ref}
                  className="mb-2"
                />
                <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="mr-2"
                  />
                  <p>I agree to the <Link href="/terms-and-conditions" className="text-blue-800"> terms and conditions</Link></p>
                </label>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      <div className="flex items-center justify-end">
        <select
          value={userCategory}
          onChange={(e) => setUserCategory(e.target.value)}
          className="w-max p-2 border border-gray-300 rounded mb-2"
          required
        >
          <option value="">All Categories</option> 
          {categories.map((categoryOption) => (
            <option
              key={categoryOption.toLowerCase()}
              value={categoryOption.toLowerCase()}
            >
              {categoryOption.charAt(0).toUpperCase() + categoryOption.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {documents.filter((e) => userCategory === '' || userCategory === e.account.category.toLowerCase()).map((e) => (
              <div key={e.publicKey} className="p-4 border rounded">
                <p className="text-3xl mb-2 text-center font-bold">{e.account.title}</p>
                {e.account.ext === 'docx' && (
                  <div className="mb-2 flex items-center justify-center">
                    <Image src={docx} alt="docx" width={300} height={250} />
                  </div>
                )}
                {e.account.ext === 'pdf' && (
                  <div className="mb-2 flex items-center justify-center">
                    <Image src={pdf} alt="pdf" width={300} height={250} />
                  </div>
                )}
                <p className="text-lg mb-4 line-clamp-2">Category: {e.account.category.toUpperCase()}</p>
                <p className="text-lg mb-4">Description: {e.account.description}</p>
                <p className="text-xl mb-4 flex items-center">
                  <Image src={sol} alt="docx" width={20} height={20} />
                  {(LAMPORTS_PER_SOL * 0.0008) / LAMPORTS_PER_SOL}
                </p>
                <button
                  onClick={() => transferSol(e.account.owner.toString(), e.account.hashContent + "." + e.account.ext)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            ))}
        </div>
    </main>
  );
  
}