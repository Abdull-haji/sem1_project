// Displays a beach card with image, name, attractions, and best visiting time
function BeachCard({ beach }) {
  return (
    <article className="card h-100 border-0 shadow-sm overflow-hidden beach-card">
      <img src={beach.image} className="card-img-top beach-image" alt={beach.name} />
      <div className="card-body p-4">
        {/* Beach name and zone badge */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="h5 fw-semibold mb-0">{beach.name}</h3>
          <span className="badge rounded-pill bg-info-subtle text-info-emphasis">{beach.zone}</span>
        </div>
        <p className="text-muted small mb-2">{beach.country}</p>
        <p className="text-muted">{beach.description}</p>
        {/* List of activities and attractions at this beach */}
        <div className="mt-3">
          <h6 className="fw-semibold">Attractions</h6>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {beach.attractions.map((item) => (
              <span className="badge bg-light text-dark" key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="mt-3">2
          <h6 className="fw-semibold">Best time</h6>
          <p className="text-muted mb-0">{beach.bestTime}</p>
        </div>
      </div>
    </article>
  );
}

export default BeachCard;
