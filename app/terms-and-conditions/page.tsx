import Link from "next/link";
export default function Home() {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-8 flex items-center justify-between">
          <Link rel="stylesheet" href="/"><h1 className="text-4xl font-bold text-blue-500">Smart Paper Exchange (SPEX)</h1></Link>
        </header>
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">
          Welcome to Smart Paper Exchange (SPEX)! Before using our services, please
          read these terms carefully.
        </p>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p>
            By using SPEX&lsquo;s services, you agree to comply with and be bound by
            these terms and conditions. If you do not agree to these terms,
            please do not use our services.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. User Content</h2>
          <p>
            Users are solely responsible for the content they upload to SPEX.
            SPEX reserves the right to remove any content that violates our
            policies or is deemed inappropriate without prior notice.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Payments and Access</h2>
          <p>
            Users may offer their papers for sale, and interested parties can
            purchase access to these papers. SPEX facilitates transactions but is
            not responsible for the content of the papers.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. User Conduct</h2>
          <p>
            Users must not engage in any activity that violates local, state,
            federal, or international laws and regulations. Prohibited
            activities include but are not limited to plagiarism, copyright
            infringement, and fraud.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Privacy Policy</h2>
          <p>
            Our privacy policy outlines how we collect, use, and disclose personal
            information. By using our services, you agree to the terms outlined
            in our privacy policy.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">6. Termination of Accounts</h2>
          <p>
            SPEX reserves the right to suspend or terminate user accounts that
            violate our terms and conditions or for any other reason at our
            discretion.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">7. Modifications to Terms</h2>
          <p>
            SPEX reserves the right to modify these terms and conditions at any
            time. Users will be notified of any changes, and continued use of our
            services constitutes acceptance of the modified terms.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">9. Blockchain Storage</h2>
          <p>
            To ensure the immutability of certain data, SPEX may utilize
            blockchain technology to store and timestamp certain information.
            Once data is stored on the blockchain, it becomes tamper-resistant,
            providing an additional layer of security and transparency. Users
            acknowledge and agree that specific details, such as transaction
            records and document authenticity, may be recorded on the blockchain.
          </p>
          <p>
            It&lsquo;s important to note that while blockchain provides enhanced
            security, SPEX reserves the right to comply with applicable laws and
            regulations that may require the removal or modification of certain
            information.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">8. Contact Information</h2>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at{' '}
            <a
              href="mailto:customer-support@spex.com"
              className="text-blue-500 hover:underline"
            >
              customer-support@spex.com
            </a>
            .
          </p>
        </section>
      </div>
    );
  }
  