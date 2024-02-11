const $form = document.getElementById("login");
const $emailInput = document.getElementById("email");
const $passwordInput = document.getElementById("password");
const $getPostsButton = document.getElementById("getposts");
const $postsListItem = document.getElementById("posts");

// const API_URL = "https://api-repaso-dev-sfbq.3.us-1.fl0.io";
const API_URL = "http://localhost:3000";

function submit(event) {
  event.preventDefault();
  const email = $emailInput.value;
  const password = $passwordInput.value;

  fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((responseInJson) => {
      localStorage.setItem("token", responseInJson.data.token);
      window.location.assign("/posts.html");
    })
    .catch((error) => {
      console.log("FETCH ERROR: ", error);
    });
}

function renderPosts(event) {
  const token = localStorage.getItem("token");

  fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log({ json });

      const titles = json.data.posts.map((post) => {
        return `
        <article>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p>${post.author.name}</p>
        </article>
        `;
      });

      $postsListItem.innerHTML = titles.join("");
    })
    .catch((error) => alert("NOOOOOOOOO: " + error));
}

$form?.addEventListener("submit", submit);
$getPostsButton.addEventListener("click", renderPosts);
