export default function YouTubePlayer() {
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-10 sm:hidden">
      <div className="relative w-full h-[80vh]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/iMMH1-bWQ80?autoplay=1&loop=1&playlist=iMMH1-bWQ80&controls=1&modestbranding=1&rel=0&vq=hd720"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
