export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="rounded-3xl bg-[#004643] p-10 shadow-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#ABD1C6]">
            Legal
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#D1FAE5]">
            This Privacy Policy explains how Tutorly AI collects,
            uses, stores, and protects your information while using
            our educational platform and AI-powered learning tools.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-xs text-[#ABD1C6]">
                Effective Date
              </p>

              <p className="mt-1 font-semibold text-white">
                May 11, 2026
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-xs text-[#ABD1C6]">
                Last Updated
              </p>

              <p className="mt-1 font-semibold text-white">
                May 11, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          {/* Section */}
          <section className="border-b border-slate-100 pb-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              1. Introduction
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Tutorly AI ("we", "our", or "us") respects your
              privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we
              collect, use, and safeguard information when you use
              our website, mobile applications, AI learning tools,
              quizzes, flashcards, and educational services.
            </p>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              2. Information We Collect
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#004643]">
                  Account Information
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Email address, authentication provider details,
                  and basic profile information used for account
                  access and personalization.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#004643]">
                  Learning Activity
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Quiz attempts, flashcards viewed, study progress,
                  AI chat interactions, and educational analytics.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#004643]">
                  Device Information
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Device type, operating system, app version,
                  browser type, crash logs, and performance data.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#004643]">
                  Usage Analytics
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  General usage metrics that help improve platform
                  performance, recommendation quality, and user
                  experience.
                </p>
              </div>
            </div>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              3. How We Use Your Information
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Provide personalized educational experiences and AI-generated study assistance.",
                "Track quiz performance and learning progress.",
                "Improve recommendation systems and educational models.",
                "Maintain platform security and prevent abuse.",
                "Provide customer support and account management.",
                "Send important service notifications and updates.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#004643]" />

                  <p className="text-sm leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              4. Data Sharing & Third Parties
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We do not sell your personal information. Your data
              may be shared with trusted infrastructure and service
              providers strictly for operating and improving the
              platform.
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="text-lg font-semibold text-[#004643]">
                Services We May Use
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <li>• Cloud hosting and database providers</li>
                <li>• Analytics and crash reporting services</li>
                <li>• Authentication providers</li>
                <li>• AI infrastructure providers</li>
                <li>• Payment processors (if applicable)</li>
              </ul>
            </div>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              5. Data Security
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We implement reasonable technical and organizational
              measures to protect your information, including secure
              authentication, encrypted connections, and protected
              cloud infrastructure. However, no system can guarantee
              absolute security.
            </p>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              6. Your Rights & Choices
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Access",
                  text: "Request access to the information associated with your account.",
                },
                {
                  title: "Deletion",
                  text: "Request deletion of your account and stored data.",
                },
                {
                  title: "Control",
                  text: "Manage notifications and platform preferences.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 p-6"
                >
                  <h3 className="text-lg font-semibold text-[#004643]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section */}
          <section className="border-b border-slate-100 py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              7. Children's Privacy
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Tutorly AI is not directed toward children under the
              age of 13. We do not knowingly collect personal data
              from children without parental consent where required
              by law.
            </p>
          </section>

          {/* Section */}
          <section className="py-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              8. Contact Information
            </h2>

            <div className="mt-6 rounded-3xl bg-[#004643] p-8">
              <p className="text-base leading-7 text-[#D1FAE5]">
                For questions, privacy requests, or support
                inquiries, contact:
              </p>

              <p className="mt-5 text-xl font-semibold text-white">
                tarunpahade55@gmail.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}