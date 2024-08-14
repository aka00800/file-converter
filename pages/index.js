import React, { useEffect, useState } from 'react';

export default function Home() {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('jpg');

    useEffect(() => {
        const images = [];
        for (let i = 1; i <= 68; i++) {
            const number = String(i).padStart(4, '0');
            images.push(`/images/background_${number}.jpg`);
        }

        document.body.style.backgroundImage = `url('${images[Math.floor(Math.random() * images.length)]}')`;
        document.body.style.backgroundSize = 'cover';  
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFormatChange = (event) => {
        setFormat(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', format);

        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData,
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${format}`;
        a.click();
    };

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
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <select value={format} onChange={handleFormatChange}>
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
