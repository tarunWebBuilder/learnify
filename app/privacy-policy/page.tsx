export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold text-lab-neutral-dark">Privacy Policy</h1>
        <p className="mt-2 text-sm text-lab-neutral-gray">Effective Date: [Insert Date]</p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">1. Introduction</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            Learnify (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) values your privacy.
            This Privacy Policy explains how we collect, use, and protect your information
            when you use our app.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">2. Information We Collect</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            We may collect the following information:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base text-lab-neutral-gray">
            <li>
              <span className="font-semibold text-lab-neutral-dark">Account Information:</span> Email address for login via magic link.
            </li>
            <li>
              <span className="font-semibold text-lab-neutral-dark">Usage Data:</span> How you use the app, such as accessed notebooks, learning paths, and progress tracking.
            </li>
            <li>
              <span className="font-semibold text-lab-neutral-dark">Device Information:</span> Device type, OS version, and app version for performance monitoring.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">3. How We Use Your Information</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            We use your information to:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base text-lab-neutral-gray">
            <li>Provide and maintain the app.</li>
            <li>Track your learning progress and provide personalized experiences.</li>
            <li>Send important updates and notifications regarding your account.</li>
            <li>Improve app features and functionality.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">4. Data Sharing</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            We do not sell or rent your personal information to third parties. We may share
            your data with:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base text-lab-neutral-gray">
            <li>Service providers that help us operate the app (e.g., hosting, analytics).</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">5. Security</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            We take reasonable measures to protect your personal information, including
            encryption and secure data storage. However, no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">6. Your Choices</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            You can choose not to provide certain information, but some features may not
            function properly. You can also request deletion of your data by contacting us
            at [contact email].
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">7. Children&rsquo;s Privacy</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            Our app is not intended for children under 13. We do not knowingly collect
            information from children.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">8. Changes to This Policy</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            We may update this Privacy Policy from time to time. Changes will be posted in
            the app and take effect immediately upon posting.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-lab-neutral-dark">9. Contact Us</h2>
          <p className="text-base leading-relaxed text-lab-neutral-gray">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-base font-semibold text-lab-neutral-dark">[Your Email]</p>
        </section>
      </div>
    </div>
  )
}
