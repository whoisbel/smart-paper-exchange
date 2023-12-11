import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/">
            <h1 className="text-4xl font-bold text-blue-500">
              Smart Paper Exchange (SPEX)
            </h1>
        </Link>
      </header>

      <section className="mb-6">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600 mb-4">
          Smart Paper Exchange (SPEX) is a cutting-edge platform designed to
          revolutionize how academic papers are shared and accessed. We leverage
          blockchain technology, specifically on the Solana blockchain, to provide
          users with a secure, transparent, and efficient environment for
          knowledge exchange.
        </p>
        <p className="text-gray-600 mb-4">
          At SPEX, we recognize the transformative potential of blockchain in
          preserving the integrity of academic content. By utilizing the Solana
          blockchain, we ensure that every transaction and document access is
          transparent, tamper-resistant, and verifiable.
        </p>
        <p className="text-gray-600 mb-4">
          Solana's high-performance blockchain not only enhances the security of our
          platform but also enables us to offer users an affordable and swift
          experience. With transaction costs often less than a dollar, SPEX
          prioritizes accessibility without compromising on security and
          efficiency.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <img
              src="https://placekitten.com/50/50"
              alt="Team Member"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">Michael John Angelo Belciña</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          Have questions or suggestions? We'd love to hear from you! Reach out to
          us at{' '}
          <a href="mailto:info@spex.com" className="text-blue-500 hover:underline">
            info@spex.com
          </a>
          .
        </p>
        <p className="text-gray-600">
          Smart Paper Exchange (SPEX) - Connecting Knowledge, Empowering Minds.
        </p>
      </section>
    </div>
  );
}
