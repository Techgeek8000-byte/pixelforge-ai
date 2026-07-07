export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

export const toolMetaMap: Record<string, ToolMeta> = {
  'text-to-image': {
    title: 'Text to Image — Free AI Image Generator | PixelForge AI',
    description: 'Generate stunning AI images from text descriptions. Free online AI image generator with photorealistic, anime, and art styles. No signup needed.',
    keywords: ['text to image', 'AI image generator', 'text to image AI', 'AI art generator', 'free AI image generator', 'generate image from text'],
  },
  'ai-avatar': {
    title: 'AI Avatar Maker — Create Free AI Avatars Online | PixelForge AI',
    description: 'Create unique AI-generated avatars and profile pictures for free. Photorealistic, anime, cartoon, and 3D styles available. No signup required.',
    keywords: ['AI avatar maker', 'AI avatar generator', 'AI profile picture', 'free avatar maker', 'AI portrait generator'],
  },
  'ai-logo': {
    title: 'AI Logo Creator — Generate Free Logos with AI | PixelForge AI',
    description: 'Generate professional AI logos for brands, startups, and projects. Free online AI logo maker with minimalist, modern, and luxury styles.',
    keywords: ['AI logo creator', 'AI logo generator', 'free logo maker', 'AI logo design', 'brand logo generator'],
  },
  'ai-wallpaper': {
    title: 'AI Wallpaper Generator — Free AI Wallpapers Desktop & Mobile | PixelForge AI',
    description: 'Create stunning AI wallpapers for desktop and mobile. Free online AI wallpaper generator with nature, abstract, space, and anime styles.',
    keywords: ['AI wallpaper generator', 'AI wallpaper', 'free wallpaper', 'desktop wallpaper AI', 'mobile wallpaper AI'],
  },
  'ai-thumbnail': {
    title: 'AI YouTube Thumbnail — Free Thumbnail Generator | PixelForge AI',
    description: 'Generate eye-catching AI YouTube thumbnails. Free online AI thumbnail creator with bold, dramatic, gaming, and professional styles.',
    keywords: ['AI YouTube thumbnail', 'AI thumbnail generator', 'YouTube thumbnail maker', 'free thumbnail generator', 'AI thumbnail creator'],
  },
  'ai-social': {
    title: 'AI Social Media Post — Free Post Image Generator | PixelForge AI',
    description: 'Create Instagram, Twitter, LinkedIn, and social media post images with AI. Free online generator with lifestyle, business, and motivational styles.',
    keywords: ['AI social media post', 'Instagram post generator', 'AI post maker', 'social media image AI', 'free social post generator'],
  },
  'ai-art': {
    title: 'AI Art Studio — Free AI Art Generator Online | PixelForge AI',
    description: 'Create museum-quality digital art with AI. Free online AI art studio with impressionism, surrealism, renaissance, and Japanese art styles.',
    keywords: ['AI art studio', 'AI art generator', 'free AI art', 'digital art AI', 'AI painting generator'],
  },
  'ai-icon': {
    title: 'AI Icon Generator — Free App & UI Icon Maker | PixelForge AI',
    description: 'Generate app icons, favicons, and UI icons with AI. Free online icon generator with flat design, gradient, glassmorphism, and 3D styles.',
    keywords: ['AI icon generator', 'AI icon maker', 'app icon generator', 'free icon maker', 'AI favicon generator'],
  },
  'ai-meme': {
    title: 'AI Meme Creator — Free Funny AI Meme Generator | PixelForge AI',
    description: 'Generate funny AI meme templates and reaction images. Free online AI meme creator with classic, wholesome, sarcastic, and dark humor styles.',
    keywords: ['AI meme creator', 'AI meme generator', 'free meme maker', 'AI funny images', 'meme template generator'],
  },
  'ai-product': {
    title: 'AI Product Photo — Free Product Photography Generator | PixelForge AI',
    description: 'Generate professional AI product photos for e-commerce. Free online AI product photography with studio lighting, lifestyle, and luxury styles.',
    keywords: ['AI product photo', 'AI product photography', 'e-commerce photo AI', 'free product image generator', 'AI product image'],
  },
};
