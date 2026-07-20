import { useState } from 'react';

function GallerySection({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="row g-4">
        {images.map((image, index) => (
          <div className="col-sm-6 col-lg-4" key={`${image}-${index}`}>
            <div className="gallery-card" onClick={() => setSelectedImage(image)}>
              <img src={image} alt={`Beach view ${index + 1}`} />
              <div className="gallery-overlay">Preview</div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Large preview" className="lightbox-image" />
        </div>
      )}
    </>
  );
}

export default GallerySection;
