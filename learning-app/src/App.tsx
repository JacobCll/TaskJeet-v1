import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

let idCounter = 0;
// list of jsx quotes

export default function Quotes() {
  const [name, setName] = useState("");
  const [quotes, setQuotes] = useState([]);

  let quotes_list = [];

  const clearQuote = (id: any) => {
    setQuotes(quotes.filter((quote) => quote.id !== id));
  };

  // iterate each quote and turn it into jsx
  quotes.forEach((quote: any) => {
    if (quote.author.toLowerCase().indexOf(name.toLowerCase()) === -1) {
      return;
    }

    quotes_list.push(
      <div className="quote-box">
        <div className="highlighted">
          <h4 className="quote-quote">"{quote.quote}"</h4>
          <p className="quote-author">{quote.author}</p>
          <button className="clear-quote" onClick={() => clearQuote(quote.id)}>
            Clear
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <ToolBar
        quotes={quotes}
        setQuotes={setQuotes}
        name={name}
        setName={setName}
      />

      <div className="quotes-collection">{quotes_list}</div>
    </>
  );
}

function ToolBar({ quotes, setQuotes, name, setName }) {
  const getQuote = () => {
    axios
      .get("api/random")
      .then((response) => {
        const quote = response.data[0].q;
        const author = response.data[0].a;
        console.log(response.data[0]);

        setQuotes([
          ...quotes,
          {
            id: idCounter++,
            quote: quote,
            author: author,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="toolbar">
      <h1 className="app-title ">Quote List</h1>
      <input
        value={name}
        placeholder="Search Author..."
        onChange={(e) => setName(e.target.value)}
      />

      <div className="quote-buttons">
        <button className="get-quote-button" onClick={getQuote}>
          New Quote
        </button>
        <button
          onClick={() => {
            setQuotes([]);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
