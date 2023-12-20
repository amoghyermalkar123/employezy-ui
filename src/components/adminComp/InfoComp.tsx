function InfoComp() {
  return (
    <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2">
      <div className="card h-72 w-full bg-base-100 border-2">
        <div className="card-body">
          <h2 className="card-title">Notifications</h2>
          <div className="divider" />
        </div>
      </div>
      <div className="card h-72 w-full bg-base-100 border-2">
        <div className="card-body">
          <h2 className="card-title">Messages</h2>
          <div className="divider" />
        </div>
      </div>
    </div>
  );
}

export default InfoComp;
