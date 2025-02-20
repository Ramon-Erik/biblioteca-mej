import { useState } from "react";
import "./Modal.css";

const AddModal = ({ isOpen, closeModal, ids }) => {
  // const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionVolume, setCollectionVolume] = useState("");
  const [description, setDescription] = useState("");
  const [borrowed, setBorrowed] = useState(false);
  const [filters, setFilters] = useState([]);

  const availableFilters = [
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
  ];

  const handleChangeValue = (event, setter) => setter(event.target.value);

  const handleChangeFilters = (event) => {
    const value = event.target.value;
    if (filters.includes(value)) {
      setFilters((prev) => prev.filter((f) => f !== value));
    } else {
      if (availableFilters.includes(value)) {
        setFilters((prev) => [...prev, value])
        console.log([...filters, value]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newId;
    while (true) {
      newId = Math.floor(Math.random() * 50) + 1;
      if (!ids.includes(newId)) break;
    }
    const formData = {
      id: newId,
      name,
      author,
      publisher,
      filters,
      borrowed,
      description,
    };
    if (collectionTitle.length > 2 && collectionVolume.at.length > 0) {
      formData.collection = {
        title: collectionTitle,
        volume: collectionVolume,
      };
    }
    console.log(formData);
    
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
                <input
                  type="text"
                  required
                  onChange={(e) => handleChangeValue(e, setName)}
                  name="name"
                  placeholder="Título do livro"
                />
              </label>

              <label>
                Autor:
                <input
                  type="text"
                  required
                  onChange={(e) => handleChangeValue(e, setAuthor)}
                  name="author"
                  placeholder="Autor do livro"
                />
              </label>

              <label>
                Editora:
                <input
                  type="text"
                  required
                  onChange={(e) => handleChangeValue(e, setPublisher)}
                  name="publisher"
                  placeholder="Editora do livro"
                />
              </label>

              <label>
                Coleção:
                <input
                  type="text"
                  onChange={(e) => handleChangeValue(e, setCollectionTitle)}
                  name="collectionTitle"
                  placeholder="Título da coleção"
                />
              </label>

              <label>
                Volume:
                <input
                  type="text"
                  onChange={(e) => handleChangeValue(e, setCollectionVolume)}
                  name="collectionVolume"
                  placeholder="Volume da coleção"
                />
              </label>

              <label>
                Descrição:
                <textarea
                  onChange={(e) => handleChangeValue(e, setDescription)}
                  name="description"
                  placeholder="Descrição do livro"
                  required
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
                      <input
                        type="checkbox"
                        onChange={handleChangeFilters}
                        name="filters"
                        value={filter}
                      />{" "}
                      {filter}
                    </label>
                  ))}
                </div>
              </div>

              <label className="inline">
                Está emprestado?
                <input
                  type="checkbox"
                  onChange={(e) => handleChangeValue(e, setBorrowed)}
                  name="borrowed"
                />
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
