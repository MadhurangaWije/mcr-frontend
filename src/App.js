import {useState} from 'react';
import './App.css'
import axios from 'axios';
import Loader from "react-loader-spinner";

function App() {
  const [questionContext, setQuestionContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onClickFindAnswer = ()=>{
    setIsLoading(true);
    axios.post(`http://127.0.0.1:5000/predict`, { context:questionContext, question:question })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setAnswer(res.data.answer);
        setIsLoading(false);
      })
  };

  const onClickClearAll = ()=>{
    setAnswer('');
    setQuestionContext('');
    setQuestion('');
  };


  return (
    <div className="App">
      <header className="App-header">
       <h3>Sinhala Machine Comprehension Reading</h3>
       <p>By Chathumi Abeysinghe</p>
      <div>
        <textarea rows="10" cols="100" value={questionContext} placeholder="Enter the context of the question" onChange={(e)=>setQuestionContext(e.target.value)}></textarea>
        <br/>
        <input style={{'width':'40%', 'height':'25px'}} placeholder="Enter the question phrase" value={question} onChange={(e)=>setQuestion(e.target.value)} />
        <br/>
        <button onClick={()=>onClickFindAnswer()}>Find Answer</button>
        <br/>
        <button onClick={()=>onClickClearAll()}>Clear All</button>
      </div>
      <br/>
      { answer!=='' && !isLoading? <div><h4>Predicted Answer</h4>
          <div>
            <textarea disabled rows="10" cols="100" value={answer} style={{'color':'block', 'fontWeight':'bold', 'padding':'10px'}}></textarea>
          </div></div> : answer === '' && isLoading? <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      /> : null}
      </header>
      
    </div>
  );
}

export default App;
