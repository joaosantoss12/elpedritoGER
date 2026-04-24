import { useState, useRef } from 'react';
import { Send, Trophy, CheckCircle, AlertTriangle, X, Play, Pause } from 'lucide-react';
import './App.css';

interface BettingPrint {
  id: number;
  imageUrl: string;
  odd: number;
} 

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const prints: BettingPrint[] = [
    { id: 1, imageUrl: "/futebol (1).jpeg", odd: 3.00 },
    { id: 2, imageUrl: "/futebol (2).jpeg", odd: 1.65 },
    { id: 3, imageUrl: "/futebol (3).jpeg", odd: 2.15 },
    { id: 4, imageUrl: "/futebol (4).jpeg", odd: 2.00 },
    { id: 5, imageUrl: "/futebol (5).jpeg", odd: 2.82 },
    { id: 6, imageUrl: "/futebol (6).jpeg", odd: 2.20 },
    { id: 7, imageUrl: "/futebol (7).jpeg", odd: 2.05 },
  ];

  const handleRedirect = () => {
    window.open(`https://wa.pulse.is/15559466360?start=69eb7a00aaad0e98190c6382&text=PEDRITO,%20ich%20möchte%20in%20deine%20kostenlose%20Gruppe%20eintreten`, '_blank');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="app-wrapper">
      <audio ref={audioRef} loop>
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>
      <header className="hero">
        <video className="hero-video" autoPlay loop muted playsInline x-webkit-airplay="deny">
          <source src="/m2.mp4" type="video/mp4" />
        </video>
        <button onClick={toggleMusic} className="volume-toggle" aria-label="Toggle music">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <div className="hero-content">
          <span className="badge">⚽ El Pedrito ⚽</span>
          <h1>Dominiere die Wetten im <span className="highlight">Fußball</span></h1>
          <p className="subtitle">
            Detaillierte Analysen, bewährte Strategien und nachgewiesene Ergebnisse.
            Tritt jetzt kostenlos über den Button unten in die Gruppe ein.
          </p>
          
          <button onClick={handleRedirect} className="cta-button primary pulse">
            <Send size={20} />
            Jetzt kostenlos der Gruppe beitreten
          </button>
        </div>
      </header>

      <div className="container">
        <section className="proof-section">
          <h2><Trophy className="icon-yellow" /> Aktuelle Ergebnisse</h2>
          <p className="section-desc">
            Überzeug dich nicht nur durch Worte – überzeug dich durch die Ergebnisse.<br/>
            Klick auf die Bilder zum Vergrößern.
          </p>
          <p className="section-tagline">Ich hasse niedrige Quoten 😤</p>
          
          <div className="prints-grid">
            {prints.map((print) => (
              <div 
                key={print.id} 
                className="print-card"
                onClick={() => setSelectedImage(print.imageUrl)}
              >
                <div className="image-placeholder">
                  <img src={print.imageUrl} alt="Gewonnene Wette" />
                </div>
                <div className="print-footer">
                  <CheckCircle size={16} color="#FFCC00" />
                  <span>Wette gewonnen [{print.odd.toFixed(2)}]</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <button onClick={handleRedirect} className="cta-button secondary">
            Jetzt kostenlos der Gruppe beitreten
          </button>
          
          <div className="disclaimer">
            <AlertTriangle size={16} />
            <p>
              Sportwetten bergen Risiken. Spiele verantwortungsvoll.
              Verboten für Personen unter 18 Jahren.
            </p>
          </div>
          <p className="copyright">© 2026 El Pedrito. Alle Rechte vorbehalten.</p>
        </footer>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="Wettdetails" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
