import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import LinkButton from "../../components/link-button/LinkButton";
import Slider from "../../components/slider/Slider";


import img1 from "../../assets/mej-1.jpg";
import img2 from "../../assets/mej-1.jpg";
import img3 from "../../assets/mej-1.jpg";
import img4 from "../../assets/mej-1.jpg";


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
            <LinkButton text="Alugar livro" link="/biblioteca#alugar" />
          </article>
          <div className={css.area}>
            {/* <Swiper
              className="swiper"
              modules={[Navigation, Pagination, A11y]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              navigation
              loop
            >
              {imgs.map((i) => (
                <SwiperSlide key={i.id}>
                  {<img src={i.link} alt={i.alt} />}
                </SwiperSlide>
              ))}
            </Swiper> */}
            <Slider imgs={imgs}/>
          </div>
        </Section>
      </main>
    </>
  );
};

export default IndexBiblioteca;
