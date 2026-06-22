/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:'#685d4a', secondary:'#70585b', background:'#fcf9f8', surface:'#fcf9f8', 'surface-low':'#f6f3f2', 'surface-mid':'#f0eded', 'surface-high':'#e5e2e1', outline:'#cec5ba', text:'#1c1b1b', muted:'#4b463d', cream:'#f7e7ce', blush:'#fbdbde', lavender:'#e7e7fb'
      },
      fontFamily: { sans:['Inter','sans-serif'], serif:['Playfair Display','serif']},
      boxShadow: { ambient:'0 40px 40px -15px rgba(92,93,110,.10)', glow:'0 24px 80px rgba(104,93,74,.18)'},
      animation: { float:'float 4s ease-in-out infinite', shimmer:'shimmer 2.5s linear infinite'},
      keyframes: { float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-14px)'}}, shimmer:{'0%':{backgroundPosition:'-200% 0'},'100%':{backgroundPosition:'200% 0'}}}
    }
  },
  plugins: []
}
