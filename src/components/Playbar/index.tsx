import './style.scss';

function Playbar({trackId}: any) {
  const srcEmbed = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <div className='playbar'>
      <iframe  
        src={srcEmbed}
        width='613px' 
        height='80px'
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' 
        loading='lazy'>  
      </iframe>
    </div>
  )
}

export default Playbar;