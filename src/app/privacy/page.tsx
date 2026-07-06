import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — PixelForge AI',
  description: 'Privacy policy for PixelForge AI free image generation tools.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d14]">
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
          <p className="text-slate-300">Last updated: January 1, 2025</p>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">1. Overview</h2>
            <p>
              PixelForge AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our website (the &quot;Service&quot;). PixelForge AI is a project by Osama.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">2. Image Generation</h2>
            <p>
              AI image generation is powered by Pollinations.ai, a free open-source service. Your text prompts are sent directly to Pollinations.ai servers to generate images. We do not store, log, or have access to your prompts or generated images. Please review the{' '}
              <a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                Pollinations.ai privacy policy
              </a>{' '}
              for their data handling practices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">3. Client-Side Processing</h2>
            <p>
              All tool UI processing, prompt construction, image display, and download functionality happen entirely in your browser. Generated images are loaded directly from Pollinations.ai and are not proxied through our servers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">4. Google Analytics</h2>
            <p>
              We use Google Analytics (measurement ID: <code className="text-purple-400 text-xs">G-CMV34ZVLE7</code>) to collect anonymized usage data such as page views, device type, and general geographic location. Google Analytics uses cookies — you can opt out by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                Google Analytics opt-out browser add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">5. Google AdSense</h2>
            <p>
              We display advertisements through Google AdSense (publisher ID: <code className="text-purple-400 text-xs">ca-pub-7878398091851771</code>). AdSense may use cookies and web beacons to serve ads. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                Google Ad Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">6. LemonSqueezy (Payments)</h2>
            <p>
              If you purchase a Pro subscription, payment processing is handled by{' '}
              <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                LemonSqueezy
              </a>
              . We do not store your credit card information. LemonSqueezy has its own privacy policy governing payment data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">7. Local Storage</h2>
            <p>
              We use your browser&apos;s <code className="text-purple-400 text-xs">localStorage</code> to track your daily free usage count (limited to 10 generations per day on the free tier). This data stays on your device and is not transmitted to us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">8. Third-Party Links</h2>
            <p>
              Our site contains links to third-party services (ToolPDF, CalcHub, ConvertFlow, SEOKit). We are not responsible for the privacy practices of those external sites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">10. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us via the PixelForge AI website.
            </p>
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/[0.06] py-6 text-center">
        <p className="text-xs text-slate-600">&copy; 2025 PixelForge AI — A Project By Osama</p>
      </footer>
    </div>
  );
}