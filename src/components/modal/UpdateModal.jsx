import { useEffect, useState } from "react";
import "./Modal.css";
import { updateBook } from "../../firebase/firebase.config";

const UpdateModal = ({ isOpen, setModal, book, setMsg }) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionVolume, setCollectionVolume] = useState("");
  const [description, setDescription] = useState("");
  const [borrowed, setBorrowed] = useState(false);
  const [filters, setFilters] = useState(["Todos"]);

  useEffect(() => {
    if (book) {
      setName(book.name || "");
      setAuthor(book.author || "");
      setPublisher(book.publisher || "");
      setCollectionTitle(book.collection?.title || "");
      setCollectionVolume(book.collection?.volume || "");
      setDescription(book.description || "");
      setBorrowed(book.borrowed || false);
      setFilters(book.filters || ["Todos"]);
    }
  }, [book]);

  const closeModal = () => {
    setModal(false);
  };

  const availableFilters = [
    "Sacramentos",
    "Oração",
    "Espiritualidade",
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
        setFilters((prev) => [...prev, value]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      author,
      publisher,
      filters,
      borrowed,
      description,
    };
    if (collectionTitle.length > 2 && collectionVolume.length > 0) {
      formData.collection = {
        title: collectionTitle,
        volume: collectionVolume,
      };
    }
    try {
      await updateBook(book.idDoc, formData);
      closeModal();
      setMsg({ type: "success", msg: "Livro atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      closeModal();
      setMsg({ type: "error", msg: "Problema ao atualizar livro!" });
    }
  };
  if (isOpen) {
    return (
      <>
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <h2>Modificar o registro do livro "{book.name}"</h2>
            </div>
            <form className="body" onSubmit={handleSubmit}>
              <label>
                Nome do Livro:
                <input
                  type="text"
                  required
                  value={name || ""}
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
                  value={author || ""}
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
                  value={publisher || ""}
                  onChange={(e) => handleChangeValue(e, setPublisher)}
                  name="publisher"
                  placeholder="Editora do livro"
                />
              </label>

              <label>
                Coleção:
                <input
                  type="text"
                  value={collectionTitle || ""}
                  onChange={(e) => handleChangeValue(e, setCollectionTitle)}
                  name="collectionTitle"
                  placeholder="Título da coleção"
                />
              </label>

              <label>
                Volume:
                <input
                  type="text"
                  value={collectionVolume || ""}
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
                  value={description || ""}
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
                    "Oração",
                    "Espiritualidade",
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
                        checked={filters.includes(filter) || false}
                      />{" "}
                      {filter}
                    </label>
                  ))}
                </div>
              </div>
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

export default UpdateModal;
