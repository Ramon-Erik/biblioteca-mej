import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import LinkButton from "../../components/link-button/LinkButton";
import Slider from "../../components/slider/Slider";
import Separator from "../../components/separator/Separator";

import img1 from "../../assets/mej-1.jpg";
import img2 from "../../assets/mej-2.jpg";
import img3 from "../../assets/mej-3.jpg";
import img4 from "../../assets/mej-4.jpg";

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
      <Header link="/biblioteca/login" />
      <main>
        <Section>
          <article>
            <h2>Biblioteca do MEJ</h2>
            <p>
              Com o hábito da leitura, você aprofunda sua compreensão dos
              ensinamentos e tradições da Igreja, fortalecendo sua
              espiritualidade mejista e se aproximando dos valores católicos.
            </p>
            <LinkButton text="Alugar livro" link="/biblioteca#alugar" />
          </article>
          <div>
            <Slider imgs={imgs} />
          </div>
        </Section>
        <Separator>
          <q>
            Só se <strong>ama</strong> aquilo que se <strong>conhece</strong>
          </q>
        </Separator>
        <Section>
          <article>
            <h2>Sobre o projeto</h2>
            <p>
              A biblioteca do MEJ busca trazer para os jovens o hábito da
              leitura, e também conhecimento acerca da beleza dos da fé
              católica, na Tradição, Escritura e o Magistério, oferecendo livros
              que os ajudarão em seu crescimento espiritual.
            </p>
          </article>
          <div>
            <img
              src={img2}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </Section>
        <Separator>
          <q>
            <strong>Creio</strong> para entender e <strong>entendo</strong> para
            crer
          </q>
        </Separator>
        <Section>
          <article>
            <h2>Como funciona</h2>
            <p>
              O mejista interessado em ler um dos livros do acervo do mej, entra
              em contato com a Emily &#40;vice-coordenadora do movimento&#41;,
              para combinar como pagar a taxa de empréstimo e quando pegar o
              livro.
            </p>
            <LinkButton text="Ver livros" link="/biblioteca#catalogo" />
          </article>
          <div>
            <img
              src={img3}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </Section>
        <Separator>
          <q>
          Conhecereis a <strong>Verdade</strong>, e a verdade vos <strong>libertará</strong>
          </q>
        </Separator>
        <Section>
          <article>
            <h2>Taxa de empréstimo</h2>
            <p>
              A fim de que o movimento pudesse ter uma forma de arrecadar
              dinheiro para suas despesas, é cobrado um valor simbólico de
              R&#36; 1,00 &#40;um real&#41; pelo empréstimo, que é cobrado no ato de entrega do livro.
            </p>
          </article>
          <div>
            <img
              src={img4}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </Section>
      </main>
    </>
  );
};

export default IndexBiblioteca;
