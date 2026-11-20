
import { useEffect, useState } from "react";

function ImageZoom({ src, alt }) {
  const [zoomStyle, setZoomStyle] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const hideZoom = () => setZoomStyle(null);

  useEffect(() => {
    const handleWindowBlur = () => hideZoom();
    const handleVisibilityChange = () => {
      if (document.hidden) hideZoom();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPreviewOpen(false);
        hideZoom();
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  return (
    <>
      <div
        className="image-zoom-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={hideZoom}
      >
        <div className="product-image">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onClick={() => {
              hideZoom();
              setIsPreviewOpen(true);
            }}
          />
        </div>

        {zoomStyle && !isPreviewOpen && (
          <div className="zoom-panel" style={zoomStyle} />
        )}
      </div>

      {isPreviewOpen && (
        <div
          className="image-preview-overlay"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button
            className="image-preview-close"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close image preview"
          >
            &times;
          </button>

          <img
            src={src}
            alt={alt}
            className="image-preview-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ImageZoom;
