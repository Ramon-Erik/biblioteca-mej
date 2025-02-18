import css from "./CatalogControls.module.css";

const CatalogControls = ({results="nenhum", handleChangeValue}) => {
  const handleChange = (e) => handleChangeValue(e.target.value) 
  return (
    <div className={css.controls}>
      <span>Filtro&#58;&nbsp;</span>
      <select name="filters" id="filters" className={css.filterSelect} onChange={handleChange}>
        <option value="Todos">Todos</option>
        <option value="Sacramentos">Sacramentos</option>
        <option value="Igreja">Igreja</option>
        <option value="Doutrina">Doutrina</option>
        <option value="Tradição">Tradição</option>
        <option value="Bíblia">Bíblia</option>
        <option value="Formação">Formação</option>
        <option value="Magistério">Magistério</option>
        <option value="Apologética">Apologética</option>
        <option value="História">História</option>
        <option value="Santos">Santos</option>
        <option value="Eucaristia">Eucaristia</option>
        <option value="Virgem Maria">Virgem Maria</option>
        <option value="Devoção">Devoção</option>
        <option value="Consagração">Consagração</option>
        <option value="Liturgia">Liturgia</option>
        <option value="Testemunho">Testemunho</option>
        <option value="Perseguição">Perseguição</option>
        <option value="Autobiografia">Autobiografia</option>
        <option value="Infantil">Infantil</option>
        <option value="Purgatório">Purgatório</option>
      </select>
        {
          results === "nenhum" || results === 0? (
            <span>Nenhum resultado</span>
          ) : (
            results === 1 ? (
              <span>1 resultado</span>
            ) : (
              <span>{results} resultados</span>
            )
          )
        }
    </div>
  );
};

export default CatalogControls;
