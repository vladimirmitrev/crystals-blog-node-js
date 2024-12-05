const CrystalEditModal = ({
    onClose,
    onEdit,
    name,
    show
}) => {
    if (!show) {
        return null;
    } 
    return (
        <div className={`modal d-block modal-backdrop`} onClick={onClose} id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog animated zoomIn" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="deleteModalLabel">Are you sure you want to edit this {name} crystal?</h4>
                    <button type="button" className="btn-close" onClick={onClose} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-primary rounded-pill" data-dismiss="modal" onClick={onClose} data-target="#deleteModal">Close</button>
                    <button type="button" className="btn btn-warning rounded-pill" onClick={onEdit}>Confirm</button>
                </div>
            </div>
        </div>
      </div>
    )
}

export default CrystalEditModal;