import PropTypes from "prop-types";

const ListaCatalogos = ({
  catalogos,
  navigate,
  editingId,
  editedNombre,
  setEditedNombre,
  onEdit,
  onSaveNombre,
  onDelete
}) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-2 text-sm">
      {catalogos.map((cat) => (
        <div key={cat.id} className="flex items-center justify-between text-sm">
          {editingId === cat.id ? (
            <input
              className="bg-gray-200 rounded px-2 py-0.5 w-full text-sm text-gray-800 outline-none"
              value={editedNombre}
              autoFocus
              onChange={(e) => setEditedNombre(e.target.value)}
              onBlur={() => onSaveNombre(cat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveNombre(cat.id);
              }}
            />
          ) : (
            <div
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition w-full"
              onClick={() => navigate(`/catalogo/${cat.id}`)}
            >
              📁 {cat.nombre}
            </div>
          )}

          <img
            src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
            alt="edit icon"
            className="w-4 h-4 ml-2 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => onEdit(cat.id, cat.nombre)}
          />
          <img
  src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" // icono de basura
  alt="delete icon"
  className="w-4 h-4 ml-2 cursor-pointer opacity-70 hover:opacity-100"
  onClick={() => onDelete(cat.id)}
/>
        </div>
      ))}
    </div>
  );
};

ListaCatalogos.propTypes = {
  catalogos: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  editedNombre: PropTypes.string,
  setEditedNombre: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSaveNombre: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListaCatalogos;
