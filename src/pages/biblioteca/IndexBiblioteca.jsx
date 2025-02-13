import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import LinkButton from "../../components/link-button/LinkButton";
import Anchor from "../../components/anchor/Anchor";
import css from "../../components/section/Section.module.css";

const IndexBiblioteca = () => {
  return (
    <>
      <Header />
      <main>
        <Section>
          <article className={css.area}>
            <h2>Biblioteca do MEJ</h2>
            <p>
              Com o hábito da leitura, você aprofunda sua compreensão dos
              ensinamentos e tradições da Igreja, fortalecendo sua
              espiritualidade mejista e se aproximando dos valores católicos.
            </p>
            <Anchor text="Alugar livro" link="/biblioteca#alugar"/>
          </article>
          <div className={css.area}>
            <p>
              slider
            </p>
          </div>
        </Section>
      </main>
    </>
  );
};

export default IndexBiblioteca;
