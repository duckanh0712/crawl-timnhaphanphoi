#!/bin/bash
sudo docker-compose -f docker-compose.yml up -d
export PORT=3001
export MONGODB_URI=mongodb://localhost:27017/cz-crawl-html
export TIMNHAPHANPHOI_API=https://timnhaphanphoi.vn
export TTS_API=https://thitruongsi.com
export AUTO_INDEX=true
export CHOZOI_API=https://api.chozoi.com
npm run dev
# npm run start
