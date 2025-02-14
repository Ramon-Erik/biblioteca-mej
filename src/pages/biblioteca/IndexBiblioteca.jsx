import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import LinkButton from "../../components/link-button/LinkButton";
import Slider from "../../components/slider/Slider";
import Separator from "../../components/separator/Separator";

import img1 from "../../assets/mej-1.jpg";
import img2 from "../../assets/mej-2.jpg";
import img3 from "../../assets/mej-3.jpg";
import img4 from "../../assets/mej-4.jpg";

import css from "../../components/section/Section.module.css";

const IndexBiblioteca = () => {
  const imgs = [
    {
      id: 1,
      link: img1,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 2,
      link: img2,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 3,
      link: img3,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 4,
      link: img4,
      alt: "Foto tirada em encontro do mej",
    },
  ];
  return (
    <>
      <Header link="/biblioteca/login"/>
      <main>
        <Section>
          <article className={css.area}>
            <h2>Biblioteca do MEJ</h2>
            <p>
              Com o hábito da leitura, você aprofunda sua compreensão dos
              ensinamentos e tradições da Igreja, fortalecendo sua
              espiritualidade mejista e se aproximando dos valores católicos.
            </p>
            <LinkButton text="Alugar livro" link="/biblioteca#alugar" />
          </article>
          <div className={css.area}>
            <Slider imgs={imgs} />
          </div>
        </Section>
        <Separator>
          <q>
            Só se <strong>ama</strong> aquilo que se <strong>conhece</strong>
          </q>
        </Separator>
        <Section>
          <article className={css.area}>
            <h2>Sobre o projeto</h2>
            <p>
              A biblioteca do MEJ busca tornar presente no dia-a-dia dos jovens
              o hábito da leitura, e também conhecimento acerca da beleza dos
              elementos importantíssimos para a fé católica, como a Sagrada
              Tradição, Sagrada Escritura e o Sagrado Magistério, oferecendo
              livros que os ajudarão em seu crescimento espiritual.
            </p>
          </article>
          <div className={css.area}>
            <img
              src={img2}
              width="350px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </Section>
        <Separator>
          <q><strong>Creio</strong> para entender e <strong>entendo</strong> para crer</q>
        </Separator>
      </main>
    </>
  );
};

export default IndexBiblioteca;
