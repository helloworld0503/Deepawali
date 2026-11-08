import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Sparkles, Gift, Heart, Copy, Share2, Volume2, VolumeX, ArrowRight, RotateCcw } from 'lucide-react'
import './style.css'

const defaultMessage = 'May your life be filled with the glow of happiness, the warmth of love, and the sparkle of a thousand dreams. Wishing you and your family a beautiful Diwali!'
const params = new URLSearchParams(window.location.search)
const fromLink = params.has('to') || params.has('from')
const decode = (v, fallback='') => { try { return v ? decodeURIComponent(v) : fallback } catch { return fallback } }

function App() {
  const [sender, setSender] = useState(decode(params.get('from'), 'A friend'))
  const [recipient, setRecipient] = useState(decode(params.get('to'), ''))
  const [message, setMessage] = useState(decode(params.get('message'), defaultMessage))
  const [opened, setOpened] = useState(false)
  const [showCreate, setShowCreate] = useState(!fromLink)
  const [copied, setCopied] = useState(false)
  const [sound, setSound] = useState(false)

  useEffect(() => {
    if (fromLink) setShowCreate(false)
  }, [])

  const shareUrl = useMemo(() => {
    const u = new URL(window.location.href)
    u.search = new URLSearchParams({ from: sender, to: recipient || 'Someone special', message }).toString()
    return u.toString()
  }, [sender, recipient, message])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true); setTimeout(() => setCopied(false), 2200)
    } catch { window.prompt('Copy your Diwali gift link:', shareUrl) }
  }
  const shareWhatsApp = () => {
    const text = `🪔 A little Diwali surprise for you! Open your gift here: ${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  const startOver = () => { setOpened(false); setShowCreate(true); history.replaceState({}, '', location.pathname) }

  return <main className="page">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar"><div className="brand"><span className="brand-mark">✺</span><span>little<span className="brand-light">light</span></span></div><div className="top-note"><span className="status-dot"/> A FESTIVE LITTLE SURPRISE</div></header>

    <section className="hero">
      <div className="eyebrow"><Sparkles size={14}/> THE FESTIVAL OF LIGHTS <Sparkles size={14}/></div>
      <h1>Make someone’s<br/><em>Diwali brighter.</em></h1>
      <p className="intro">Some gifts come wrapped in paper.<br className="desktop"/> The best ones arrive wrapped in love.</p>

      {!showCreate ? <div className="gift-area">
        {!opened ? <div className="gift-stage">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <button className="gift-box" onClick={() => setOpened(true)} aria-label="Open your Diwali gift">
            <span className="gift-glow"/><span className="gift-lid"/><span className="gift-body"/><span className="gift-ribbon-v"/><span className="gift-ribbon-h"/><span className="gift-bow">✿</span>
          </button>
          <div className="tap-hint"><span className="pulse"/> TAP TO OPEN YOUR GIFT</div>
        </div> : <div className="reveal-card">
          <div className="reveal-icon">🪔</div>
          <div className="small-label">A LITTLE NOTE FOR {recipient ? recipient.toUpperCase() : 'YOU'}</div>
          <h2>Happy Diwali!</h2>
          <p className="wish">{message}</p>
          <div className="divider"><span>✦</span></div>
          <p className="signature">With light & love,<br/><strong>{sender}</strong></p>
          <button className="secondary-btn" onClick={startOver}><RotateCcw size={15}/> Create a gift of your own</button>
        </div>}
      </div> : <div className="create-card">
        <div className="card-heading"><div className="mini-gift">🎁</div><div><h2>Create a little surprise</h2><p>Make a Diwali wish personal.</p></div></div>
        <label>Your name<input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Enter your name" maxLength={45}/></label>
        <label>Who is it for?<input value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="A name or someone special" maxLength={45}/></label>
        <label>Your Diwali message<textarea value={message} onChange={e=>setMessage(e.target.value)} rows="3" maxLength={260}/></label>
        <button className="primary-btn" disabled={!sender.trim()} onClick={()=>{setShowCreate(false);setOpened(false)}}>Create my Diwali gift <ArrowRight size={17}/></button>
      </div>}

      {!showCreate && opened && <div className="share-row">
        <button className="primary-btn share-main" onClick={shareWhatsApp}><Share2 size={17}/> Send on WhatsApp</button>
        <button className="icon-btn" onClick={copyLink} aria-label="Copy gift link"><Copy size={17}/></button>
        <span className="copy-feedback">{copied ? 'Link copied!' : ''}</span>
      </div>}
      {!showCreate && !opened && <button className="text-link" onClick={()=>setShowCreate(true)}>Create your own Diwali gift <ArrowRight size={15}/></button>}
    </section>

    <section className="bottom-note"><div className="tiny-diya">✧</div><p>May your home glow with joy, your heart shine with hope,<br className="desktop"/> and your days sparkle with endless possibilities.</p><div className="bottom-rule"/></section>
    <footer><span>MADE WITH <Heart size={11} fill="currentColor"/> FOR THE FESTIVAL OF LIGHTS</span><button onClick={()=>setSound(!sound)} className="sound-btn">{sound ? <Volume2 size={14}/> : <VolumeX size={14}/>} SOUND {sound ? 'ON' : 'OFF'}</button></footer>
    <div className="floating f1">✦</div><div className="floating f2">✧</div><div className="floating f3">✦</div><div className="floating f4">✧</div>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
