import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [chore, setChore] = useState([]);
  const [reward, setReward] = useState([]);
  const [inputText, setInputText] = useState('');
  const [pointTracker, setPointTracker] = useState(0);
  const [inputPoints, setInputPoints] = useState('');

  useEffect(() => {
    getChore(chore);
    // getReward(reward);
  },
    [setChore]);

  const getChore = async () => {
    const response = await fetch("https://localhost:7147/ChoreGenerator/chores");
    const deserializedJSON = await response.json();
    setChore(deserializedJSON);
  }
  // const getReward = async () => {
  //   const response = await fetch("https://localhost:7147/ChoreGenerator/rewards");
  //   const deserializedJSON = await response.json();
  //   setReward(deserializedJSON);
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
    alert('Chore removed from list');
  }

  let currentPoints = pointTracker;
  const pointHandler = async (id, points) => {
    console.log(id);
    console.log(points);
    setPointTracker(currentPoints += points);
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow'
    };
    await fetch("https://localhost:7147/ChoreGenerator/chores/" + id, requestOptions);
    getChore();
  }

  const fakePointHandler = (points) => {
    if(currentPoints < points){return alert('Insufficient funds')}
    if(window.confirm(`Do you want to purchase this item for ${points} points?`)){
      alert('Purchase Confirmed');
      setPointTracker(currentPoints -= points);
    } else {
      alert('Purchase Canceled');
    }
  }

  // const completeHandler = async (id, completionstatus) => {
  //   console.log(id);
  //   console.log(completionstatus);
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const body = JSON.stringify({
  //     CompletionStatus: completionstatus
  //   })
  //   const requestOptions = {
  //     method: 'PUT',
  //     mode: 'cors',
  //     redirect: 'follow'
  //   };
  //   await fetch("https://localhost:7147/ChoreGenerator/chores/" + id, requestOptions);
  //   getChore();
  // }

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

  // const sendReward = async (e) => {
  //   e.preventDefault();
  //   if (!Number(e.target["points"].value)) {
  //     e.target["points"].value = 0
  //   }
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const body = JSON.stringify({
  //     Task: e.target["reward"].value,
  //     Points: e.target["points"].value
  //   })
  //   console.log(body)
  //   const requestOptions = {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: myHeaders,
  //     body: body,
  //     redirect: 'follow'
  //   };
  //   const response = await fetch("https://localhost:7147/ChoreGenerator/rewards", requestOptions)
  //   const deserializedJSON = await response.json();
  //   setChore(deserializedJSON);
  //   setInputText('');
  //   setInputPoints('');
  // }

  return (
    <div className="App">
      <div className='title'>Chore Organizer</div>
      <form className='chore-form' onSubmit={sendChore}>
        <div>Input a Chore:</div>
        <div className='input-field'>
          <input onChange={(e) => { setInputText(e.target.value) }} value={inputText} className='input-input' placeholder='Chore...' type="text" name='chore' autoComplete='off' required />
          <input onChange={(e) => { setInputPoints(e.target.value) }} value={inputPoints} className='input-input' placeholder='Points...' type="number" name='points' autoComplete='off' required />
        </div>
        <button className='submit-button'>Submit</button>
      </form>
      <div className='current-points'> Current Points: {pointTracker} </div>
      <div className='chore-title'>Chore List:</div>
      <div className='chore-list'>
        {chore.map((item) => {
          return (
            <div className='chore-item'> {item.task}
              <div>
                +{item.points}
              </div>
              <div className='buttons'>
                <button className='complete-button' onClick={() => pointHandler(item.id, item.points)}>✓</button>
                <button className='delete-button' onClick={() => deleteHandler(item.id)}>x</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className='chore-title'>Reward List:</div>
      <div className='chore-list'>
            <div className='chore-item'> Sweets <div>
                Cost: 300
              </div>
              <div className='buttons'>
                <button className='complete-button' onClick={() => fakePointHandler(300)}>Buy</button>
              </div>
            </div>
            <div className='chore-item'> Watch a movie <div>
                Cost: 400
              </div>
              <div className='buttons'>
                <button className='complete-button' onClick={() => fakePointHandler(400)}>Buy</button>
              </div>
            </div>
            <div className='chore-item'> Order Uber Eats <div>
                Cost: 500
              </div>
              <div className='buttons'>
                <button className='complete-button' onClick={() => fakePointHandler(500)}>Buy</button>
              </div>
            </div>
      </div>
    </div>
  );
}

export default App;
