import css from "./SquareSection.module.css"

const SquareSection = ({children}) => {
  return (
    <section className={css.section}>
      {children}
    </section>
  )
}

export default SquareSection