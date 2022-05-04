import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

/*
    render(element, container, callback)
    -> element를 root라는 id를 가지는 div DOM Element
        아래에 SubTree 형태로 넣어준다.
*/
