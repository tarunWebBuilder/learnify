export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto flex max-w-3xl flex-col px-6 py-16">
        {/* Header */}
        <div className="rounded-3xl bg-[#7F1D1D] p-10 shadow-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-200">
            Account Management
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
            Delete Account
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-red-100">
            You can request permanent deletion of your Tutorly AI
            account and associated learning data from this page.
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-[#7F1D1D]">
              Important Information
            </h2>

            <ul className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <li>
                • Your account deletion request is permanent and
                cannot be undone.
              </li>

              <li>
                • Quiz history, flashcards, study progress, and AI
                learning activity may be removed permanently.
              </li>

              <li>
                • Some information may be retained temporarily for
                legal, fraud prevention, or security purposes.
              </li>

              <li>
                • Processing account deletion requests may take up
                to 7 days.
              </li>
            </ul>
          </div>

          {/* Steps */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#001E1D]">
              How to Request Account Deletion
            </h2>

            <div className="mt-6 space-y-5">
              {[
                "Send an email using your registered account email address.",
                "Use the subject line: DELETE ACCOUNT REQUEST",
                "Include your registered email address inside the message.",
                "Our team will verify and process your deletion request.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#004643] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="flex-1 text-base leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-10 rounded-3xl bg-[#004643] p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ABD1C6]">
              Contact Email
            </p>

            <p className="mt-4 text-2xl font-semibold text-white">
              tarunpahade55@gmail.com
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#D1FAE5]">
              Please send your deletion request from the email
              associated with your Tutorly AI account to help us
              verify ownership securely.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="text-sm leading-7 text-slate-500">
              By using Tutorly AI, you acknowledge that account
              deletion may remove access to educational progress,
              AI-generated learning history, and saved study data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}