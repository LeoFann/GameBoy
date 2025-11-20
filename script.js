// --- SETUP LOADING ANIMATION (KODE ASLI) ---
let width = 0;
const intervalTime = 50;
const maxTime = 3000;
const steps = maxTime / intervalTime;
const increment = 100 / steps;

const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');

// --- 0. KODE CSS untuk Layar Transisi Bunga (GATAU) ---
const flowerIntroCSS = `
    body {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        overflow: hidden;
        text-align: center;
    }
    
    .intro-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .gatau-text {
        font-family: 'Arial', sans-serif; /* Font sederhana dan besar */
        font-size: 5em;
        color: #333; /* Abu-abu gelap (hampir tidak terlihat) */
        text-transform: uppercase;
        margin-bottom: 20px;
        position: relative; /* Penting untuk animasi */
        text-shadow: 0 0 5px #ff00ff; /* Tambahkan sedikit neon shadow */
        
        /* APLIKASIKAN EFEK GLITCH */
        animation: 
            glitch-effect 1.5s linear infinite alternate, 
            flash-text 0.5s step-end 3 forwards; /* Berkedip 3 kali saat dimuat */
    }
    
    .subtitle-text {
        font-size: 1.2em;
        color: #fff;
        margin-bottom: 40px;
    }
    
    .intro-button {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 10px 20px;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8em;
        cursor: pointer;
        box-shadow: 0 4px 0 #888;
        transition: transform 0.1s, box-shadow 0.1s;
    }
    
    .intro-button:active {
        transform: translateY(4px);
        box-shadow: none;
    }
    
    /* --- KEYFRAMES GLITCH DAN FLASH --- */
    @keyframes glitch-effect {
        0%, 100% {
            transform: translate(0, 0);
            text-shadow: 0 0 5px #ff00ff;
        }
        20% {
            transform: translate(-2px, 2px);
            text-shadow: 2px 2px 0 #00ffff; /* Geser Cyan */
            color: #ff00ff;
        }
        40% {
            transform: translate(-1px, -1px);
            text-shadow: -2px -2px 0 #ff00ff; /* Geser Magenta */
            color: #00ffff;
        }
        60% {
            transform: translate(3px, 0);
            text-shadow: 3px 0 0 #00ffff;
            color: #333;
        }
        80% {
            transform: translate(0, 3px);
            text-shadow: 0 3px 0 #ff00ff;
            color: #00ffff;
        }
    }
    
    @keyframes flash-text {
        0%, 50%, 100% { color: #fff; text-shadow: 0 0 10px #fff; } /* Terlihat Putih */
        25%, 75% { color: #333; text-shadow: none; } /* Hampir tidak terlihat */
    }
`;

// --- 1. KODE CSS untuk Tampilan Konsol Retro ---
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
        color: #606060ff;
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
        background-color: #146116ff;
        width: 90%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #29f529ff;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .screen-text {
        margin: 5px 0;
        font-size: 1.4em;
        text-shadow: 0 0 5px #132513ff;
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
        text-shadow: 0 0 3px #390606ff;
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
    .menu-btn:nth-child(2) { background-color: rgba(23, 162, 148, 1); color: #146255ff; border-color: rgba(10, 74, 63, 1); box-shadow: 0 3px 0 rgba(8, 52, 45, 1); }
    .menu-btn:nth-child(3) { background-color: #a0f; color: white; border-color: #80c; box-shadow: 0 3px 0 #60a; }
    .menu-btn:nth-child(4) { background-color: rgba(35, 204, 230, 1); color: #444; border-color: rgba(7, 94, 132, 1); box-shadow: 0 3px 0 rgba(0, 68, 170, 1); }

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

// --- 2. KODE CSS untuk Tampilan Pesan (EFEK KETIK) ---
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
        box-shadow: 0 0 40px #e81f806a, 0 0 80px rgba(232, 31, 127, 0.5);
        border: 2px solid #c66292b3;
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
    
    .message-box::-webkit-scrollbar { width: 0px; background: transparent; }
    .message-box { scrollbar-width: none; }
    
    @keyframes blinkCursor {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }

    h2 {
        color: white;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #130e0eff;
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

// --- 3. KODE CSS untuk Tampilan Photobox Gallery ---
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
        overflow-y: auto;
    }

    .gallery-container {
        width: 500px;
        background-color: #000;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 40px rgba(232, 232, 13, 0.57), 0 0 80px rgba(137, 137, 34, 0.5);
        border: 2px solid rgba(171, 171, 46, 1);
        text-align: center;
        margin: 20px auto;
    }

    h2 {
        color: white;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #120707ff;
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
        text-shadow: 0 0 5px rgba(44, 44, 14, 1);
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
        background-color: rgba(67, 224, 67, 1);
        background-image: linear-gradient(0deg, transparent 9px, rgba(0,0,0,0.5) 10px),
                          linear-gradient(90deg, transparent 9px, rgba(0,0,0,0.5) 10px);
        background-size: 10px 10px;
        border: 3px dashed #f09;
        color: white;
        display: block; 
        text-shadow: 0 0 3px #000;
        padding-bottom: 20px;
    }
    
    .photobox-screen::-webkit-scrollbar { width: 0; }
    .photobox-screen { scrollbar-width: none; }


    .photobox-screen p {
        font-size: 0.8em;
        margin-bottom: 20px;
        text-align: center;
        padding-top: 100px;
    }
    
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

    .photo-caption {
        margin: 0;
        padding: 0;
        height: 0;
        visibility: hidden;
    }
`;

// --- 4. KODE CSS untuk Tampilan Music Player ---
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
        box-shadow: 0 0 40px rgba(173, 9, 107, 0.32), 0 0 80px rgba(255, 0, 153, 0.5);
        border: 2px solid rgba(255, 0, 153, 0.62);
        text-align: center;
    }

    h2 {
        color: #0f0;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #0f0;
    }
    
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
        background-color: #007bff;
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
        gap: 20px;
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
        font-family: Arial, sans-serif;
    }
    
    .control-btn:active {
        transform: translateY(3px);
        box-shadow: none;
    }
    
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

    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #0f0;
        cursor: pointer;
        box-shadow: 0 0 5px #0f0;
    }

    .volume-slider::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #0f0;
        cursor: pointer;
        box-shadow: 0 0 5px #0f0;
        border: none;
    }
    
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

// --- 5. KODE CSS untuk Tampilan Flower/Ucapan (ANIMASI BUNGA BARU - DENGAN PERBAIKAN Z-INDEX) ---
const flowerCSS = `
    /* --- INTEGRASI KODE CSS BUNGA ANDA --- */
    *,
    *::after,
    *::before {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    :root {
      --dark-color: #000;
      --fl-speed: 0.8s;
    }

    body {
        /* Memastikan body utama tidak mengganggu layout FLOWER */
        display: flex; align-items: flex-end; justify-content: center; min-height: 100vh;
        background-color: var(--dark-color); overflow: hidden; perspective: 1000px; 
    }
    
    /* --- STYLE UTAMA UNTUK KONTROL NAVIGASI RETRO --- */
    .flower-screen-wrapper {
        position: fixed; 
        left: 50%; 
        top: 0; 
        transform: translateX(-50%); 
        width: 100%; 
        height: 100%; 
        z-index: 10000;
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: flex-start;
        background-color: var(--dark-color);
        padding-bottom: 10vh; 
    }

    .flower-title {
        position: fixed;
        top: 5vh;
        z-index: 10001; /* Z-index tertinggi untuk judul */
        font-family: 'Press Start 2P', cursive;
        font-size: 1.5em;
        color: #ff00ff;
        text-shadow: 0 0 10px #ff00ff;
    }
    
    .flower-back-btn {
        position: fixed;
        bottom: 5vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10002; /* Z-Index absolut tertinggi untuk tombol */
        font-family: 'Press Start 2P', cursive;
        padding: 10px 20px;
        border: 2px solid #00ffff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8em;
        background-color: #000;
        color: #00ffff;
        box-shadow: 0 4px 0 #00aaaa;
        transition: transform 0.1s;
    }
    .flower-back-btn:active { transform: translateY(4px); box-shadow: none; }


    /* --- ELEMEN UTAMA BUNGA --- */
    .night {
        position: fixed; left: 50%; top: 0; transform: translateX(-50%); width: 100%; height: 100%;
        filter: blur(0.1vmin); 
        z-index: 1; /* Pastikan di bawah tombol navigasi */
        background-image: radial-gradient(ellipse at top, transparent 0%, var(--dark-color)), radial-gradient(ellipse at bottom, var(--dark-color), rgba(145, 233, 255, 0.2)), repeating-linear-gradient(220deg, black 0px, black 19px, transparent 19px, transparent 22px), repeating-linear-gradient(189deg, black 0px, black 19px, transparent 19px, transparent 22px), repeating-linear-gradient(148deg, black 0px, black 19px, transparent 19px, transparent 22px), linear-gradient(90deg, #00fffa, #f0f0f0);
    }
    .flowers { position: relative; transform: scale(0.9); position: absolute; bottom: 0; z-index: 10; }
    .flower { position: absolute; bottom: 10vmin; transform-origin: bottom center; z-index: 10; }
    
    /* (Semua gaya Flower, Flower__line, Flower__leaf, keyframes, dll. dari style.css bunga Anda) */
    .flower--1 { animation: moving-flower-1 4s linear infinite; }
    .flower--1 .flower__line { height: 70vmin; animation-delay: 0.3s; }
    .flower--1 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 1.6s backwards; }
    .flower--1 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 1.4s backwards; }
    .flower--1 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 1.2s backwards; }
    .flower--1 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1s backwards; }
    .flower--1 .flower__line__leaf--5 { animation: blooming-leaf-right var(--fl-speed) 1.8s backwards; }
    .flower--1 .flower__line__leaf--6 { animation: blooming-leaf-left var(--fl-speed) 2s backwards; }
    .flower--2 { left: 50%; transform: rotate(20deg); animation: moving-flower-2 4s linear infinite; }
    .flower--2 .flower__line { height: 60vmin; animation-delay: 0.6s; }
    .flower--2 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 1.9s backwards; }
    .flower--2 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 1.7s backwards; }
    .flower--2 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 1.5s backwards; }
    .flower--2 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1.3s backwards; }
    .flower--3 { left: 50%; transform: rotate(-15deg); animation: moving-flower-3 4s linear infinite; }
    .flower--3 .flower__line { animation-delay: 0.9s; }
    .flower--3 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 2.5s backwards; }
    .flower--3 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 2.3s backwards; }
    .flower--3 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 2.1s backwards; }
    .flower--3 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1.9s backwards; }
    .flower--4 { left: 60%; transform: rotate(5deg); animation: moving-flower-2 4s linear infinite; }
    .flower--4 .flower__line { height: 65vmin; animation-delay: 1.2s; }
    .flower--4 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 2.6s backwards; }
    .flower--4 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 2.4s backwards; }
    .flower--4 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 2.2s backwards; }
    .flower--4 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 2s backwards; }
    .flower__leafs { position: relative; animation: blooming-flower 2s backwards; }
    .flower__leafs--1 { animation-delay: 1.1s; }
    .flower__leafs--2 { animation-delay: 1.4s; }
    .flower__leafs--3 { animation-delay: 1.7s; }
    .flower__leafs--4 { animation-delay: 2s; }
    .flower__leafs::after {
        content: ""; position: absolute; left: 0; top: 0; transform: translate(-50%, -100%);
        width: 8vmin; height: 8vmin; background-color: #6bf0ff; filter: blur(10vmin);
    }
    .flower__leaf {
        position: absolute; bottom: 0; left: 50%; width: 8vmin; height: 11vmin;
        border-radius: 51% 49% 47% 53%/44% 45% 55% 69%; background-color: #a7ffee;
        background-image: linear-gradient(to top, #54b8aa, #a7ffee); transform-origin: bottom center;
        opacity: 0.9; box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
    }
    .flower__leaf--1 { transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg); }
    .flower__leaf--2 { transform: translate(-50%, -4%) rotateX(40deg); }
    .flower__leaf--3 { transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg); }
    .flower__leaf--4 {
        width: 8vmin; height: 8vmin; transform-origin: bottom left; border-radius: 4vmin 10vmin 4vmin 4vmin;
        transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg); background-image: linear-gradient(to top, #39c6d6, #a7ffee);
        z-index: 1; opacity: 0.8;
    }
    .flower__white-circle {
        position: absolute; left: -3.5vmin; top: -3vmin; width: 9vmin; height: 4vmin;
        border-radius: 50%; background-color: #fff;
    }
    .flower__white-circle::after {
        content: ""; position: absolute; left: 50%; top: 45%; transform: translate(-50%, -50%);
        width: 60%; height: 60%; border-radius: inherit;
        background-image: repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(67.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(112.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(112.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(22.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(22.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(157.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(67.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(67.5deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 12px), linear-gradient(90deg, #ffeb12, #ffce00);
    }
    .flower__line {
        height: 55vmin; width: 1.5vmin; background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.2)), linear-gradient(to top, transparent 10%, #14757a, #39c6d6);
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5); animation: grow-flower-tree 4s backwards;
    }
    .flower__line__leaf {
        --w: 7vmin; --h: calc(var(--w) + 2vmin); position: absolute; top: 20%; left: 90%;
        width: var(--w); height: var(--h); border-top-right-radius: var(--h); border-bottom-left-radius: var(--h);
        background-image: linear-gradient(to top, rgba(20, 117, 122, 0.4), #39c6d6);
    }
    .flower__line__leaf--1 { transform: rotate(70deg) rotateY(30deg); }
    .flower__line__leaf--2 { top: 45%; transform: rotate(70deg) rotateY(30deg); }
    .flower__line__leaf--3, .flower__line__leaf--4, .flower__line__leaf--6 {
        border-top-right-radius: 0; border-bottom-left-radius: 0; border-top-left-radius: var(--h);
        border-bottom-right-radius: var(--h); left: -460%; top: 12%; transform: rotate(-70deg) rotateY(30deg);
    }
    .flower__line__leaf--4 { top: 40%; }
    .flower__line__leaf--5 { top: 0; transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0.6); }
    .flower__line__leaf--6 { top: -2%; left: -450%; transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0.6); }
    .flower__light {
        position: absolute; bottom: 0vmin; width: 1vmin; height: 1vmin; background-color: #fffb00;
        border-radius: 50%; filter: blur(0.2vmin); animation: light-ans 4s linear infinite backwards;
    }
    .flower__light:nth-child(odd) { background-color: #23f0ff; }
    .flower__light--1 { left: -2vmin; animation-delay: 1s; }
    .flower__light--2 { left: 3vmin; animation-delay: 0.5s; }
    .flower__light--3 { left: -6vmin; animation-delay: 0.3s; }
    .flower__light--4 { left: 6vmin; animation-delay: 0.9s; }
    .flower__light--5 { left: -1vmin; animation-delay: 1.5s; }
    .flower__light--6 { left: -4vmin; animation-delay: 3s; }
    .flower__light--7 { left: 3vmin; animation-delay: 2s; }
    .flower__light--8 { left: -6vmin; animation-delay: 3.5s; }
    .flower__grass {
        --c: #159faa; --line-w: 1.5vmin; position: absolute; bottom: 12vmin; left: -7vmin; display: flex;
        flex-direction: column; align-items: flex-end; z-index: 20; transform-origin: bottom center;
        transform: rotate(-48deg) rotateY(40deg);
    }
    .flower__grass--1 { animation: moving-grass 2s linear infinite; }
    .flower__grass--2 {
        left: 2vmin; bottom: 10vmin; transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
        opacity: 0.8; z-index: 0; animation: moving-grass--2 1.5s linear infinite;
    }
    .flower__grass--top {
        width: 7vmin; height: 10vmin; border-top-right-radius: 100%; border-right: var(--line-w) solid var(--c);
        transform-origin: bottom center; transform: rotate(-2deg);
    }
    .flower__grass--bottom {
        margin-top: -2px; width: var(--line-w); height: 25vmin; background-image: linear-gradient(to top, transparent, var(--c));
    }
    .flower__grass__leaf {
        --size: 10vmin; position: absolute; width: calc(var(--size) * 2.1); height: var(--size);
        border-top-left-radius: 100%; border-top-right-radius: var(--size);
        background-image: linear-gradient(to top, transparent, transparent 30%, var(--c)); z-index: 100;
    }
    .flower__grass__leaf--1 { top: -6%; left: 30%; --size: 6vmin; transform: rotate(-20deg); animation: growing-grass-ans--1 2s 2.6s backwards; }
    @keyframes growing-grass-ans--1 { 0% { transform-origin: bottom left; transform: rotate(-20deg) scale(0); } }
    .flower__grass__leaf--2 { top: -5%; left: -110%; --size: 6vmin; transform: rotate(10deg); animation: growing-grass-ans--2 2s 2.4s linear backwards; }
    @keyframes growing-grass-ans--2 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }
    .flower__grass__leaf--3 { top: 5%; left: 60%; --size: 8vmin; transform: rotate(-18deg) rotateX(-20deg); animation: growing-grass-ans--3 2s 2.2s linear backwards; }
    @keyframes growing-grass-ans--3 { 0% { transform-origin: bottom left; transform: rotate(-18deg) rotateX(-20deg) scale(0); } }
    .flower__grass__leaf--4 { top: 6%; left: -135%; --size: 8vmin; transform: rotate(2deg); animation: growing-grass-ans--4 2s 2s linear backwards; }
    @keyframes growing-grass-ans--4 { 0% { transform-origin: bottom right; transform: rotate(2deg) scale(0); } }
    .flower__grass__leaf--5 { top: 20%; left: 60%; --size: 10vmin; transform: rotate(-24deg) rotateX(-20deg); animation: growing-grass-ans--5 2s 1.8s linear backwards; }
    @keyframes growing-grass-ans--5 { 0% { transform-origin: bottom left; transform: rotate(-24deg) rotateX(-20deg) scale(0); } }
    .flower__grass__leaf--6 { top: 22%; left: -180%; --size: 10vmin; transform: rotate(10deg); animation: growing-grass-ans--6 2s 1.6s linear backwards; }
    @keyframes growing-grass-ans--6 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }
    .flower__grass__leaf--7 { top: 39%; left: 70%; --size: 10vmin; transform: rotate(-10deg); animation: growing-grass-ans--7 2s 1.4s linear backwards; }
    @keyframes growing-grass-ans--7 { 0% { transform-origin: bottom left; transform: rotate(-10deg) scale(0); } }
    .flower__grass__leaf--8 { top: 40%; left: -215%; --size: 11vmin; transform: rotate(10deg); animation: growing-grass-ans--8 2s 1.2s linear backwards; }
    @keyframes growing-grass-ans--8 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }
    .flower__grass__overlay { position: absolute; top: -10%; right: 0%; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); filter: blur(1.5vmin); z-index: 100; }
    .flower__g-long {
        --w: 2vmin; --h: 6vmin; --c: #159faa; position: absolute; bottom: 10vmin; left: -3vmin; transform-origin: bottom center;
        transform: rotate(-30deg) rotateY(-20deg); display: flex; flex-direction: column; align-items: flex-end;
        animation: flower-g-long-ans 3s linear infinite;
    }
    @keyframes flower-g-long-ans { 0%, 100% { transform: rotate(-30deg) rotateY(-20deg); } 50% { transform: rotate(-32deg) rotateY(-20deg); } }
    .flower__g-long__top {
        top: calc(var(--h) * -1); width: calc(var(--w) + 1vmin); height: var(--h); border-top-right-radius: 100%;
        border-right: 0.7vmin solid var(--c); transform: translate(-0.7vmin, 1vmin);
    }
    .flower__g-long__bottom {
        width: var(--w); height: 50vmin; transform-origin: bottom center; background-image: linear-gradient(to top, transparent 30%, var(--c));
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5); clip-path: polygon(35% 0, 65% 1%, 100% 100%, 0% 100%);
    }
    .flower__g-right { position: absolute; bottom: 6vmin; left: -2vmin; transform-origin: bottom left; transform: rotate(20deg); }
    .flower__g-right .leaf {
        width: 30vmin; height: 50vmin; border-top-left-radius: 100%; border-left: 2vmin solid #079097;
        background-image: linear-gradient(to bottom, transparent, var(--dark-color) 60%); -webkit-mask-image: linear-gradient(to top, transparent 30%, #079097 60%);
    }
    .flower__g-right--1 { animation: flower-g-right-ans 2.5s linear infinite; }
    .flower__g-right--2 { left: 5vmin; transform: rotateY(-180deg); animation: flower-g-right-ans--2 3s linear infinite; }
    .flower__g-right--2 .leaf { height: 75vmin; filter: blur(0.3vmin); opacity: 0.8; }
    @keyframes flower-g-right-ans { 0%, 100% { transform: rotate(20deg); } 50% { transform: rotate(24deg) rotateX(-20deg); } }
    @keyframes flower-g-right-ans--2 { 0%, 100% { transform: rotateY(-180deg) rotate(0deg) rotateX(-20deg); } 50% { transform: rotateY(-180deg) rotate(6deg) rotateX(-20deg); } }
    .flower__g-front {
        position: absolute; bottom: 6vmin; left: 2.5vmin; z-index: 100; transform-origin: bottom center;
        transform: rotate(-28deg) rotateY(30deg) scale(1.04); animation: flower__g-front-ans 2s linear infinite;
    }
    @keyframes flower__g-front-ans { 0%, 100% { transform: rotate(-28deg) rotateY(30deg) scale(1.04); } 50% { transform: rotate(-35deg) rotateY(40deg) scale(1.04); } }
    .flower__g-front__line {
        width: 0.3vmin; height: 20vmin; background-image: linear-gradient(to top, transparent, #079097, transparent 100%);
        position: relative;
    }
    .flower__g-front__leaf-wrapper { position: absolute; top: 0; left: 0; transform-origin: bottom left; transform: rotate(10deg); }
    .flower__g-front__leaf-wrapper:nth-child(even) { left: 0vmin; transform: rotateY(-180deg) rotate(5deg); animation: flower__g-front__leaf-left-ans 1s ease-in backwards; }
    .flower__g-front__leaf-wrapper:nth-child(odd) { animation: flower__g-front__leaf-ans 1s ease-in backwards; }
    .flower__g-front__leaf-wrapper--1 { top: -8vmin; transform: scale(0.7); animation: flower__g-front__leaf-ans 1s 5.5s ease-in backwards !important; }
    .flower__g-front__leaf-wrapper--2 { top: -8vmin; transform: rotateY(-180deg) scale(0.7) !important; animation: flower__g-front__leaf-left-ans-2 1s 5.2s ease-in backwards !important; }
    @keyframes flower__g-front__leaf-left-ans-2 { 0% { transform: rotateY(-180deg) scale(0); } }
    .flower__g-front__leaf-wrapper--3 { top: -3vmin; animation: flower__g-front__leaf-ans 1s 4.9s ease-in backwards; }
    .flower__g-front__leaf-wrapper--4 { top: -3vmin; transform: rotateY(-180deg) scale(0.9) !important; animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important; }
    .flower__g-front__leaf-wrapper--5, .flower__g-front__leaf-wrapper--6 { top: 2vmin; }
    .flower__g-front__leaf-wrapper--7, .flower__g-front__leaf-wrapper--8 { top: 6.5vmin; }
    .flower__g-front__leaf-wrapper--5 { animation-delay: 4.3s !important; }
    .flower__g-front__leaf-wrapper--6 { animation-delay: 4.1s !important; }
    .flower__g-front__leaf-wrapper--7 { animation-delay: 3.8s !important; }
    .flower__g-front__leaf-wrapper--8 { animation-delay: 3.5s !important; }
    @keyframes flower__g-front__leaf-ans { 0% { transform: rotate(10deg) scale(0); } }
    @keyframes flower__g-front__leaf-left-ans { 0% { transform: rotateY(-180deg) rotate(5deg) scale(0); } }
    .flower__g-front__leaf {
        width: 10vmin; height: 10vmin; border-radius: 100% 0% 0% 100%/100% 100% 0% 0%;
        box-shadow: inset 0 2px 1vmin rgba(44, 238, 252, 0.2);
        background-image: linear-gradient(to bottom left, transparent, var(--dark-color)), linear-gradient(to bottom right, #159faa 50%, transparent 50%, transparent);
        -webkit-mask-image: linear-gradient(to bottom right, #159faa 50%, transparent 50%, transparent);
        mask-image: linear-gradient(to bottom right, #159faa 50%, transparent 50%, transparent);
    }
    .flower__g-fr { position: absolute; bottom: -4vmin; left: vmin; transform-origin: bottom left; z-index: 10; animation: flower__g-fr-ans 2s linear infinite; }
    @keyframes flower__g-fr-ans { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(4deg); } }
    .flower__g-fr .leaf {
        width: 30vmin; height: 50vmin; border-top-left-radius: 100%; border-left: 2vmin solid #079097;
        -webkit-mask-image: linear-gradient(to top, transparent 25%, #079097 50%); position: relative; z-index: 1;
    }
    .flower__g-fr__leaf {
        position: absolute; top: 0; left: 0; width: 10vmin; height: 10vmin; border-radius: 100% 0% 0% 100%/100% 100% 0% 0%;
        box-shadow: inset 0 2px 1vmin rgba(44, 238, 252, 0.2);
        background-image: linear-gradient(to bottom left, transparent, var(--dark-color) 98%), linear-gradient(to bottom right, #23f0ff 45%, transparent 50%, transparent);
        -webkit-mask-image: linear-gradient(135deg, #159faa 40%, transparent 50%, transparent);
    }
    .flower__g-fr__leaf--1 { left: 20vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-1 0.5s 5.2s linear backwards; }
    @keyframes flower__g-fr-leaft-ans-1 { 0% { transform-origin: left; transform: rotate(45deg) scale(0); } }
    .flower__g-fr__leaf--2 { left: 12vmin; top: -7vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 5s linear backwards; }
    .flower__g-fr__leaf--3 { left: 15vmin; top: 6vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 0.5s 4.8s linear backwards; }
    .flower__g-fr__leaf--4 { left: 6vmin; top: -2vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 4.6s linear backwards; }
    .flower__g-fr__leaf--5 { left: 10vmin; top: 14vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 0.5s 4.4s linear backwards; }
    @keyframes flower__g-fr-leaft-ans-5 { 0% { transform-origin: left; transform: rotate(55deg) scale(0); } }
    .flower__g-fr__leaf--6 { left: 0vmin; top: 6vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 4.2s linear backwards; }
    @keyframes flower__g-fr-leaft-ans-6 { 0% { transform-origin: right; transform: rotate(25deg) rotateY(-180deg) scale(0); } }
    .flower__g-fr__leaf--7 { left: 5vmin; top: 22vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-7 0.5s 4s linear backwards; }
    @keyframes flower__g-fr-leaft-ans-7 { 0% { transform-origin: left; transform: rotate(45deg) scale(0); } }
    .flower__g-fr__leaf--8 { left: -4vmin; top: 15vmin; transform: rotate(15deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-8 0.5s 3.8s linear backwards; }
    @keyframes flower__g-fr-leaft-ans-8 { 0% { transform-origin: right; transform: rotate(15deg) rotateY(-180deg) scale(0); } }
    .long-g { position: absolute; bottom: 25vmin; left: -42vmin; transform-origin: bottom left; }
    .long-g--1 { bottom: 0vmin; transform: scale(0.8) rotate(-5deg); }
    .long-g--1 .leaf { -webkit-mask-image: linear-gradient(to top, transparent 40%, #079097 80%) !important; }
    .long-g--1 .leaf--1 { --w: 5vmin; --h: 60vmin; left: -2vmin; transform: rotate(3deg) rotateY(-180deg); }
    .long-g--2, .long-g--3 { bottom: -3vmin; left: -35vmin; transform-origin: center; transform: scale(0.6) rotateX(60deg); }
    .long-g--2 .leaf, .long-g--3 .leaf { -webkit-mask-image: linear-gradient(to top, transparent 50%, #079097 80%) !important; }
    .long-g--2 .leaf--1, .long-g--3 .leaf--1 { left: -1vmin; transform: rotateY(-180deg); }
    .long-g--3 { left: -17vmin; bottom: 0vmin; }
    .long-g--3 .leaf { -webkit-mask-image: linear-gradient(to top, transparent 40%, #079097 80%) !important; }
    .long-g--4 { left: 25vmin; bottom: -3vmin; transform-origin: center; transform: scale(0.6) rotateX(60deg); }
    .long-g--4 .leaf { -webkit-mask-image: linear-gradient(to top, transparent 50%, #079097 80%) !important; }
    .long-g--5 { left: 42vmin; bottom: 0vmin; transform: scale(0.8) rotate(2deg); }
    .long-g--6 { left: 0vmin; bottom: -20vmin; z-index: 100; filter: blur(0.3vmin); transform: scale(0.8) rotate(2deg); }
    .long-g--7 { left: 35vmin; bottom: 20vmin; z-index: -1; filter: blur(0.3vmin); transform: scale(0.6) rotate(2deg); opacity: 0.7; }
    .long-g .leaf {
        --w: 15vmin; --h: 40vmin; --c: #1aaa15; position: absolute; bottom: 0; width: var(--w); height: var(--h);
        border-top-left-radius: 100%; border-left: 2vmin solid var(--c); -webkit-mask-image: linear-gradient(to top, transparent 20%, var(--dark-color));
        transform-origin: bottom center;
    }
    .long-g .leaf--0 { left: 2vmin; animation: leaf-ans-1 4s linear infinite; }
    .long-g .leaf--1 { --w: 5vmin; --h: 60vmin; animation: leaf-ans-1 4s linear infinite; }
    .long-g .leaf--2 {
        --w: 10vmin; --h: 40vmin; left: -0.5vmin; bottom: 5vmin; transform-origin: bottom left;
        transform: rotateY(-180deg); animation: leaf-ans-2 3s linear infinite;
    }
    .long-g .leaf--3 {
        --w: 5vmin; --h: 30vmin; left: -1vmin; bottom: 3.2vmin; transform-origin: bottom left;
        transform: rotate(-10deg) rotateY(-180deg); animation: leaf-ans-3 3s linear infinite;
    }
    @keyframes leaf-ans-1 { 0%, 100% { transform: rotate(-5deg) scale(1); } 50% { transform: rotate(5deg) scale(1.1); } }
    @keyframes leaf-ans-2 { 0%, 100% { transform: rotateY(-180deg) rotate(5deg); } 50% { transform: rotateY(-180deg) rotate(0deg) scale(1.1); } }
    @keyframes leaf-ans-3 { 0%, 100% { transform: rotate(-10deg) rotateY(-180deg); } 50% { transform: rotate(-20deg) rotateY(-180deg); } }
    .grow-ans { animation: grow-ans 2s var(--d) backwards; }
    @keyframes grow-ans { 0% { transform: scale(0); opacity: 0; } }
    @keyframes light-ans {
        0% { opacity: 0; transform: translateY(0vmin); } 25% { opacity: 1; transform: translateY(-5vmin) translateX(-2vmin); }
        50% { opacity: 1; transform: translateY(-15vmin) translateX(2vmin); filter: blur(0.2vmin); }
        75% { transform: translateY(-20vmin) translateX(-2vmin); filter: blur(0.2vmin); }
        100% { transform: translateY(-30vmin); opacity: 0; filter: blur(1vmin); }
    }
    @keyframes moving-flower-1 { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(-2deg); } }
    @keyframes moving-flower-2 { 0%, 100% { transform: rotate(18deg); } 50% { transform: rotate(14deg); } }
    @keyframes moving-flower-3 { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(-20deg) rotateY(-10deg); } }
    @keyframes blooming-leaf-right { 0% { transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0); } }
    @keyframes blooming-leaf-left { 0% { transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0); } }
    @keyframes grow-flower-tree { 0% { height: 0; border-radius: 1vmin; } }
    @keyframes blooming-flower { 0% { transform: scale(0); } }
    @keyframes moving-grass { 0%, 100% { transform: rotate(-48deg) rotateY(40deg); } 50% { transform: rotate(-50deg) rotateY(40deg); } }
    @keyframes moving-grass--2 { 0%, 100% { transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg); } 50% { transform: scale(0.5) rotate(79deg) rotateX(10deg) rotateY(-200deg); } }
    .growing-grass { animation: growing-grass-ans 1s 2s backwards; }
    @keyframes growing-grass-ans { 0% { transform: scale(0); } }
    
    .not-loaded * {
      animation-play-state: paused !important;
    }
`;

// --- 6. KODE HTML untuk Tampilan Konsol Retro ---
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
const messageHTML = `
    <div class="message-container">
        <h2>Message</h2>
        <div class="message-box">
            <span id="typewriter-text"></span> 
            <span id="cursor" style="color:#0f0; font-size:1.1em; animation: blinkCursor 0.5s infinite;">▌</span> 
        </div>
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">FURTHERMORE</button>
            <button class="action-btn back-btn" id="backButton">RETURN</button>
        </div>
    </div>
`;

// --- 8. KODE HTML untuk Tampilan Photobox Gallery ---
const galleryHTML = `
    <div class="gallery-container">
        <h2>Gallery</h2>
        <div class="photobox-header">
            <div class="indicator red" id="statusIndicatorLeft"></div>
            <h3>WEBWEAVER PHOTOBOX</h3>
            <div class="indicator green" id="statusIndicatorRight"></div>
        </div>

        <div class="progress-area">
            </div>

        <div class="photobox-screen">
            <div id="printArea">
                <p>Photobox ready to use</p>
                <button class="start-print-btn" id="startPrintBtn">STAR PRINTING</button>
            </div>
        </div>

        <div class="bottom-deco"></div>
        
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">FURTHERMORE</button>
            <button class="action-btn back-btn" id="backButton">RETURN</button>
        </div>
    </div>
`;

// --- 9. KODE HTML untuk Tampilan Music Player ---
const musicHTML = `
    <div class="music-container">
        <h2>Music Player</h2>
        
        <audio id="audioPlayer" preload="auto"></audio> 
        
        <div class="player-box">
            <div class="cover-art-container">
                <img id="coverArt" src="https://i.supaimg.com/f7e4f0de-309d-4876-b33a-e2759905f157.jpg" alt="Cover Art">
            </div>
            
            <p class="track-title" id="trackTitle">N O B E L  S A . E X E</p>
            
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
            <h3>PLAYLIST:</h3>
            <div class="track-list" id="trackList">
                </div>
        </div>
        
        <div class="button-group">
            <button class="action-btn next-btn" id="nextButton">FURTHERMORE</button>
            <button class="action-btn back-btn" id="backButton">RETURN</button>
        </div>
    </div>
`;

// --- 10. KODE HTML BARU: Layar Transisi Bunga (GATAU) ---
const flowerIntroHTML = `
    <div class="intro-container">
        <p class="gatau-text">GATAU</p>
        <p class="subtitle-text">bunga untuk CW CANTIK</p>
        <p class="subtitle-text">minta WA nya dong </p>
        <button class="intro-button" id="startFlowerButton">Click here</button>
    </div>
`;

// --- 11. KODE HTML untuk Tampilan Flower/Ucapan (ANIMASI BUNGA DIPERBAIKI) ---
const flowerHTML = `
    <div class="flower-screen-wrapper">
        <h2 class="flower-title"></h2>
        <div class="night"></div>
        <div class="flowers">
            
            <div class="flower flower--1">
              <div class="flower__leafs flower__leafs--1">
                <div class="flower__leaf flower__leaf--1"></div>
                <div class="flower__leaf flower__leaf--2"></div>
                <div class="flower__leaf flower__leaf--3"></div>
                <div class="flower__leaf flower__leaf--4"></div>
                <div class="flower__white-circle"></div>

                <div class="flower__light flower__light--1"></div>
                <div class="flower__light flower__light--2"></div>
                <div class="flower__light flower__light--3"></div>
                <div class="flower__light flower__light--4"></div>
                <div class="flower__light flower__light--5"></div>
                <div class="flower__light flower__light--6"></div>
                <div class="flower__light flower__light--7"></div>
                <div class="flower__light flower__light--8"></div>
              </div>
              <div class="flower__line">
                <div class="flower__line__leaf flower__line__leaf--1"></div>
                <div class="flower__line__leaf flower__line__leaf--2"></div>
                <div class="flower__line__leaf flower__line__leaf--3"></div>
                <div class="flower__line__leaf flower__line__leaf--4"></div>
                <div class="flower__line__leaf flower__line__leaf--5"></div>
                <div class="flower__line__leaf flower__line__leaf--6"></div>
              </div>
            </div>

            <div class="flower flower--2">
              <div class="flower__leafs flower__leafs--2">
                <div class="flower__leaf flower__leaf--1"></div>
                <div class="flower__leaf flower__leaf--2"></div>
                <div class="flower__leaf flower__leaf--3"></div>
                <div class="flower__leaf flower__leaf--4"></div>
                <div class="flower__white-circle"></div>

                <div class="flower__light flower__light--1"></div>
                <div class="flower__light flower__light--2"></div>
                <div class="flower__light flower__light--3"></div>
                <div class="flower__light flower__light--4"></div>
                <div class="flower__light flower__light--5"></div>
                <div class="flower__light flower__light--6"></div>
                <div class="flower__light flower__light--7"></div>
                <div class="flower__light flower__light--8"></div>
              </div>
              <div class="flower__line">
                <div class="flower__line__leaf flower__line__leaf--1"></div>
                <div class="flower__line__leaf flower__line__leaf--2"></div>
                <div class="flower__line__leaf flower__line__leaf--3"></div>
                <div class="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>

            <div class="flower flower--3">
              <div class="flower__leafs flower__leafs--3">
                <div class="flower__leaf flower__leaf--1"></div>
                <div class="flower__leaf flower__leaf--2"></div>
                <div class="flower__leaf flower__leaf--3"></div>
                <div class="flower__leaf flower__leaf--4"></div>
                <div class="flower__white-circle"></div>

                <div class="flower__light flower__light--1"></div>
                <div class="flower__light flower__light--2"></div>
                <div class="flower__light flower__light--3"></div>
                <div class="flower__light flower__light--4"></div>
                <div class="flower__light flower__light--5"></div>
                <div class="flower__light flower__light--6"></div>
                <div class="flower__light flower__light--7"></div>
                <div class="flower__light flower__light--8"></div>
              </div>
              <div class="flower__line">
                <div class="flower__line__leaf flower__line__leaf--1"></div>
                <div class="flower__line__leaf flower__line__leaf--2"></div>
                <div class="flower__line__leaf flower__line__leaf--3"></div>
                <div class="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>
            
            <div class="grow-ans" style="--d:1.2s">
              <div class="flower__g-long">
                <div class="flower__g-long__top"></div>
                <div class="flower__g-long__bottom"></div>
              </div>
            </div>

            <div class="growing-grass">
              <div class="flower__grass flower__grass--1">
                <div class="flower__grass--top"></div>
                <div class="flower__grass--bottom"></div>
                <div class="flower__grass__leaf flower__grass__leaf--1"></div>
                <div class="flower__grass__leaf flower__grass__leaf--2"></div>
                <div class="flower__grass__leaf flower__grass__leaf--3"></div>
                <div class="flower__grass__leaf flower__grass__leaf--4"></div>
                <div class="flower__grass__leaf flower__grass__leaf--5"></div>
                <div class="flower__grass__leaf flower__grass__leaf--6"></div>
                <div class="flower__grass__leaf flower__grass__leaf--7"></div>
                <div class="flower__grass__leaf flower__grass__leaf--8"></div>
                <div class="flower__grass__overlay"></div>
              </div>
            </div>

            <div class="growing-grass">
              <div class="flower__grass flower__grass--2">
                <div class="flower__grass--top"></div>
                <div class="flower__grass--bottom"></div>
                <div class="flower__grass__leaf flower__grass__leaf--1"></div>
                <div class="flower__grass__leaf flower__grass__leaf--2"></div>
                <div class="flower__grass__leaf flower__grass__leaf--3"></div>
                <div class="flower__grass__leaf flower__grass__leaf--4"></div>
                <div class="flower__grass__leaf flower__grass__leaf--5"></div>
                <div class="flower__grass__leaf flower__grass__leaf--6"></div>
                <div class="flower__grass__leaf flower__grass__leaf--7"></div>
                <div class="flower__grass__leaf flower__grass__leaf--8"></div>
                <div class="flower__grass__overlay"></div>
              </div>
            </div>

            <div class="grow-ans" style="--d:2.4s">
              <div class="flower__g-right flower__g-right--1">
                <div class="leaf"></div>
              </div>
            </div>

            <div class="grow-ans" style="--d:2.8s">
              <div class="flower__g-right flower__g-right--2">
                <div class="leaf"></div>
              </div>
            </div>

            <div class="grow-ans" style="--d:2.8s">
              <div class="flower__g-front">
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                  <div class="flower__g-front__leaf"></div>
                </div>
                <div class="flower__g-front__line"></div>
              </div>
            </div>

            <div class="grow-ans" style="--d:3.2s">
              <div class="flower__g-fr">
                <div class="leaf"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
                <div class="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
              </div>
            </div>

            <div class="long-g long-g--0">
              <div class="grow-ans" style="--d:3s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:2.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:3.4s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--1">
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:3.8s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:4s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--2">
              <div class="grow-ans" style="--d:4s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:4.4s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:4.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--3">
              <div class="grow-ans" style="--d:4s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:3s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--4">
              <div class="grow-ans" style="--d:4s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:3s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--5">
              <div class="grow-ans" style="--d:4s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:3s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--6">
              <div class="grow-ans" style="--d:4.2s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:4.4s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:4.6s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:4.8s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>

            <div class="long-g long-g--7">
              <div class="grow-ans" style="--d:3s">
                <div class="leaf leaf--0"></div>
              </div>
              <div class="grow-ans" style="--d:3.2s">
                <div class="leaf leaf--1"></div>
              </div>
              <div class="grow-ans" style="--d:3.5s">
                <div class="leaf leaf--2"></div>
              </div>
              <div class="grow-ans" style="--d:3.6s">
                <div class="leaf leaf--3"></div>
              </div>
            </div>
        </div>
        
        <button class="flower-back-btn" id="backButton">RETURN
    </div>
`;


// --- 11. Data dan Fungsi Interaksi ---

// Data Pesan
const messageText = `Hai

`;
let i = 0;
const typingSpeed = 50;

const photoData = [
    { src: "https://i.supaimg.com/1dfc8d9c-2484-40f0-8b81-dfbe14e00e53.jpg", caption: "" },
    { src: "https://i.supaimg.com/fb5769ee-bd14-463f-b36b-af363b9f399c.jpg", caption: "" },
    { src: "https://i.supaimg.com/76708432-d960-484d-8513-954f4fa1c881.jpg", caption: "" },
    { src: "https://i.supaimg.com/54f917ae-7474-4f37-97de-0df69a676867.jpg", caption: "" }
];

const trackList = [
    { 
        title: "Perfect", 
        artist: "Ed Sheeran", 
        src: "Ed Sheeran - Perfect.mp3", 
        duration: "4:23", 
        cover: "perfect.jpeg" 
        
    },
    { 
        title: "That Should Be Me", 
        artist: "Justin Bieber ft. Rascal Flatts", 
        src: "Justin Bieber - That Should Be Me ft. Rascal Flatts.mp3",
        duration: "3:45", 
        cover: "Justin bieber.jpeg"
       
    },
    { 
        title: "About You", 
        artist: "The 1975", 
        src: "The 1975  About You Official.mp3", 
        duration: "5:26", 
        cover: "about you.jpeg" 
    },
    { 
        title: "Heaven", 
        artist: "Bryan Adams", 
        src: "Bryan Adams  Heaven.mp3", 
        duration: "4:12", 
        cover: "Heaven.jpeg" 
    },
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

/**
 * UTILITY FUNCTION: Fungsi untuk mengganti seluruh gaya body
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

function loadGameboyScreen() {
    applyNewCSS(gameboyCSS);
    document.body.innerHTML = gameboyHTML;
    setupGameboyInteractions();
    document.body.classList.remove("not-loaded");
}

function loadMessageScreen() {
    i = 0; 
    applyNewCSS(messageCSS);
    document.body.innerHTML = messageHTML;
    document.body.classList.remove("not-loaded");
    typeWriter(); 

    document.getElementById('backButton').addEventListener('click', function() { loadGameboyScreen(); });
    document.getElementById('nextButton').addEventListener('click', function() { loadGalleryScreen(); });
}

function typeWriter() {
    const displayElement = document.getElementById("typewriter-text");
    const cursor = document.getElementById("cursor");

    if (i < messageText.length) {
        let char = messageText.charAt(i);
        
        if (char === '\n') { displayElement.innerHTML += '<br>'; } else { displayElement.innerHTML += char; }
        
        const messageBox = displayElement.closest('.message-box');
        if (messageBox) { messageBox.scrollTop = messageBox.scrollHeight; }

        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        if (cursor) { cursor.style.display = 'none'; }
    }
}

function printPhotos() {
    const screen = document.querySelector('.photobox-screen');
    const printArea = document.getElementById('printArea');
    const indicatorRight = document.getElementById('statusIndicatorRight');
    
    printArea.innerHTML = '';
    indicatorRight.classList.remove('green');
    indicatorRight.classList.add('red');
    
    setTimeout(() => { 
        photoData.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card printed'; 
            card.innerHTML = `<img src="${photo.src}" alt="Photo ${index + 1}">`;
            screen.appendChild(card);
        });

        window.scrollTo(0, document.body.scrollHeight); 
        indicatorRight.classList.remove('red');
        indicatorRight.classList.add('green');
        
        const doneText = document.createElement('p');
        doneText.className = 'screen-text';
        doneText.style.fontFamily = "'Press Start 2P', cursive";
        doneText.style.fontSize = '0.7em';
        doneText.style.marginTop = '20px';
        doneText.style.textAlign = 'center';
        doneText.textContent = "PRINTING COMPLETE";
        screen.appendChild(doneText);
        
        const newStartBtn = document.createElement('button');
        newStartBtn.className = 'start-print-btn';
        newStartBtn.id = 'startPrintBtn';
        newStartBtn.textContent = 'CETAK ULANG';
        screen.appendChild(newStartBtn);
        
        newStartBtn.addEventListener('click', function() { loadGalleryScreen(); });
        window.scrollTo(0, document.body.scrollHeight); 
    }, 500);
}

function loadGalleryScreen() {
    applyNewCSS(galleryCSS);
    document.body.innerHTML = galleryHTML;
    document.body.classList.remove("not-loaded");

    document.getElementById('startPrintBtn').addEventListener('click', function() {
        this.disabled = true;
        printPhotos();
    });
    
    document.getElementById('backButton').addEventListener('click', function() { loadGameboyScreen(); });
    document.getElementById('nextButton').addEventListener('click', function() { loadMusicScreen(); });
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function loadTrack(index) {
    currentTrackIndex = index;
    const track = trackList[currentTrackIndex];
    audio.src = track.src;
    audio.load();
    audio.onloadedmetadata = () => {
        if (audio.duration && isFinite(audio.duration)) {
            document.getElementById('totalTime').textContent = formatTime(audio.duration);
        } else {
            document.getElementById('totalTime').textContent = track.duration || '0:00';
        }
        updateMusicDisplay(); 
    };
    updateMusicDisplay();
}

function updateMusicDisplay() {
    const track = trackList[currentTrackIndex];
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('coverArt').src = track.cover;
    document.getElementById('playPauseBtn').innerHTML = audio.paused ? '►' : '⏸';
    const listItems = document.querySelectorAll('.track-item');
    listItems.forEach((item, index) => {
        item.classList.remove('current');
        if (index === currentTrackIndex) { item.classList.add('current'); }
    });
    const currentItem = document.querySelector('.track-item.current');
    if (currentItem) { currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    const progressPercent = (duration > 0) ? (currentTime / duration) * 100 : 0;
    document.getElementById('musicProgress').style.width = `${progressPercent}%`;
    document.getElementById('currentTime').textContent = formatTime(currentTime);
}

function playTrack() {
    audio.play().then(() => {
        isPlaying = true;
        updateMusicDisplay();
    }).catch(error => {
        console.error("Gagal memutar audio:", error);
        isPlaying = false;
        updateMusicDisplay();
    });
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updateMusicDisplay();
}

function renderPlaylist() {
    const trackListElement = document.getElementById('trackList');
    trackListElement.innerHTML = '';
    trackList.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        const displayDuration = track.duration; 
        item.textContent = `${track.title} - ${displayDuration}`;
        item.setAttribute('data-index', index);
        item.addEventListener('click', function() { loadTrack(index); playTrack(); });
        trackListElement.appendChild(item);
    });
}

function setupMusicPlayer() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextScreenBtn = document.getElementById('nextButton');
    
    audio.playbackRate = 1.0; 
    renderPlaylist();
    loadTrack(currentTrackIndex); 
    
    playPauseBtn.addEventListener('click', () => { if (audio.paused) { playTrack(); } else { pauseTrack(); } });
    prevBtn.addEventListener('click', () => { loadTrack((currentTrackIndex - 1 + trackList.length) % trackList.length); playTrack(); });
    nextBtn.addEventListener('click', () => { loadTrack((currentTrackIndex + 1) % trackList.length); playTrack(); });
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => { loadTrack((currentTrackIndex + 1) % trackList.length); playTrack(); });
    
    const volumeSlider = document.getElementById('volumeSlider');
    audio.volume = volumeSlider.value; 
    volumeSlider.addEventListener('input', function() { audio.volume = this.value; });
    
    nextScreenBtn.addEventListener('click', function() {
        pauseTrack();
        loadFlowerIntroScreen(); // Mengarahkan ke Layar Intro Bunga
    });
}

function loadMusicScreen() {
    applyNewCSS(musicCSS);
    document.body.innerHTML = musicHTML;
    document.body.classList.remove("not-loaded");
    setupMusicPlayer();

    document.getElementById('backButton').addEventListener('click', function() {
        pauseTrack();
        loadGameboyScreen(); 
    });
}

// --- FUNGSI BUNGA BARU ---

// Fungsi Pindah ke Layar Transisi Bunga (BARU)
function loadFlowerIntroScreen() {
    // 1. Suntikkan CSS Intro
    applyNewCSS(flowerIntroCSS);
    
    // 2. Ganti konten body dengan HTML Intro
    document.body.innerHTML = flowerIntroHTML;
    document.body.classList.remove("not-loaded");

    // 3. Setup tombol untuk memanggil Animasi Bunga
    document.getElementById('startFlowerButton').addEventListener('click', function() {
        // Pindah ke layar animasi bunga yang kompleks
        loadFlowerScreen(); 
    });
}

function initFlowerAnimation() {
    document.body.classList.add("not-loaded"); 
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000); 
}

function loadFlowerScreen() {
    // 1. Suntikkan CSS Animasi Bunga
    applyNewCSS(flowerCSS);
    
    // 2. Ganti konten body dengan HTML Animasi Bunga
    document.body.innerHTML = flowerHTML;

    // 3. Panggil logika JS untuk memulai animasi
    initFlowerAnimation(); 

    // 4. Setup tombol KEMBALI
    document.getElementById('backButton').addEventListener('click', function() {
        document.body.classList.add("not-loaded");
        loadGameboyScreen(); 
    });
}

// --- LOGIKA INTERAKSI KONSOL ---
function setupGameboyInteractions() {
    const startButton = document.querySelector('.start-btn');
    const secondaryText = document.querySelector('.screen .secondary-text');
    
    startButton.addEventListener('click', function() {
        // PERBAIKAN: Langsung masuk ke layar Message saat tombol START ditekan
        if (secondaryText.textContent.includes('Press Start Button')) {
            loadMessageScreen(); 
        } else {
            alert("Tombol START berfungsi sebagai tombol masuk utama. Gunakan tombol Menu di atas!");
        }
    });
    
    document.querySelector('.menu-btn:nth-child(1)').addEventListener('click', loadMessageScreen);
    document.querySelector('.menu-btn:nth-child(2)').addEventListener('click', loadGalleryScreen);
    document.querySelector('.menu-btn:nth-child(3)').addEventListener('click', loadMusicScreen);
    
    // Tombol Flower sekarang memuat Layar Intro
    document.querySelector('.menu-btn:nth-child(4)').addEventListener('click', loadFlowerIntroScreen); 

    document.querySelector('.btn-a').addEventListener('click', () => { alert("Tombol A ditekan!"); });
    document.querySelector('.btn-b').addEventListener('click', () => { alert("Tombol B ditekan!"); });
}

// --- PEMICU AWAL ---
function animateLoading() {
    width += increment;
    
    if (width > 100) { width = 100; }
    
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