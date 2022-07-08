import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [chore, setChore] = useState([]);
  const [reward, setReward] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputPoints, setInputPoints] = useState('');

  useEffect(() => {
    getChore(chore);
  },
    [setChore]);

  const getChore = async () => {
    const response = await fetch("https://localhost:7147/ChoreGenerator/chores");
    const deserializedJSON = await response.json();
    setChore(deserializedJSON);
  }

  // const getRewards = async () => {
  //   const response = await fetch("https://localhost:7147/ChoreGenerator/rewards");
  //   const deserializedJSON = await response.json();
  //   setChore(deserializedJSON);
  // }

  const deleteHandler = async (id) => {
    console.log(id);
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow'
    };
    await fetch("https://localhost:7147/ChoreGenerator/chores/" + id, requestOptions);
    getChore();
  }
  
  const completeHandler = async (id, completionstatus) => {
    console.log(id);
    console.log(completionstatus);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      redirect: 'follow'
    };
    await fetch("https://localhost:7147/ChoreGenerator/chores/" + id, requestOptions);
    getChore();
  }

  const sendChore = async (e) => {
    e.preventDefault();
    if (!Number(e.target["points"].value)) {
      e.target["points"].value = 0
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      Task: e.target["chore"].value,
      Points: e.target["points"].value
    })
    console.log(body)
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };
    const response = await fetch("https://localhost:7147/ChoreGenerator/chores", requestOptions)
    const deserializedJSON = await response.json();
    setChore(deserializedJSON);
    setInputText('');
    setInputPoints('');
  }

  return (
      <div className="App">
        <div className='title'>Chore Organizer</div>
        <form className='chore-form' onSubmit={sendChore}>
          <div>Input a Chore:</div>
          <div className='input-field'>
          <input onChange={(e) => {setInputText(e.target.value)}} value={inputText} className='input-input' placeholder='Chore...' type="text" name='chore' autoComplete='off' required />
          <input onChange={(e) => {setInputPoints(e.target.value)}} value={inputPoints} className='input-input' placeholder='Points...' type="number" name='points' autoComplete='off' required />
          </div>
          <button className='submit-button'>Submit</button>
        </form>
        <div className='chore-title'>Chore List:</div>
        <div className='chore-list'>
          {chore.map((item) => {
            return (
              <div className='chore-item'> {item.task}
              <div>
              +{item.points}
              </div>
                <div className='buttons'>
                  <button className='complete-button' onClick={() => completeHandler(item.id, item.completionstatus)}>✓</button>
                  <button className='delete-button' onClick={() => deleteHandler(item.id)}>x</button>
                </div>
              </div>
            )
          })}
        </div>
        {/* <div>Rewards List:</div> */}
        {/* {reward.map((item) => {
        return (
          <div>Task: {item.task} || Points: {item.points} <button onClick={deleteHandler}> Delete </button> </div>
          )
        })} */}
        {/* <form onSubmit={sendChore}>
      <div>Input a Reward:</div>
      <input value={inputText} placeholder='Write a Chore...' type="text" name='chore' autoComplete='off' required/>
      <input value={inputText} placeholder='Points for chore:' type="number" name='points' autoComplete='off' required/>
      <button>Submit</button>
    </form> */}
      </div>
  );
}

export default App;
