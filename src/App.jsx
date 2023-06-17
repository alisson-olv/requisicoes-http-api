import { useState } from "react"

import { useFetch } from "./hooks/UseFetch";

import { AiFillDelete } from "react-icons/ai";

const urlApi = 'http://localhost:3000/products';

function App() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const { data: items, httpConfig, loading, error } = useFetch(urlApi);

  // 2 - adicionando produtos
  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name,
      price
    };

    httpConfig(product, 'POST');

    // 4 - resetando inputs
    setName('');
    setPrice('');
  };

  const handleDelete = (id) => {
    httpConfig(id, 'DELETE');
  }

  return (
    <div>
      <h1>Lista de Produtos</h1>
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
          {loading && <input type="submit" disabled value='Aguarde' />}
          {!loading && <input type="submit" value='Criar' />}
        </form>
      </div>
      <div>
        {loading && <p>Carregando dados!</p>}
        {error && <p>{error}</p>}
        <ul>
          {items && items.map((item) => (
            <li key={item.id}>
              <strong>Produto:</strong> {item.name} - R$ {item.price}
              {/* <button onClick={() => handleDelete(item.id)}>Delete</button> */}
              <AiFillDelete
                className="icon-delete"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
