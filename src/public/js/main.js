// TODO: add client side code for single page application



async function loadMessages() {
    const res = await fetch('http://localhost:3000/api/reviews');
    const reviews = await res.json();
    //const rows = document.querySelector('tbody');
    //divs.forEach(d => d.remove());
    console.log(reviews);
    for(const m of reviews) {
        const tr = document.createElement('tr');
        const td1 = tr.appendChild(document.createElement('td'));
        td1.innerText = m.name;
        const td2 = tr.appendChild(document.createElement('td'));
        td2.innerText = m.semester;
        const td3 = tr.appendChild(document.createElement('td'));
        td3.textContent = m.year;
        const td4 = tr.appendChild(document.createElement('td'));
        td4.textContent = m.review;
        document.querySelector('tbody').appendChild(tr);
        
        //div.textContent = m.from + '...  ' + m.text;
      } 
    //setTimeout(loadMessages, 500);
    }


async function handleClick(evt) {
    evt.preventDefault();
    const sem = document.querySelector('#filterSemester').value;
    const yr = document.querySelector('#filterYear').value;
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json'
      }
    };
    let url = "";
    if(sem && yr){
        url = `http://localhost:3000/api/reviews?semester=${sem}&year=${yr}`;
    }
    else if(sem){
        url = `http://localhost:3000/api/reviews?semester=${sem}`;
    }
    else if(yr){
        url = `http://localhost:3000/api/reviews?year=${yr}`;
    }
    else{
        url = "http://localhost:3000/api/reviews";
    }
    const res = await fetch(url, config);
    const reviews = await res.json();
    //addMessagesToPage([review]);
    const element = document.querySelector('tbody');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }   
    for(const m of reviews){
        const tr = document.createElement('tr');
        const td1 = tr.appendChild(document.createElement('td'));
        td1.innerText = m.name;
        const td2 = tr.appendChild(document.createElement('td'));
        td2.innerText = m.semester;
        const td3 = tr.appendChild(document.createElement('td'));
        td3.textContent = m.year;
        const td4 = tr.appendChild(document.createElement('td'));
        td4.textContent = m.review;
        document.querySelector('tbody').appendChild(tr);
    }
    console.log(element);
  }

  async function handleClick2(evt) {
    evt.preventDefault();
    const sem = document.querySelector('#semester').value;
    const yr = document.querySelector('#year').value;
    const name = document.querySelector('#name').value;
    const review = document.querySelector('#review').value;

    const config = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({name: name, semester: sem, year: yr, review: review})
    };

    const res = await fetch("http://localhost:3000/api/reviews/create", config);
    const revieww = await res.json();
    console.log(revieww);
    const element = document.querySelector('tbody');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }  
    loadMessages();
/*     const tr = document.createElement('tr');
    let td1 = tr.appendChild(document.createElement('td'));
    td1.innerText = revieww.name;
    let td2 = tr.appendChild(document.createElement('td'));
    td2.innerText = revieww.semester;
    let td3 = tr.appendChild(document.createElement('td'));
    td3.textContent = revieww.year;
    let td4 = tr.appendChild(document.createElement('td'));
    td4.textContent = revieww.review;
    document.querySelector('tbody').appendChild(tr);   */     
    
  }

function main() {
    const btn = document.querySelector('#filterBtn');
    btn.addEventListener('click', handleClick);
    const btn2 = document.querySelector('#addBtn');
    btn2.addEventListener('click', handleClick2);
    loadMessages();
}

document.addEventListener("DOMContentLoaded", main);