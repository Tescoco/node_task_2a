// fetch weather data
const updateWeatherInterval = () => {
  setTimeout(async () => {
    const response = await fetch("/v1/weather");
    const data = await response.json();

    let { condition, temp_c } = data.current


    document.querySelector(".degree").textContent = `${temp_c} °C`
    document
      .querySelector(".tempImg")
      .setAttribute("src", condition.icon);

    updateWeatherInterval();
  }, 300000);
};
updateWeatherInterval();

// get dates
const date = new Date();

const EST_time = date.toLocaleString("en-GB", {
  timeZone: "America/New_York"
});

const london_time = date.toLocaleString("en-GB", {
  timeZone: "Europe/London"
});

const pakistan_time = date.toLocaleString("en-GB", {
  timeZone: "Asia/Karachi"
});

const nigeria_time = date.toLocaleString("en-GB", {
  timeZone: "Africa/Lagos"
});

document.querySelector(".nigeriaTime").textContent = nigeria_time.split(", ")[1];
document.querySelector(".pakistanTime").textContent =
  pakistan_time.split(", ")[1];
document.querySelector(".londonTime").textContent = london_time.split(", ")[1];

document.querySelector(".ESTTime").textContent = EST_time.split(", ")[1];

// autocomplete

const getAirports = async () => {

  const searchAirport = document.querySelector("#userInput");
  searchAirport.addEventListener("input", async (e) => {
    const inputData = e.target.value;

    if (inputData.length > 2) {
      const response = await fetch(
        `/api/airports?search=${inputData}`
      );

      const data = await response.json();
      console.log(data)
      let html = "";
      data.forEach((d) => {
        html += `<option value="${d[3]}" data-lat="${d[4]}" data-lon="${d[5]}"></option>`;
      });
      console.log(html)
      document.querySelector(".airportName").innerHTML = html;
    }

    //check if necessary
    document.querySelector(".airportName>option")?.dataset.lat || 4.35;
    document.querySelector(".airportName>option")?.dataset.lng || 51.5074;
  });
};

getAirports()

//get distance
function distanceFromArctic(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
}

const distance = distanceFromArctic(10.696000099182129, 7.320109844207764, 76.2506, 100.114);
document.querySelector(".distanceInner").textContent = `${distance.toFixed(3)} KM`

// send analytics
const sendAnalytics = async () => {
  document.querySelectorAll(".card").forEach((column) => {
    column.addEventListener("click", async (e) => {
      console.log(e.target.dataset.name);

      const response = await fetch(
        `/analytics/${e.target.dataset.name}/chrome`
      );
      const data = await response.json();

      document.querySelector(".clickInner").textContent = data.click_count;
    });
  });
};

sendAnalytics()

// download analytics

const downloadAnalytics = () => {

  const downloadXML = document.querySelector(".exportXMLCard");
  downloadXML.addEventListener("click", async (e) => {
    fetch(
      `/export/analytics`
    );
  });
};

downloadAnalytics()

// get reddit data
const topFourReddit = async () => {
  const response = await fetch(
    "https://www.reddit.com/r/programming.json"
  );
  const data = await response.json();
  const evenPost = []
  const statsByUser = {}

  for (let i = 0; i < data.data.children.length; i++) {
    if ((i + 1) % 2 == 0) {
      evenPost.push(data.data.children[i])
    }
  }
  evenPost.forEach(({ data: { author, title, url, score } }) => {
    statsByUser[author] = !statsByUser[author]
      ? { postCount: 1, score, url, title }
      : {
        postCount: statsByUser[author].postCount + 1,
        score: statsByUser[author].score + score,
        url, title
      };
  });

  const userList = Object.keys(statsByUser).map(username => ({
    username,
    score: statsByUser[username].score,
    postCount: statsByUser[username].postCount,
    url: statsByUser[username].url, title: statsByUser[username].title
  }));

  const sortedList = userList.sort((userA, userB) => userB.score - userA.score);

  const topRedditPost = sortedList.slice(0, 4)

  const container = document.querySelector('.redditCard');

  topRedditPost.forEach(({ username, title, url }, i) => {
    const redditMain = document.createElement('div');
    redditMain.classList.add('redditMain');

    const redditPostedBy = document.createElement('div');
    redditPostedBy.classList.add('redditPostedBy');
    redditPostedBy.innerText = username

    const redditTitle = document.createElement('div');
    redditTitle.classList.add('redditTitle');
    redditTitle.innerText = title

    const redditLink = document.createElement('div');
    redditLink.classList.add('redditLink');
    redditLink.innerText = url

    redditMain.appendChild(redditPostedBy);
    redditMain.appendChild(redditTitle);
    redditMain.appendChild(redditLink);
    container.appendChild(redditMain);
  });
};

// document.querySelector(".clickInner").textContent = data.click_count;

topFourReddit()