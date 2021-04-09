docker-compose -f docker-compose.yml up -d
set PORT=3001
set MONGODB_URI=mongodb://localhost:27017/cz-crawl-html
set TIMNHAPHANPHOI_API=https://timnhaphanphoi.vn
set TTS_API=https://thitruongsi.com
npm run dev
