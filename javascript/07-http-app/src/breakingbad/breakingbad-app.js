
/**
 * 
 * @returns {Promise<object>} quote informacion
 */
const fetchQuote = async() => {

    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await res.json();

    return data[0];
};

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async( element ) => {

    document.querySelector('#app-title').innerHTML = 'BreakingBad App';
    element.innerHTML = 'Loading...';

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('Button');
    nextQuoteButton.innerText = "Next Quote";

    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    };

    // Añadir listener
    nextQuoteButton.addEventListener('click', async() => {

        element.innerHTML = 'Loading...';
        const quote = await fetchQuote();
        renderQuote( quote );

    });

    fetchQuote()
        .then( data => renderQuote( data ));
};