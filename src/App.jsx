import { useEffect, useState } from "react"

const urlApi = 'http://localhost:3000/products';

function App() {

  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // 1 - resgatando dados
  useEffect(() => {
    async function getResponse() {
      const response = await fetch(urlApi);
      const data = await response.json();
      setData(data);
    };

    getResponse();
  }, []);

  // 2 - adicionando produtos
  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name,
      price
    };

    const response = await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    });
  };


  return (
    <div>
      <h1>Lista de Produtos</h1>
      <div>
        <ul>
          {data && data.map((item) => (
            <li key={item.id}>
              <strong>Produto:</strong> {item.name} - R$ {item.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number" value={price} name="price" onChange={(event) => setPrice(event.target.value)} />
          </label>
          <input type="submit" value='Criar' />
        </form>
      </div>
    </div>
  )
}

export default App
