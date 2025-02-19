import "./Modal.css";

const AddModal = ({ isOpen, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("verificando dados");
  };
  if (isOpen) {
    return (
      <>
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <h2>Adicionar livro na biblioteca</h2>
            </div>
            <form className="body" onSubmit={handleSubmit}>
              <label>
                Nome do Livro:
                <input type="text" name="name" placeholder="Título do livro" />
              </label>

              <label>
                Autor:
                <input type="text" name="author" placeholder="Autor do livro" />
              </label>

              <label>
                Editora:
                <input
                  type="text"
                  name="publisher"
                  placeholder="Editora do livro"
                />
              </label>

              <label>
                Coleção:
                <input
                  type="text"
                  name="collectionTitle"
                  placeholder="Título da coleção"
                />
              </label>

              <label>
                Volume:
                <input
                  type="text"
                  name="collectionVolume"
                  placeholder="Volume da coleção"
                />
              </label>

              <label>
                Descrição:
                <textarea
                  name="description"
                  placeholder="Descrição do livro"
                  rows="4"
                ></textarea>
              </label>

              <div className="filters-container">
                <label className="filters-label">Filtros:</label>
                <div className="filters-grid">
                  {[
                    "Sacramentos",
                    "Igreja",
                    "Doutrina",
                    "Tradição",
                    "Bíblia",
                    "Formação",
                    "Magistério",
                    "Apologética",
                    "História",
                    "Santos",
                    "Eucaristia",
                    "Virgem Maria",
                    "Devoção",
                    "Consagração",
                    "Liturgia",
                    "Testemunho",
                    "Perseguição",
                    "Autobiografia",
                    "Infantil",
                    "Purgatório",
                  ].map((filter) => (
                    <label key={filter} className="filter-option">
                      <input type="checkbox" name="filters" value={filter} />{" "}
                      {filter}
                    </label>
                  ))}
                </div>
              </div>

              <label className="inline">
                Está emprestado?
                <input type="checkbox" name="borrowed" />
              </label>

              <div className="buttons">
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default AddModal;
