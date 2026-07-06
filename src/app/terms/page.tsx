import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — PixelForge AI',
  description: 'Terms of service for PixelForge AI free image generation tools.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d14]">
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-8">
          Terms of Service
        </h1>

        <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
          <p className="text-slate-300">Last updated: January 1, 2025</p>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PixelForge AI (the &quot;Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">2. Description of Service</h2>
            <p>
              PixelForge AI provides free AI image generation tools powered by open-source models via Pollinations.ai. We do not guarantee the quality, accuracy, or availability of generated images. Image generation depends on third-party services which may experience downtime.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">3. Free Tier</h2>
            <p>
              The free tier allows up to <strong className="text-slate-300">10 image generations per day</strong>. The daily count is tracked via browser localStorage. Images generated on the free tier include a &quot;A Project By Osama&quot; watermark. We reserve the right to change the free tier limits at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">4. Pro Subscription</h2>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong className="text-slate-300">Weekly:</strong> $1 per week, billed weekly via LemonSqueezy. Cancel anytime.</li>
              <li><strong className="text-slate-300">Monthly:</strong> $2 per month (save 50% vs weekly), billed monthly.</li>
              <li><strong className="text-slate-300">Yearly:</strong> $12 per year (save 50% vs monthly), billed annually.</li>
              <li><strong className="text-slate-300">Lifetime:</strong> $25 one-time payment. Lifetime access to all Pro features.</li>
            </ul>
            <p className="mt-3">
              Pro benefits include unlimited generations, no watermark, priority generation, and access to all future tools and model upgrades. Subscriptions are managed through LemonSqueezy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">5. Generated Content</h2>
            <p>
              Images generated through PixelForge AI are provided for your use. You are free to use, modify, and distribute generated images for personal and commercial purposes, subject to the terms of the underlying AI model (Pollinations.ai). We do not claim ownership of generated content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">6. Use of the Service</h2>
            <p>You agree to use PixelForge AI only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
              <li>Generate images that are illegal, harmful, threatening, abusive, or defamatory.</li>
              <li>Use automated scripts to abuse the Service.</li>
              <li>Attempt to bypass usage limits or watermarking.</li>
              <li>Use the Service in any way that violates applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. We do not guarantee the availability, quality, or accuracy of AI-generated images.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">8. Limitation of Liability</h2>
            <p>
              In no event shall PixelForge AI or its operators be liable for any damages arising from your use of the Service or generated content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Continued use of the Service after changes are posted constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-200 mb-3">10. Contact</h2>
            <p>
              For questions about these Terms, please contact us via the PixelForge AI website.
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