// --- Setup Loading Animation ---
let width = 0;
const intervalTime = 50;
const maxTime = 3000;
const steps = maxTime / intervalTime;
const increment = 100 / steps;

const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');

// --- 1. KODE CSS untuk Tampilan Konsol Retro ---
// (Tidak ada perubahan di sini)
const gameboyCSS = `
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        font-family: 'Press Start 2P', cursive;
        color: #f8f8f8;
        overflow: hidden;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    }

    .console-wrapper {
        position: relative;
        padding: 25px;
        border-radius: 20px;
        box-shadow: 0 0 40px #e81f7f, 0 0 80px rgba(232, 31, 127, 0.5);
        background-color: transparent;
    }

    .console {
        width: 380px;
        height: 580px;
        background-color: #d1d1d1;
        border-radius: 15px;
        border: 3px solid #b0b0b0;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 25px;
        box-sizing: border-box;
    }

    .power-indicator {
        position: absolute;
        top: 15px;
        left: 20px;
        font-size: 0.7em;
        color: #444;
        text-shadow: none;
    }

    .power-indicator::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #ff0000;
        border-radius: 50%;
        margin-right: 5px;
        box-shadow: 0 0 5px #ff0000;
    }

    .screen-area {
        background-color: #444;
        border: 5px solid #333;
        border-radius: 8px;
        width: 90%;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.7);
    }

    .screen {
        background-color: #315132;
        width: 90%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #8cff8c;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .screen-text {
        margin: 5px 0;
        font-size: 1.4em;
        text-shadow: 0 0 5px #8cff8c;
    }

    .secondary-text {
        font-size: 1.1em;
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }

    .battery-indicator {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 0.7em;
        color: #ff0000;
        text-shadow: 0 0 3px #ff0000;
    }

    .menu-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 30px;
        width: 90%;
        flex-wrap: wrap;
    }
    .menu-btn {
        background-color: #f8f8f8;
        color: #444;
        border: 2px solid #a0a0a0;
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 0.7em;
        font-family: 'Press Start 2P', cursive;
        cursor: pointer;
        box-shadow: 0 3px 0 #909090;
        transition: all 0.1s ease;
        min-width: 70px;
    }
    .menu-btn:nth-child(1) { background-color: #f09; color: white; border-color: #c07; box-shadow: 0 3px 0 #a05; }
    .menu-btn:nth-child(2) { background-color: #ff0; color: #444; border-color: #cc0; box-shadow: 0 3px 0 #aa0; }
    .menu-btn:nth-child(3) { background-color: #a0f; color: white; border-color: #80c; box-shadow: 0 3px 0 #60a; }
    .menu-btn:nth-child(4) { background-color: #0f0; color: #444; border-color: #0c0; box-shadow: 0 3px 0 #0a0; }

    .menu-btn:active {
        transform: translateY(3px);
        box-shadow: none;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 85%;
        margin-top: 40px;
        padding: 0 10px;
    }

    .dpad {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #666;
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
        border: 2px solid #555;
    }

    .dpad-center {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #444;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 3px;
        box-shadow: inset 0 0 3px rgba(0,0,0,0.7);
    }

    .dpad-btn {
        position: absolute;
        background-color: #444;
        width: 30px;
        height: 30px;
        border-radius: 3px;
        box-shadow: 0 2px 0 #333;
        transition: all 0.05s ease;
    }

    .dpad-btn:active {
        transform: translateY(2px);
        box-shadow: none;
    }

    .dpad-up { top: 0; left: 50%; transform: translateX(-50%); }
    .dpad-down { bottom: 0; left: 50%; transform: translateX(-50%); }
    .dpad-left { left: 0; top: 50%; transform: translateY(-50%); }
    .dpad-right { right: 0; top: 50%; transform: translateY(-50%); }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .action-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-family: 'Press Start 2P', cursive;
        font-size: 1.2em;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        transition: all 0.05s ease;
    }

    .action-btn:active {
        transform: translateY(4px);
        box-shadow: none;
    }

    .btn-a {
        background-color: #ff0000;
    }

    .btn-b {
        background-color: #007bff;
        position: relative;
        right: -20px;
    }
    
    .start-select-buttons {
        display: flex;
        gap: 30px;
        margin-top: 50px;
        width: 80%;
        justify-content: center;
    }

    .small-btn {
        background-color: #555;
        color: #f8f8f8;
        border: 2px solid #444;
        border-radius: 15px;
        padding: 5px 15px;
        font-size: 0.6em;
        font-family: 'Press Start 2P', cursive;
        cursor: pointer;
        box-shadow: 0 2px 0 #333;
        transition: all 0.05s ease;
    }

    .small-btn:active {
        transform: translateY(2px);
        box-shadow: none;
    }

    .select-btn {
        background-color: #777;
    }

    .start-btn {
        background-color: #ff0000;
        box-shadow: 0 2px 0 #cc0000;
    }

    .decorative-lines {
        position: absolute;
        right: 20px;
        bottom: 30px;
        width: 30px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }

    .line {
        width: 100%;
        height: 3px;
        background-color: #999;
        border-radius: 1.5px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    .line:nth-child(2) { width: 80%; }
    .line:nth-child(3) { width: 60%; }
`;

// --- 2. KODE CSS untuk Tampilan Pesan (EFEK KETIK & BISA DI-SCROLL) ---
// (Tidak ada perubahan di sini)
const messageCSS = `
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        font-family: 'Press Start 2P', cursive;
        color: #f8f8f8;
        overflow: hidden;
    }

    .message-container {
        width: 500px;
        background-color: #000;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 40px #e81f7f, 0 0 80px rgba(232, 31, 127, 0.5);
        border: 2px solid #e81f7f;
        text-align: center;
    }

    .message-box {
        background-color: #000;
        border: 3px solid #0f0;
        box-shadow: 0 0 10px #0f0, inset 0 0 10px #0f0;
        padding: 15px;
        text-align: left;
        position: relative;
        height: 300px; 
        overflow-y: auto; 
        color: white;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.9em;
        line-height: 1.5;
        white-space: pre-wrap;
    }
    
    /* Sembunyikan scrollbar tapi tetap bisa di-scroll */
    .message-box::-webkit-scrollbar { width: 0px; background: transparent; }
    .message-box { scrollbar-width: none; }
    
    /* Kursor Berkedip */
    @keyframes blinkCursor {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }

    h2 {
        color: white;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #f8f8f8;
    }

    .button-group {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
    }

    .action-btn {
        font-family: 'Press Start 2P', cursive;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.7em;
        box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        transition: transform 0.1s;
    }

    .action-btn:active {
        transform: translateY(4px);
        box-shadow: none;
    }

    .next-btn {
        background-color: #0f0;
        color: #000;
        box-shadow: 0 4px 0 #0a0;
    }

    .back-btn {
        background-color: #f00;
        color: white;
        box-shadow: 0 4px 0 #c00;
    }
`;

// --- 3. KODE CSS untuk Tampilan Photobox Gallery BARU (MEMANJANG) ---
// (Tidak ada perubahan di sini)
const galleryCSS = `
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        font-family: 'Press Start 2P', cursive;
        color: #f8f8f8;
        overflow-y: auto; /* Memungkinkan body scroll jika konten galeri terlalu panjang */
    }

    .gallery-container {
        width: 500px;
        background-color: #000;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 40px #ff0, 0 0 80px rgba(255, 255, 0, 0.5); /* Neon Kuning */
        border: 2px solid #ff0;
        text-align: center;
        margin: 20px auto; /* Margin atas/bawah agar terlihat rapi saat memanjang */
    }

    h2 {
        color: white;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #f8f8f8;
    }
    
    .photobox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 5px 0;
    }

    .photobox-header h3 {
        font-size: 0.9em;
        text-shadow: 0 0 5px #ff0;
        color: #ff0;
        margin: 0;
    }

    .indicator {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        box-shadow: 0 0 8px currentColor;
    }

    .indicator.red {
        background-color: #f00;
        border: 2px solid #a00;
    }

    .indicator.green {
        background-color: #0f0;
        border: 2px solid #0a0;
    }

    .progress-area {
        width: 100%;
        height: 15px;
        background-color: #333;
        border: 2px solid #ff0;
        border-radius: 5px;
        margin-bottom: 20px;
        overflow: hidden;
    }

    .photobox-screen {
        /* Perubahan Kunci: Hapus 'height: 250px;' dan 'overflow-y: scroll;' */
        background-color: #0a0; /* Background grid style */
        background-image: linear-gradient(0deg, transparent 9px, rgba(0,0,0,0.5) 10px),
                          linear-gradient(90deg, transparent 9px, rgba(0,0,0,0.5) 10px);
        background-size: 10px 10px;
        border: 3px dashed #f09; /* Border pink sesuai gambar */
        color: white;
        display: block; 
        text-shadow: 0 0 3px #000;
        padding-bottom: 20px; /* Padding bawah agar tombol cetak tidak mepet */
    }
    
    /* Sembunyikan scrollbar (meskipun sudah dihapus, tetap pertahankan untuk jaga-jaga) */
    .photobox-screen::-webkit-scrollbar { width: 0; }
    .photobox-screen { scrollbar-width: none; }


    .photobox-screen p {
        font-size: 0.8em;
        margin-bottom: 20px;
        text-align: center;
        padding-top: 100px;
    }
    
    /* Atur ulang padding tombol di awal agar tidak terlalu jauh */
    #printArea p {
        padding-top: 50px; 
    }

    .start-print-btn {
        font-family: 'Press Start 2P', cursive;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.7em;
        background-color: #f00;
        color: white;
        box-shadow: 0 4px 0 #c00;
        transition: transform 0.1s;
        border: 2px solid #ff0;
        display: block;
        margin: 0 auto;
    }

    .start-print-btn:active {
        transform: translateY(4px);
        box-shadow: none;
    }

    .bottom-deco {
        height: 10px;
        background-color: #333;
        border: 2px solid #ff0;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    
    .button-group {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }

    .action-btn {
        font-family: 'Press Start 2P', cursive;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.7em;
        box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        transition: transform 0.1s;
    }

    .next-btn {
        background-color: #0f0;
        color: #000;
        box-shadow: 0 4px 0 #0a0;
    }

    .back-btn {
        background-color: #f00;
        color: white;
        box-shadow: 0 4px 0 #c00;
    }
    
    /* Kode CSS Foto */
    .photo-card {
        width: 80%;
        margin: 15px auto;
        background-color: white;
        border: 2px solid #333;
        padding: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        text-align: center;
    }

    .photo-card img {
        width: 100%;
        height: auto;
        display: block;
        border: 1px solid #ddd;
    }

    /* Hapus styling photo-caption karena elemennya akan dihapus */
    .photo-caption {
        /* TIDAK ADA STYLE UNTUK CAPTION */
        margin: 0;
        padding: 0;
        height: 0;
        visibility: hidden;
    }
`;

// --- 4. KODE CSS untuk Tampilan Music Player (REVISI + VOLUME - NO SPEED) ---
// (Tidak ada perubahan di sini)
const musicCSS = `
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        font-family: 'Press Start 2P', cursive;
        color: #f8f8f8;
        overflow: hidden;
    }

    .music-container {
        width: 400px;
        background-color: #000;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 40px #f09, 0 0 80px rgba(255, 0, 153, 0.5); /* Neon Pink */
        border: 2px solid #f09;
        text-align: center;
    }

    h2 {
        color: #0f0; /* Pemutar Musik berwarna Hijau */
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #0f0;
    }
    
    /* Box Pemutar Utama */
    .player-box {
        background-color: #222;
        border: 3px solid #f09;
        box-shadow: 0 0 10px #f09, inset 0 0 10px rgba(255, 0, 153, 0.3);
        padding: 15px;
        text-align: center;
        color: #f8f8f8;
        font-family: 'Courier New', Courier, monospace;
    }

    .cover-art-container {
        width: 100px;
        height: 100px;
        margin: 0 auto 15px auto;
        border: 3px solid #fff;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        overflow: hidden;
    }
    
    .cover-art-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .track-title {
        font-size: 0.9em;
        color: #fff;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        margin-bottom: 15px;
    }

    .progress-bar-music-container {
        width: 90%;
        height: 8px;
        background-color: #555;
        margin: 10px auto;
        border-radius: 4px;
        overflow: hidden;
    }

    .progress-bar-music {
        height: 100%;
        width: 0%;
        background-color: #007bff; /* Warna biru untuk progress */
        border-radius: 4px;
        transition: width 0.3s;
        box-shadow: 0 0 5px #007bff;
    }

    .time-info {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 5px auto 15px auto;
        font-size: 0.7em;
        color: #ccc;
    }

    .controls-music {
        display: flex;
        justify-content: center;
        gap: 20px; /* Disesuaikan untuk 3 tombol */
        margin-top: 15px;
    }

    .control-btn {
        background-color: #444;
        color: white;
        border: 2px solid #fff;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-size: 0.7em; 
        font-family: 'Press Start 2P', cursive;
        cursor: pointer;
        box-shadow: 0 3px 0 #333;
        transition: transform 0.1s;
        line-height: 35px; 
        text-align: center;
    }
    
    .control-btn.play-pause-btn {
        background-color: #0f0;
        color: #000;
        box-shadow: 0 4px 0 #0a0;
        width: 45px;
        height: 45px;
        line-height: 40px;
        font-size: 1.3em;
        font-family: Arial, sans-serif; /* Kembalikan ke font normal untuk simbol */
    }
    
    /* Style khusus untuk tombol kecepatan aktif (Dihapus namun sisa stylenya aman jika ada) */
    .control-btn.active-speed {
        background-color: #007bff !important;
        color: white;
    }

    .control-btn:active {
        transform: translateY(3px);
        box-shadow: none;
    }
    
    /* Style Slider Volume BARU */
    .volume-control {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }

    .volume-control span {
        font-size: 0.9em;
        color: #ccc;
    }

    .volume-slider {
        width: 60%;
        height: 8px;
        -webkit-appearance: none;
        background: #555;
        border-radius: 4px;
        outline: none;
        transition: background 0.2s;
    }

    /* Style untuk thumb (pegangan) pada Chrome/Safari */
    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #0f0; /* Hijau neon */
        cursor: pointer;
        box-shadow: 0 0 5px #0f0;
    }

    /* Style untuk thumb pada Firefox */
    .volume-slider::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #0f0;
        cursor: pointer;
        box-shadow: 0 0 5px #0f0;
        border: none;
    }
    
    
    /* Daftar Putar */
    .playlist-area {
        margin-top: 25px;
        padding: 10px;
        border: 2px solid #f09;
        box-shadow: 0 0 5px #f09;
        text-align: left;
        font-family: 'Courier New', Courier, monospace;
    }
    
    .playlist-area h3 {
        color: #f09;
        font-size: 0.8em;
        margin-top: 0;
        margin-bottom: 10px;
        text-shadow: 0 0 3px #f09;
    }
    
    .track-list {
        height: 80px;
        overflow-y: auto;
        padding-right: 5px;
    }

    /* Style untuk Scrollbar */
    .track-list::-webkit-scrollbar {
        width: 8px;
    }
    .track-list::-webkit-scrollbar-thumb {
        background-color: #f09;
        border-radius: 4px;
    }
    .track-list::-webkit-scrollbar-track {
        background: #333;
    }
    
    .track-item {
        font-size: 0.7em;
        padding: 5px 0;
        cursor: pointer;
        border-bottom: 1px dashed #555;
    }
    
    .track-item.current {
        color: #0f0;
        text-shadow: 0 0 5px #0f0;
    }
    
    .track-item:hover {
        background-color: #333;
    }


    .button-group {
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
    }

    .action-btn {
        font-family: 'Press Start 2P', cursive;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.7em;
        box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        transition: transform 0.1s;
    }

    .action-btn:active {
        transform: translateY(4px);
        box-shadow: none;
    }
    
    .next-btn {
        background-color: #0f0;
        color: #000;
        box-shadow: 0 4px 0 #0a0;
    }

    .back-btn {
        background-color: #f00;
        color: white;
        box-shadow: 0 4px 0 #c00;
    }

`;

// --- 5. KODE CSS untuk Tampilan Flower/Ucapan (DIHAPUS) ---
// flowerCSS dihapus sepenuhnya.

// --- 6. KODE HTML untuk Tampilan Konsol Retro ---
// (Tidak ada perubahan di sini)
const gameboyHTML = `
    <div class="console-wrapper">
        <div class="console">
            <div class="power-indicator">Power</div>

            <div class="screen-area">
                <div class="screen">
                    <p class="screen-text primary-text">FOR YOU!</p>
                    <p class="screen-text secondary-text">Press Start Button</p>
                    <div class="battery-indicator">🔋 Battery</div>
                </div>
            </div>

            <div class="menu-buttons">
                <button class="menu-btn">Message</button>
                <button class="menu-btn">Gallery</button>
                <button class="menu-btn">Music</button>
                <button class="menu-btn">Flower</button>
            </div>

            <div class="controls">
                <div class="dpad">
                    <div class="dpad-center"></div>
                    <div class="dpad-btn dpad-up"></div>
                    <div class="dpad-btn dpad-down"></div>
                    <div class="dpad-btn dpad-left"></div>
                    <div class="dpad-btn dpad-right"></div>
                </div>

                <div class="action-buttons">
                    <button class="action-btn btn-a">A</button>
                    <button class="action-btn btn-b">B</button>
                </div>
            </div>

            <div class="start-select-buttons">
                <button class="small-btn select-btn">SELECT</button>
                <button class="small-btn start-btn">START</button>
            </div>

            <div class="decorative-lines">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    </div>
`;

// --- 7. KODE HTML untuk Tampilan Pesan (EFEK KETIK) ---
// (Tidak ada perubahan di sini)
const messageHTML = `
    <div class="message-container">
        <h2>Message</h2>
        <div class="message-box">
            <span id="typewriter-text"></span> 
            <span id="cursor" style="color:#0f0; font-size:1.1em; animation: blinkCursor 0.5s infinite;">▌</span> 
        </div>
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">SELANJUTNYA</button>
            <button class="action-btn back-btn" id="backButton">KEMBALI</button>
        </div>
    </div>
`;

// --- 8. KODE HTML untuk Tampilan Photobox Gallery ---
// (Tidak ada perubahan di sini)
const galleryHTML = `
    <div class="gallery-container">
        <h2>Galeri</h2>
        <div class="photobox-header">
            <div class="indicator red" id="statusIndicatorLeft"></div>
            <h3>KOTAK FOTO WEBWEAVER</h3>
            <div class="indicator green" id="statusIndicatorRight"></div>
        </div>

        <div class="progress-area">
            </div>

        <div class="photobox-screen">
            <div id="printArea">
                <p>Photobox siap digunakan</p>
                <button class="start-print-btn" id="startPrintBtn">MULAI CETAK</button>
            </div>
        </div>

        <div class="bottom-deco"></div>
        
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">SELANJUTNYA</button>
            <button class="action-btn back-btn" id="backButton">KEMBALI</button>
        </div>
    </div>
`;

// --- 9. KODE HTML untuk Tampilan Music Player (REVISI FINAL - NO SPEED) ---
// (Tidak ada perubahan di sini)
const musicHTML = `
    <div class="music-container">
        <h2>Pemutar Musik</h2>
        
        <audio id="audioPlayer" preload="auto"></audio> 
        
        <div class="player-box">
            <div class="cover-art-container">
                <img id="coverArt" src="https://i.supaimg.com/f7e4f0de-309d-4876-b33a-e2759905f157.jpg" alt="Cover Art">
            </div>
            
            <p class="track-title" id="trackTitle">N O B E L S A . E X E</p>
            
            <div class="progress-bar-music-container">
                <div class="progress-bar-music" id="musicProgress"></div>
            </div>
            
            <div class="time-info">
                <span id="currentTime">0:00</span>
                <span id="totalTime">0:00</span>
            </div>

            <div class="controls-music">
                <button class="control-btn" id="prevBtn">«</button>
                <button class="control-btn play-pause-btn" id="playPauseBtn">►</button>
                <button class="control-btn" id="nextBtn">»</button>
            </div>
            
            <div class="volume-control">
                <span>🔇</span>
                <input type="range" min="0" max="1" step="0.01" value="1" class="volume-slider" id="volumeSlider">
                <span>🔊</span>
            </div>

        </div>

        <div class="playlist-area">
            <h3>DAFTAR PUTAR:</h3>
            <div class="track-list" id="trackList">
                </div>
        </div>
        
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">SELANJUTNYA</button>
            <button class="action-btn back-btn" id="backButton">KEMBALI</button>
        </div>
    </div>
`;

// --- 10. KODE HTML untuk Tampilan Flower/Ucapan (DIHAPUS) ---
// flowerHTML dihapus sepenuhnya.


// --- 11. Data dan Fungsi Interaksi ---

// Data Pesan
const messageText = `Hai

Kadang aku masih suka mikir, how lucky I am to have you. Dari sekian banyak orang di dunia ini, Tuhan justru kasih aku kamu—yang sabar banget, yang ngerti aku luar dalam, dan yang selalu ada no matter what. Honestly, I never thought I'd find someone like you. Someone yang bisa bikin aku ngerasa tenang just by being around. You make the little things feel so special, and the hard days feel a little easier. I'm super grateful, seriously. Dapetin kamu tuh bukan cuma blessing, tapi juga reminder kalau Tuhan tahu exactly what I need. Thank you for being you, for staying, for loving me even in my worst. I'll keep trying to be the best for you, because you're more than worth it. I love you, always.

* i love youuu xoxo *`;
let i = 0; // Index karakter untuk fungsi ketik
const typingSpeed = 50; // Kecepatan ketik dalam milidetik

// Data Foto untuk Galeri (CAPTION DIHILANGKAN total)
const photoData = [
    // Foto 1
    { src: "https://i.supaimg.com/1dfc8d9c-2484-40f0-8b81-dfbe14e00e53.jpg", caption: "" },
    // Foto 2
    { src: "https://i.supaimg.com/fb5769ee-bd14-463f-b36b-af363b9f399c.jpg", caption: "" },
    // Foto 3
    { src: "https://i.supaimg.com/76708432-d960-484d-8513-954f4fa1c881.jpg", caption: "" },
    // Foto 4
    { src: "https://i.supaimg.com/54f917ae-7474-4f37-97de-0df69a676867.jpg", caption: "" }
];

// Data Daftar Lagu untuk Music Player
const trackList = [
    { 
        title: "That Should Be Me", 
        artist: "Justin Bieber ft. Rascal Flatts", 
        src: "Justin Bieber - That Should Be Me ft. Rascal Flatts.mp3", // <-- PASTIKAN FILE INI ADA DI FOLDER YANG SAMA!
        duration: "3:45", 
        cover: "https://ibb.co.com/1ttbmsPQ" 
    },
    // <<< TEMPAT MENAMBAH LAGU BARU >>>
    { 
        title: "Pixel Dream", 
        artist: "Unknown Artist", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
        duration: "1:00", 
        cover: "https://i.ibb.co/3sX8sY3/cover-retro.png" 
    },
    { 
        title: "8-bit Love", 
        artist: "Code Master", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
        duration: "1:00", 
        cover: "https://i.ibb.co/9vB4xZ3/cover-love.png" 
    },
    { 
        title: "Data Stream", 
        artist: "System Load", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
        duration: "1:00", 
        cover: "https://i.ibb.co/zXp1bY2/cover-data.png" 
    },
];

let currentTrackIndex = 0;
let isPlaying = false;

// Tambahkan Objek Audio Global
const audio = new Audio();

/**
 * UTILITY FUNCTION: Fungsi untuk mengganti seluruh gaya body
 * Karena style.css hanya berisi gaya loading, kita perlu fungsi ini untuk mengganti 
 * gaya body saat masuk ke tampilan Gameboy, dll.
 * * @param {string} cssString - String CSS yang akan disuntikkan.
 */
function applyNewCSS(cssString) {
    let styleElement = document.getElementById('main-runtime-style');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'main-runtime-style';
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = cssString;
}

// Fungsi Pindah ke Tampilan Konsol Retro
function loadGameboyScreen() {
    applyNewCSS(gameboyCSS);
    document.body.innerHTML = gameboyHTML;
    setupGameboyInteractions();
}

// Fungsi Pindah ke Tampilan Pesan
function loadMessageScreen() {
    i = 0; 
    applyNewCSS(messageCSS);
    document.body.innerHTML = messageHTML;

    typeWriter(); 

    // Tombol KEMBALI
    document.getElementById('backButton').addEventListener('click', function() {
        loadGameboyScreen(); 
    });
    
    // Tombol SELANJUTNYA (Menuju Gallery)
    document.getElementById('nextButton').addEventListener('click', function() {
        loadGalleryScreen(); 
    });
}

// Fungsi Efek Ketik
function typeWriter() {
    const displayElement = document.getElementById("typewriter-text");
    const cursor = document.getElementById("cursor");

    if (i < messageText.length) {
        let char = messageText.charAt(i);
        
        if (char === '\n') {
            displayElement.innerHTML += '<br>';
        } else {
            displayElement.innerHTML += char;
        }
        
        // Auto-scroll ke bawah saat mengetik
        const messageBox = displayElement.closest('.message-box');
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight;
        }

        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Sembunyikan kursor setelah selesai
        if (cursor) {
            cursor.style.display = 'none';
        }
    }
}

// Fungsi untuk mencetak foto (SEMUA FOTO MUNCUL SEKALIGUS)
function printPhotos() {
    const screen = document.querySelector('.photobox-screen');
    const printArea = document.getElementById('printArea');
    const indicatorRight = document.getElementById('statusIndicatorRight');
    
    // Hapus konten awal
    printArea.innerHTML = '';
    
    // Set indikator ke Merah (Sibuk)
    indicatorRight.classList.remove('green');
    indicatorRight.classList.add('red');
    
    
    // Timer 500ms untuk simulasi proses singkat sebelum menampilkan semua foto
    setTimeout(() => { 
        photoData.forEach((photo, index) => {
            // 1. Buat elemen foto
            const card = document.createElement('div');
            card.className = 'photo-card printed'; 
            card.innerHTML = `
                <img src="${photo.src}" alt="Photo ${index + 1}">
                `;
            
            // 2. Tambahkan ke layar
            screen.appendChild(card);
        });

        // Setelah semua foto dimuat (instan), scroll ke bawah halaman
        window.scrollTo(0, document.body.scrollHeight); 

        // 3. Set indikator ke Hijau (Selesai)
        indicatorRight.classList.remove('red');
        indicatorRight.classList.add('green');
        
        // Tambahkan teks selesai
        const doneText = document.createElement('p');
        doneText.className = 'screen-text';
        doneText.style.fontFamily = "'Press Start 2P', cursive";
        doneText.style.fontSize = '0.7em';
        doneText.style.marginTop = '20px';
        doneText.style.textAlign = 'center';
        doneText.textContent = "PRINTING COMPLETE";
        screen.appendChild(doneText);
        
        // Tambahkan tombol cetak ulang
        const newStartBtn = document.createElement('button');
        newStartBtn.className = 'start-print-btn';
        newStartBtn.id = 'startPrintBtn';
        newStartBtn.textContent = 'CETAK ULANG';
        screen.appendChild(newStartBtn);
        
        newStartBtn.addEventListener('click', function() {
            loadGalleryScreen();
        });
        
        // Scroll lagi setelah elemen baru ditambahkan
        window.scrollTo(0, document.body.scrollHeight); 


    }, 500); // Jeda 500ms untuk simulasi proses loading singkat
}


// Fungsi Pindah ke Tampilan Photobox Gallery
function loadGalleryScreen() {
    applyNewCSS(galleryCSS);
    document.body.innerHTML = galleryHTML;

    // Setup tombol Photobox
    document.getElementById('startPrintBtn').addEventListener('click', function() {
        // Nonaktifkan tombol saat proses cetak dimulai
        this.disabled = true;
        printPhotos();
    });
    
    // Setup tombol navigasi
    document.getElementById('backButton').addEventListener('click', function() {
        loadGameboyScreen(); 
    });
    
    document.getElementById('nextButton').addEventListener('click', function() {
        loadMusicScreen(); // Mengarahkan ke Music (sesuai alur yang logis)
    });
}

// Fungsi pembantu untuk memformat waktu (detik ke menit:detik)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Fungsi untuk memuat lagu berdasarkan index
function loadTrack(index) {
    currentTrackIndex = index;
    const track = trackList[currentTrackIndex];
    
    audio.src = track.src;
    audio.load(); // Memuat audio baru
    
    // Tunggu metadata dimuat (untuk mendapatkan durasi total)
    audio.onloadedmetadata = () => {
        // Hanya perbarui totalTime jika durasinya valid (bukan NaN)
        if (audio.duration && isFinite(audio.duration)) {
            document.getElementById('totalTime').textContent = formatTime(audio.duration);
        } else {
            document.getElementById('totalTime').textContent = track.duration || '0:00'; // Gunakan durasi statis jika gagal
        }
        
        // Panggil update display untuk memperbarui cover dan judul
        updateMusicDisplay(); 
    };

    updateMusicDisplay();
}

function updateMusicDisplay() {
    const track = trackList[currentTrackIndex];
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('coverArt').src = track.cover;
    
    // Atur tombol Play/Pause
    document.getElementById('playPauseBtn').innerHTML = audio.paused ? '►' : '⏸';
    
    // Perbarui daftar lagu yang sedang diputar (styling)
    const listItems = document.querySelectorAll('.track-item');
    listItems.forEach((item, index) => {
        item.classList.remove('current');
        if (index === currentTrackIndex) {
            item.classList.add('current');
        }
    });
    
    // Scroll daftar putar agar lagu yang aktif terlihat
    const currentItem = document.querySelector('.track-item.current');
    if (currentItem) {
        currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Fungsi untuk mengupdate progress bar dan waktu saat ini
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    const progressPercent = (duration > 0) ? (currentTime / duration) * 100 : 0;
    
    document.getElementById('musicProgress').style.width = `${progressPercent}%`;
    document.getElementById('currentTime').textContent = formatTime(currentTime);
}

function playTrack() {
    // Menggunakan .play() yang mengembalikan Promise untuk mengatasi Autoplay Policy
    audio.play().then(() => {
        isPlaying = true;
        updateMusicDisplay();
    }).catch(error => {
        console.error("Gagal memutar audio:", error);
        // Beri tahu user untuk berinteraksi lebih dulu jika gagal autoplay
        isPlaying = false;
        updateMusicDisplay();
    });
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updateMusicDisplay();
}

// Fungsi untuk membuat dan menampilkan daftar lagu
function renderPlaylist() {
    const trackListElement = document.getElementById('trackList');
    trackListElement.innerHTML = ''; // Bersihkan konten lama
    
    trackList.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        // Gunakan durasi statis dari data jika durasi audio belum dimuat
        const displayDuration = track.duration; 
        item.textContent = `${track.title} - ${displayDuration}`;
        item.setAttribute('data-index', index);
        
        // Tambahkan event click untuk memilih lagu
        item.addEventListener('click', function() {
            loadTrack(index);
            playTrack();
        });
        
        trackListElement.appendChild(item);
    });
}

function setupMusicPlayer() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextScreenBtn = document.getElementById('nextButton');
    
    // Set kecepatan default ke 1.0x (normal)
    audio.playbackRate = 1.0; 

    // 1. Inisialisasi daftar lagu pertama
    renderPlaylist();
    loadTrack(currentTrackIndex); 
    
    // 2. Setup event listener kontrol putar/jeda/next/prev
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    prevBtn.addEventListener('click', () => {
        loadTrack((currentTrackIndex - 1 + trackList.length) % trackList.length);
        playTrack();
    });

    nextBtn.addEventListener('click', () => {
        loadTrack((currentTrackIndex + 1) % trackList.length);
        playTrack();
    });
    
    // 3. Setup event listener Audio
    audio.addEventListener('timeupdate', updateProgress); // Update progress bar
    audio.addEventListener('ended', () => {
        // Pindah ke lagu berikutnya setelah lagu selesai
        loadTrack((currentTrackIndex + 1) % trackList.length);
        playTrack();
    });
    
    // 4. Setup kontrol Volume BARU
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Set volume awal audio ke nilai slider (default 1.0)
    audio.volume = volumeSlider.value; 

    volumeSlider.addEventListener('input', function() {
        // Mengatur volume audio berdasarkan nilai slider (0.0 hingga 1.0)
        audio.volume = this.value; 
    });
    
    // 5. Setup tombol navigasi
    nextScreenBtn.addEventListener('click', function() {
        pauseTrack(); // Hentikan musik saat pindah layar
        // AKSI SELANJUTNYA DARI MUSIC DIGANTI: Kembali ke layar utama (Gameboy)
        alert("Akhir dari konten. Kembali ke Menu Utama.");
        loadGameboyScreen(); 
    });
}

// Fungsi Pindah ke Tampilan Music Player BARU
function loadMusicScreen() {
    applyNewCSS(musicCSS);
    document.body.innerHTML = musicHTML;

    setupMusicPlayer();

    document.getElementById('backButton').addEventListener('click', function() {
        pauseTrack(); // Hentikan musik saat pindah layar
        loadGameboyScreen(); 
    });
}

// FUNGSI loadFlowerScreen() TELAH DIHAPUS.


// Logika Interaksi Konsol (Tombol START dan Menu)
function setupGameboyInteractions() {
    const startButton = document.querySelector('.start-btn');
    const secondaryText = document.querySelector('.screen .secondary-text');
    
    // Tombol START
    startButton.addEventListener('click', function() {
        if (secondaryText.textContent.includes('Press Start Button')) {
            secondaryText.style.animation = 'none';
            secondaryText.textContent = 'MENU';
            secondaryText.style.fontSize = '1.4em';
        } else {
            alert("Gunakan tombol Menu di atas!");
        }
    });
    
    // Tombol Menu: MESSAGE (Pink)
    document.querySelector('.menu-btn:nth-child(1)').addEventListener('click', loadMessageScreen);
    
    // Tombol Menu: GALLERY (Kuning)
    document.querySelector('.menu-btn:nth-child(2)').addEventListener('click', loadGalleryScreen);
    
    // Tombol Menu: MUSIC (Ungu)
    document.querySelector('.menu-btn:nth-child(3)').addEventListener('click', loadMusicScreen);

    // Tombol Menu: FLOWER (Hijau)
    // AKSI TOMBOL FLOWER DIGANTI: Kembali ke layar utama
    document.querySelector('.menu-btn:nth-child(4)').addEventListener('click', function() {
        alert("Area ini sudah dihapus atau tidak tersedia. Kembali ke Menu Utama.");
        loadGameboyScreen(); 
    });

    // Tombol A dan B
    document.querySelector('.btn-a').addEventListener('click', () => { alert("Tombol A ditekan!"); });
    document.querySelector('.btn-b').addEventListener('click', () => { alert("Tombol B ditekan!"); });
}

// Pemicu Awal
function animateLoading() {
    width += increment;
    
    if (width > 100) {
        width = 100;
    }
    
    progressBar.style.width = width.toFixed(0) + '%';
    loadingText.textContent = `Loading... ${width.toFixed(0)}%`;
    
    if (width < 100) {
        setTimeout(animateLoading, intervalTime);
    } else {
        setTimeout(loadGameboyScreen, 500); 
    }
}

// Mulai animasi
animateLoading();