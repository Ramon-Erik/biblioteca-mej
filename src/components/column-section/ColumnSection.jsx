import css from "./ColumnSection.module.css"

const ColumnSection = ({children}) => {
  return (
    <section className={css.column}>
      {children}
    </section>
  )
}

export default ColumnSection