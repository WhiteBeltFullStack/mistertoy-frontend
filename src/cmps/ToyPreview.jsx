export function ToyPreview({ toy }) {
  return (
    <section className="toy-preview">
      <h2>Toy : {toy.name} </h2>
      <img src={toy.imgUrl} alt="Toy Image" />
      <h3>Price : {toy.price}</h3>
    </section>
  )
}
