// PixelForge — Tool page intro text + FAQ data
export const toolContent: Record<string, { intro: string; faqs: { question: string; answer: string }[] }> = {
  'text-to-image': {
    intro: 'Transform any text description into stunning AI-generated artwork with our free Text to Image generator. Describe what you want — a "sunset over mountains in oil painting style" or "futuristic city at night, cyberpunk aesthetic" — and our AI creates it in seconds. Choose from multiple art styles including photorealistic, anime, digital art, oil painting, 3D render, and pixel art. Perfect for content creators, designers, and anyone who needs unique visuals fast.',
    faqs: [
      { question: 'How do I write a good AI image prompt?', answer: 'Be specific about: (1) Subject — what is the main focus, (2) Style — photorealistic, anime, oil painting, etc., (3) Setting/background — where is it, (4) Lighting/mood — dramatic, soft, cinematic, (5) Details — colors, textures, composition. Example: "A golden retriever puppy sitting in a sunlit garden, shallow depth of field, photorealistic, warm tones" works better than just "dog".' },
      { question: 'How many images can I generate for free?', answer: 'The free plan gives you 10 image generations per day. Pro plans ($1/week and up) unlock unlimited generations with no watermark. Generated images are yours to use for personal and commercial purposes.' },
    ],
  },
  'ai-avatar': {
    intro: 'Create professional AI-generated avatars and profile pictures in seconds. Describe your ideal avatar — gender, style, expression, background — and get multiple unique results. Perfect for social media profiles, gaming avatars, professional headshots, and brand identities. No photography skills or expensive equipment needed — just your imagination.',
    faqs: [
      { question: 'Can I use AI avatars commercially?', answer: 'Yes — images generated with PixelForge AI can be used for both personal and commercial projects. For Pro users, there are no usage restrictions. Free users should check the current terms of service for any limitations.' },
    ],
  },
  'logo-generator': {
    intro: 'Design custom logos with AI — no design skills needed. Describe your brand, preferred colors, style, and industry, and get unique logo concepts generated instantly. Use them for websites, business cards, social media, and merchandise. Iterate quickly: tweak your description and regenerate until you find the perfect design. Professional logo quality at zero cost.',
    faqs: [
      { question: 'Are AI-generated logos unique?', answer: 'Each generation produces a unique result based on your specific prompt. While the underlying AI model may produce similar results for similar prompts, adding specific details about your brand (colors, industry, style preferences) increases uniqueness significantly.' },
    ],
  },
};
