import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const images = [];
        for (let i = 1; i <= 68; i++) {
            const number = String(i).padStart(4, '0');
            images.push(`/images/background_${number}.jpg`);
        }

        document.body.style.backgroundImage = `url('${images[Math.floor(Math.random() * images.length)]}')`;
        document.body.style.backgroundSize = 'cover';  // 画面全体に背景画像を適用
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
    }, []);

    return (
        <div style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div className="form-container" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                width: 'fit-content', 
                boxSizing: 'border-box'
            }}>
                <h1 style={{
                    fontFamily: '"Arial", sans-serif',
                    fontSize: '22px', 
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    whiteSpace: 'nowrap'
                }}>Convert EPS/PSD/HEIC/TIFF to JPG/PNG</h1>
                <form action="/api/convert" method="post" encType="multipart/form-data">
                    <input type="file" name="file" accept=".eps,.psd,.heic,.tiff" required />
                    <br /><br />
                    <select name="format">
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                    </select>
                    <br /><br />
                    <button type="submit" style={{
                        fontFamily: '"Arial", sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: 'linear-gradient(45deg, #f3ec78, #af4261)',
                        color: 'white',
                        marginTop: '10px',
                        transition: 'background 0.3s ease',
                    }}>Convert</button>
                </form>
                <div className="footer" style={{
                    marginTop: '20px',
                    fontSize: '12px',
                    color: 'gray'
                }}>ファイルコンバー太 1.0</div>
            </div>
        </div>
    );
}
